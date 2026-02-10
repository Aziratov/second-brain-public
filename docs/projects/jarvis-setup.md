---
title: "Project: Jarvis AI Agent Setup"
created: "2026-02-08T00:00:00.000Z"
updated: "2026-02-08T17:20:00.000Z"
tags: [project, jarvis, ai-agent, priority]
summary: "Master tracking document for the Jarvis AI agent setup — Mo's #1 priority. Covers infrastructure, kanban, automation, and the path to a fully autonomous AI employee."
priority: high
---

# Project: Jarvis AI Agent Setup

**Status**: Operational — all core systems live
**Priority**: #1 — Mo's current top priority

## Goal

Build a fully operational AI employee (Jarvis) that:
- Works proactively overnight while Mo sleeps
- Manages tasks via the kanban board
- Creates PRs for Mo to review (never pushes live)
- Monitors systems and alerts on issues
- Learns and improves from every conversation

## Infrastructure

| Component | Status | Details |
|-----------|--------|---------|
| OpenClaw Gateway | Running | Port 18789, token auth, systemd service |
| Claude CLI Backend | Running | Opus 4.6, Max subscription |
| Kanban Board | Running | Port 8080, REST + WebSocket, 7 tabs |
| Memory System | Enabled | MEMORY.md + session search + project memory |
| Telegram Bot | Running | DM pairing mode, plain text only |
| Status Indicator | Working | WebSocket-based, emoji + animations |
| 2nd Brain | Running | Next.js 16 at port 3333, document viewer |
| Gmail Access | Working | gog CLI, jarvisgoliath@gmail.com |
| GitHub Integration | Built | gh CLI wrapper, auto-PR on task completion, awaiting Mo's repo setup |
| Session Rotation | Running | Cron every 5 min, size-based + corruption detection |
| Server Monitoring | Running | System tab, server-alerts.sh every 15 min |
| Morning Brief | Running | 9am EST daily via Telegram |
| Nightly Build | Running | 11pm EST, autonomous work session |
| Backups | Running | 3am + 10:55pm daily, keeps last 30 |

## Completed (Feb 8)

### Morning (Overnight Autonomous)
- [x] 2nd Brain document viewer (Next.js app, port 3333, 6 seed docs)
- [x] Automated backups (3am + 10:55pm, 30-day rotation)
- [x] Server monitoring dashboard (System tab, real-time health)
- [x] Proactive health checks (every 4h, disk/RAM/GPU/services)
- [x] Kanban polish (keyboard shortcuts, filtering, priority pills)
- [x] Usage tracker (/api/system/usage)
- [x] Nightly cron (11pm EST autonomous build)
- [x] Security hardening audit (file perms, UFW, input validation)

### Early Morning
- [x] Fix Kanban tabs (Docs, Memory, Log — rebranded, consistent nav)
- [x] Morning brief system (weather, tasks, health, sent via Telegram)
- [x] Server alerts (disk/RAM/CPU/GPU thresholds, Telegram alerts, auto-restart)
- [x] Sidebar: Notes to Mo (replaced Recent Activity)
- [x] Helper elapsed timer persistence (server-side timestamps)
- [x] Gmail CLI setup (gog, jarvisgoliath@gmail.com)
- [x] GitHub integration (src/github.js, /pr commands, auto-PR)

### Midday
- [x] Archive/History system (date-grouped, search, stats API, History tab)
- [x] Live Feed tab (real-time narration, WebSocket, type-coded badges)
- [x] Morning brief upgrade (intelligent, reads kanban/Gmail/health)
- [x] Research: Automated investing (feasibility report + roadmap)
- [x] Research: 3D printing starter guide

### Afternoon
- [x] Session auto-rotation (cron, 2MB threshold, archive + flush)
- [x] Corruption detection for session rotation (tool_use_id orphan detection, gateway restart)

## Pending

- [ ] GitHub repo setup (needs Mo to run gh auth login + git init)
- [ ] Mobile responsive improvements
- [ ] Kanban auth (currently open on LAN)

## Agent Delegation Model

Dynamic agents created per task. Max 2 concurrent + Jarvis = 3 total.
TeamCreate (native Agent Teams) works. Task+run_in_background does not.
Full details in `notes/agent-delegation-playbook.md` and `notes/agent-failure-log.md`.

## Server Specs

- **CPU**: AMD Ryzen 7 5700G (16 threads)
- **RAM**: 64GB DDR4
- **GPU**: NVIDIA GeForce RTX 3060 (12GB VRAM)
- **Storage**: NVMe SSD
- **OS**: Ubuntu 22.04
- **Node**: v24.13.0

## Key Files

- OpenClaw config: `/home/mo/.openclaw/openclaw.json`
- Kanban server: `/home/mo/mo-assistant/kanban/server_ws.py`
- Kanban frontend: `/home/mo/mo-assistant/kanban/index.html`
- Workspace context: `/home/mo/.openclaw/workspace/*.md`
- 2nd Brain: `/home/mo/mo-assistant/second-brain/`
- Scripts: `/home/mo/claudebot/scripts/`
- Session rotation: `/home/mo/claudebot/scripts/rotate-session.sh`
- Jarvis log: `/home/mo/claudebot/data/jarvis.log`

## Cron Schedule

| Schedule | Script | Purpose |
|----------|--------|---------|
| Every 5 min | `rotate-session.sh` | Session size + corruption rotation |
| Every 15 min | `server-alerts.sh` | Health monitoring + Telegram alerts |
| Every 4h | `proactive-maintenance.sh` | Cleanup, service checks, alerts |
| 9:00 AM EST | `morning-brief.sh` | Daily briefing to Mo via Telegram |
| 3:00 AM | `backup.sh` | Daily backup |
| 10:55 PM | `backup.sh` | Pre-nightly backup |
| 11:00 PM EST | `nightly-build.sh` | Autonomous work session |
