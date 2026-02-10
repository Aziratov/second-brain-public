---
title: Self-Healing Runbook - Session Bloat & OOM Prevention
created: 2026-02-08
updated: 2026-02-08
tags: [ops, runbook, self-healing, oom, session-management, priority-1]
summary: Procedures to detect, prevent, and recover from CLI session bloat that causes OOM crashes
priority: critical
---

# Self-Healing Runbook: Session Bloat & OOM Prevention

## Problem

Claude CLI session files at `~/.claude/projects/-home-mo--openclaw-workspace/` can grow unbounded. When they exceed ~5MB/1500+ lines, the CLI loads the entire file into memory on every message, eventually hitting 4GB heap and crashing with OOM. Result: Jarvis goes unresponsive, Mo gets no replies.

## What to Monitor

1. **CLI session file size** — check every heartbeat:
   ```bash
   find ~/.claude/projects/-home-mo--openclaw-workspace/ -name "*.jsonl" -not -path "*/subagents/*" -size +1M
   ```

2. **Thresholds:**
   - Session file > 2MB or 500 lines = needs rotation
   - Claude process running > 5 minutes = session too bloated
   - "typing TTL reached" appearing 3+ times in a row = session getting slow

## Self-Heal Procedure

1. **Stop accepting new messages** temporarily
2. **Find current CLI session ID:**
   - Check `~/.openclaw/agents/main/sessions/sessions.json` under `cliSessionIds`
3. **Archive the bloated session file:**
   ```bash
   cp <session-file> ~/claudebot/backups/session-archive/
   ```
4. **Clear session references:**
   - Remove `cliSessionIds` and `claudeCliSessionId` entries from `sessions.json`
   - This forces a fresh session on next call
5. **Restart:**
   ```bash
   curl -s -X POST http://localhost:18789/__openclaw__/gateway -d '{"action":"restart"}'
   ```
   Or ask the watchdog to do it
6. **Verify** — check next response time to confirm new session is healthy

## Prevention Rules

- **Keep conversations focused.** Don't let tool output bloat the main session.
- **Delegate heavy tool use to sub-agents** — the bloat stays in their disposable session, not the main one.
- **Main session must stay under 500 lines and 2MB at all times.**
- This is why the delegation model matters — it's not just for productivity, it's for survival.

## Daily Maintenance Checklist

Add to heartbeat/daily checks alongside disk, RAM, GPU monitoring:

- [ ] Check CLI session file size (must be < 2MB)
- [ ] Check CLI session line count (must be < 500)
- [ ] Check for long-running claude processes (> 5 min)
- [ ] Check for repeated "typing TTL reached" in logs
- [ ] If any threshold exceeded, execute self-heal procedure

## Priority

**PRIORITY 1** — If session bloat isn't caught early, Jarvis crashes and Mo gets no responses. This is the single most important operational health check.
