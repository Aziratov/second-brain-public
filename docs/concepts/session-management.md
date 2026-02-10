---
title: "Session Management & Auto-Rotation"
created: "2026-02-08T17:20:00.000Z"
updated: "2026-02-08T17:20:00.000Z"
tags: [session, rotation, corruption, resilience, infrastructure]
summary: "How Jarvis manages Claude CLI session files — size-based rotation, corruption detection, and automatic recovery from broken sessions."
priority: high
---

# Session Management & Auto-Rotation

## The Problem

Claude CLI stores conversation history in `.jsonl` session files. These grow over time and can fail in two ways:

### 1. Size Bloat
Sessions over ~2MB cause context window pressure, slower responses, and eventual compaction failures. This is the common case — long conversations accumulate tool calls, file contents, and assistant responses.

### 2. Session Corruption
The more insidious failure. A session file can be small (e.g., 124KB) but structurally broken — containing `tool_result` blocks that reference `tool_use` IDs which no longer exist in the conversation. This causes the API to reject the entire session with:

```
unexpected `tool_use_id` found in `tool_result` blocks: toolu_XXXXX.
Each `tool_result` block must have a corresponding `tool_use` block in the previous message.
```

This triggers a `FailoverError` crash, and Jarvis goes completely silent until the session is manually cleared.

**Root cause**: Likely from context compaction removing `tool_use` messages while leaving their corresponding `tool_result` messages intact.

## The Solution: `rotate-session.sh`

A cron script that runs every 5 minutes with two trigger modes.

### Trigger 1: Size Check
If the active session file exceeds 2MB → rotate.

### Trigger 2: Corruption Detection
If the session is under 2MB, scan the last 5 minutes of `jarvis.log` for:
- `tool_use_id` + `tool_result` in the same line (orphaned blocks)
- `FailoverError` + `"is_error":true` (CLI crash with error flag)

Important: The pattern specifically excludes harmless `FailoverError` lines from Ollama auth failures, which don't contain `"is_error":true`.

### Rotation Flow

1. **Flush context** — Extract list of files modified during the session, append to project memory
2. **Archive** — Gzip the session file to `~/.claude/session-archives/`
3. **Truncate** — Empty the session file (don't delete — Claude Code may hold a file handle)
4. **Clear sessions.json** — Remove `claudeCliSessionId` so OpenClaw creates a fresh session
5. **Restart gateway** (corruption only) — `sudo systemctl restart jarvis` to clear the crashed state
6. **Cleanup** — Keep only the last 10 archives

### Technical Note: gawk String Comparison Bug

The corruption detection uses Python3 instead of awk for timestamp comparison. GNU Awk 5.1.0 on this system silently coerces string comparisons to numeric (both sides become 0), making timestamp filtering unreliable. This is a known gawk behavior where string literals in comparison expressions get numeric coercion.

## Key Paths

| Path | Purpose |
|------|---------|
| `/home/mo/claudebot/scripts/rotate-session.sh` | The rotation script |
| `~/.claude/projects/-home-mo--openclaw-workspace/*.jsonl` | Active session files |
| `/home/mo/.openclaw/agents/main/sessions/sessions.json` | Session ID mapping |
| `~/.claude/session-archives/` | Compressed session archives |
| `/home/mo/claudebot/logs/session-rotation.log` | Rotation log |
| `/home/mo/claudebot/data/jarvis.log` | Scanned for corruption patterns |

## Cron Entry

```
*/5 * * * * /home/mo/claudebot/scripts/rotate-session.sh
```

## Incident: Feb 8, 2026

First corruption event observed. Session was 124KB — well under the 2MB threshold. The orphaned `tool_result` blocks caused a `FailoverError` crash at 16:53 UTC. Jarvis went silent. The corruption detection trigger was added to prevent this from happening again — the script now catches the error pattern in jarvis.log and auto-recovers within 5 minutes.
