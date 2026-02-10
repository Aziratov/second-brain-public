---
title: Agent Reliability — Lessons Learned and Fixes
created: 2026-02-08
updated: 2026-02-08
tags: [agents, reliability, concurrency, worktrees, monitoring, critical]
summary: Root cause analysis of agent failures on Day 1, research from Vibe KanBan and Claude Code Agent Teams, and the 6-point fix implemented
priority: critical
---

# AGENT RELIABILITY — WHY AGENTS FAIL AND HOW TO FIX IT

## The Problem (Day 1 — Feb 7-8, 2026)

During the Kanban Board Overhaul task, 3 sub-agents were spawned to work on the archive/history system:
- **Research Agent** — Tasked with reading existing code and documenting patterns
- **Backend Agent** — Tasked with building the history API endpoints
- **Frontend Agent** — Tasked with building the History tab UI

All 3 agents ran for 30+ minutes. None of them wrote a single line of code. Their Task output files either didn't exist or contained no meaningful work products.

Jarvis had to decommission all agents and build the entire system solo. The feature shipped, but the delegation model failed completely.

## Root Cause Analysis

### 1. Concurrency Ceiling
Mo's Max subscription allows ~5 concurrent Claude sessions. Jarvis (the main session) + 3 agents = 4 sessions. When the system hits the ceiling, agents get throttled or silently fail. There's no error — they just stop making progress.

### 2. No Workspace Isolation
All agents worked in the same directory (`/home/mo/mo-assistant/kanban/`). If two agents tried to read or write the same file, they'd conflict. The Task tool subagents don't get their own workspace — they share the filesystem.

### 3. No Health Monitoring
Once spawned, there was no mechanism to check if an agent was actually producing output. No first-output timeout, no periodic health checks. An agent could sit idle for 30 minutes before anyone noticed.

### 4. No Queued Execution
All 3 agents were spawned simultaneously. This maximized concurrency pressure right from the start, instead of ramping up gradually.

### 5. Subagent Limitations
The Task tool spawns subagents that run within a single API context. They don't get their own terminal, can't run long-lived processes, and their output is limited. They're best for focused, bounded tasks — not multi-file implementations.

## Research: How Others Solve This

### Vibe KanBan (vibekanban.com)
- Open-source orchestrator for AI coding agents (Rust backend, React frontend)
- **Key insight**: Each agent gets its own git worktree — a separate directory checked out from the same repo
- Agents work on isolated branches, changes are reviewed as diffs before merging to main
- Automatic worktree cleanup for orphaned/expired workspaces
- Supports Claude Code, Cursor, Codex, Copilot, and others in parallel

### Claude Code Agent Teams (Experimental, 2026)
- Native Anthropic feature: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Team lead + teammates model (like our Jarvis + sub-agents)
- Each teammate gets its own context window, loads project CLAUDE.md
- Shared task list with file-locking to prevent race conditions
- Teammates can message each other directly (unlike subagents which only report to parent)
- Two display modes: in-process (default) or split-pane (tmux/iTerm2)
- **Key limitation**: No session resumption with in-process teammates
- **Key limitation**: Teammates sometimes fail to mark tasks complete
- Best for: research/review, new modules, debugging hypotheses, cross-layer work

### parallel-cc (GitHub: frankbria/parallel-cc)
- Git worktrees + E2B cloud sandboxes for autonomous execution
- Automated coordination between agents in separate terminals
- Each agent gets a worktree, works independently, changes merge back

### Common Pattern Across All Solutions
1. **Isolate workspaces** — git worktrees or separate directories
2. **Limit concurrency** — never exceed subscription/system limits
3. **Monitor actively** — health checks, timeout enforcement
4. **Review before merge** — diff review, not blind trust
5. **Clean up** — decommission worktrees and agent state after completion

## The 6-Point Fix

### Fix 1: Pre-Spawn Concurrency Check
Before spawning any agent, check how many Claude processes are already running:
```bash
pgrep -c -f "claude" || echo 0
```
**Rule**: Maximum concurrent agents = subscription limit - 1 (for Jarvis). On Mo's Max plan, that means max 2-3 agents at a time. If at the limit, queue the agent instead of spawning.

### Fix 2: Git Worktree Isolation
For tasks involving file writes, create an isolated worktree for each agent:
```bash
# Create worktree for agent
git worktree add /tmp/agent-workdir-{agent-id} -b agent/{agent-id} main

# Agent works in /tmp/agent-workdir-{agent-id}
# When done, review the diff:
cd /tmp/agent-workdir-{agent-id}
git diff main...agent/{agent-id}

# If good, merge:
cd /original/repo
git merge agent/{agent-id}

# Cleanup:
git worktree remove /tmp/agent-workdir-{agent-id}
git branch -d agent/{agent-id}
```
**Note**: This requires the project to be a git repo. For non-git directories, use a temp directory copy instead.

### Fix 3: Agent Timeout and Health Monitoring
- **First-output check**: If an agent hasn't produced any output within 3 minutes, kill and retry or do it yourself
- **Max runtime**: 10 minutes per agent. If still running, check progress. If no progress, kill it
- **Health check interval**: Every 2 minutes, check if the agent's output file is growing
- Implementation: Use `run_in_background: true` on Task tool, then periodically `Read` the output file

### Fix 4: Queued Execution (Waves)
Don't spawn all agents at once. Use waves:
- **Wave 1**: Spawn max 2 agents for independent tasks
- **Validate**: Wait for Wave 1 to complete, review output
- **Wave 2**: Spawn next batch based on Wave 1 results
- This reduces concurrency pressure and allows early failure detection

### Fix 5: Failure Logging
Every agent failure gets logged to `/home/mo/mo-assistant/second-brain/docs/notes/agent-failure-log.md`:
- Date/time
- Agent name and task
- How long it ran
- What it was supposed to produce
- What it actually produced (or didn't)
- Suspected cause
- What Jarvis did instead
- Lessons learned

### Fix 6: Updated Delegation Playbook
New steps added to the playbook:
- **Step 3.5**: Run concurrency check before spawning
- **Step 4.5**: Set up git worktree (if applicable)
- **Step 5.5**: Start health monitoring loop
- Updated concurrency rules from "max 3" to "max 2 + monitoring"

## Decision Matrix: When to Use Each Approach

| Task Type | Approach | Why |
|-----------|----------|-----|
| Simple file write | Do it yourself | One tool call, no overhead |
| Research/reading | Subagent (Task tool) | Good at reading, no write conflicts |
| Multi-file code changes | Subagent with worktree | Needs isolation |
| Complex cross-cutting work | Claude Code Agent Teams | If/when available through OpenClaw |
| Quick focused task | Subagent, no worktree | Fast, bounded, low risk |

## Future Considerations

1. **Claude Code Agent Teams**: When this feature stabilizes and becomes available through OpenClaw, it could replace our custom subagent orchestration entirely. Monitor the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` feature.

2. **Vibe KanBan Integration**: Could potentially integrate with our kanban board for native worktree management. Their MCP server could feed tasks directly.

3. **E2B Sandboxes**: Cloud sandboxes (like parallel-cc uses) would completely isolate agents from each other and from the main filesystem.

---

**Bottom line**: The delegation model works, but only with proper isolation, monitoring, and concurrency control. Agents aren't magic — they need the same operational discipline as any distributed system.
