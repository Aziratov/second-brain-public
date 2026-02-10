---
title: "Jarvis Infrastructure Architecture"
created: "2026-02-08T01:35:00.000Z"
updated: "2026-02-08T17:20:00.000Z"
tags: [infrastructure, architecture, monitoring, automation, session-management]
summary: "Complete overview of the Jarvis AI assistant infrastructure — services, cron jobs, monitoring, session management, and how everything connects."
priority: high
---

# Jarvis Infrastructure Architecture

## Service Map

| Service | Port | Technology | Purpose |
|---------|------|------------|---------|
| Kanban Board | 8080 | Python aiohttp + WebSocket | Task management, status dashboard, monitoring |
| 2nd Brain | 3333 | Next.js 16 + TypeScript | Knowledge base, document viewer |
| OpenClaw Gateway | 18789 | Node.js | Telegram bot, AI routing, session management |
| Ollama | 11434 | Go | Local LLM (Llama 3.2 3B) for classification |

## Hardware

- **CPU**: AMD Ryzen 7 5700G (16 threads)
- **RAM**: 64 GB DDR4
- **GPU**: NVIDIA RTX 3060 (12GB VRAM)
- **Disk**: NVMe SSD
- **OS**: Ubuntu 22.04 (Linux 5.15)

## Data Flow

```
Telegram → OpenClaw Gateway → Claude CLI (Opus 4.6)
                                    ↕
                             Kanban Board API
                              ↕           ↕
                        WebSocket      REST API
                        (real-time)    (CRUD)
                              ↕
                         Browser UI
```

## Kanban Board Tabs

1. **Dashboard** — Active task columns (TODO, In Progress, Done) + sidebar (agent status, notes to Mo)
2. **System** — Real-time server health (CPU, RAM, GPU, disk, services, top processes)
3. **History** — Completed task archive with search, date filtering, agent filtering, stats
4. **Docs** — Documentation pages (About, Infrastructure, AI Models, etc.)
5. **Memory** — Memory system viewer
6. **Log** — Activity log
7. **Live Feed** — Real-time narration of what Jarvis is doing (type-coded: thinking, working, agent-spawned, error, completed)

## Automation (Cron Schedule)

| Schedule | Script | Purpose |
|----------|--------|---------|
| Every 5 min | `rotate-session.sh` | Session file rotation — size (>2MB) + corruption detection |
| Every 15 min | `server-alerts.sh` | Health monitoring with Telegram alerts and auto-restart |
| Every 4h | `proactive-maintenance.sh` | Health checks, cleanup, service monitoring, alerts |
| 9:00 AM EST (14:00 UTC) | `morning-brief.sh` | Daily briefing: weather, tasks, health, overnight summary |
| 3:00 AM | `backup.sh --quiet` | Daily backup of all configs, data, docs |
| 10:55 PM | `backup.sh --quiet` | Pre-nightly backup |
| 11:00 PM EST (4:00 AM UTC) | `nightly-build.sh` | Autonomous work session — picks top TODO task |

## Session Management

Claude CLI sessions grow over time as conversation history accumulates. Two failure modes:

1. **Size-based**: Sessions >2MB cause context window pressure and slow responses
2. **Corruption-based**: Orphaned `tool_result` blocks referencing deleted `tool_use` IDs cause FailoverError crashes

### Rotation Script: `rotate-session.sh`

Runs every 5 minutes via cron. Flow:
1. Find active session ID from `sessions.json`
2. Check file size (threshold: 2MB)
3. If under threshold, scan jarvis.log for corruption patterns in last 5 minutes
4. If either trigger fires: flush modified files to project memory, archive session (gzip), truncate, clear sessions.json
5. If corruption was the trigger: additionally restart the gateway (`sudo systemctl restart jarvis`)
6. Clean up old archives (keep last 10)

### Corruption Detection Patterns
- `tool_use_id` + `tool_result` in same log line — orphaned tool blocks
- `FailoverError` + `"is_error":true` — CLI crash with error flag (excludes harmless Ollama auth errors)

### Key Paths
- Session files: `~/.claude/projects/-home-mo--openclaw-workspace/*.jsonl`
- Sessions.json: `/home/mo/.openclaw/agents/main/sessions/sessions.json`
- Archives: `~/.claude/session-archives/`
- Rotation log: `/home/mo/claudebot/logs/session-rotation.log`
- Jarvis log (for corruption scan): `/home/mo/claudebot/data/jarvis.log`

## Monitoring & Alerting

### Server Alerts (`server-alerts.sh`)
- Runs every 15 minutes
- Thresholds: Disk >80/90%, RAM >85/95%, CPU >90%, GPU >80/90°C
- Auto-restarts downed services (kanban, 2nd brain)
- Sends Telegram alerts with 1-hour dedup cooldown
- Also posts alerts to kanban notes

### System Health API
- **Endpoint**: `GET /api/system/health`
- **Data**: CPU, RAM, disk, GPU (temp/util/VRAM), uptime, services, top processes

### Usage Stats API
- **Endpoint**: `GET /api/system/usage`
- **Data**: Subscription, model, active sessions, daily activity, task breakdown, agents, docs, backups

## Agent Configuration

- **Primary agent**: `claude-opus` (Claude Opus 4.6)
- **Status updates**: `PATCH /api/agents/claude-opus/status`
- **Agent delegation**: Dynamic agents, max 2 concurrent + Jarvis
- **Model routing**: Opus for complex reasoning, Sonnet for worker tasks, Haiku for quick checks
- **TeamCreate**: Native Agent Teams for multi-agent work (Task+run_in_background is broken)

## Key Files

- **Kanban server**: `/home/mo/mo-assistant/kanban/server_ws.py`
- **Kanban frontend**: `/home/mo/mo-assistant/kanban/{index.html, app.js, style.css}`
- **2nd Brain app**: `/home/mo/mo-assistant/second-brain/`
- **2nd Brain docs**: `/home/mo/mo-assistant/second-brain/docs/`
- **Scripts**: `/home/mo/claudebot/scripts/`
- **Backups**: `/home/mo/mo-assistant/backups/`
- **OpenClaw config**: `/home/mo/.openclaw/openclaw.json`
- **Workspace identity**: `/home/mo/.openclaw/workspace/*.md`
- **Gmail CLI**: `/usr/local/bin/gog` (gog v0.9.0, jarvisgoliath@gmail.com)
