---
title: "API Endpoints Reference"
created: "2026-02-09T06:30:00.000Z"
updated: "2026-02-09T06:30:00.000Z"
tags: [jarvis, api, endpoints, reference, kanban]
summary: "Quick reference for all internal API endpoints. Created after confusion about /api/status vs /api/status-update."
priority: medium
---

# API Endpoints Reference

Quick reference for all internal API endpoints used by Jarvis.

---

## Kanban Server (port 8080)

Base URL: `http://192.168.50.39:8080`

### Tasks

- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create new task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `GET /api/tasks/history` — Archived tasks
- `GET /api/tasks/stats` — Task statistics
- `POST /api/tasks/archive-old` — Archive completed tasks older than N days

### Live Feed

- `POST /api/feed` — Post new feed item
  - Body: `{"type": "working|thinking|completed|error|agent-spawned|agent-completed", "message": "..."}`

### Status (Jarvis Avatar)

- `POST /api/status-update` — Update Jarvis status
  - Body: `{"status": "idle|working|thinking|delegating|heartbeat", "message": "..."}`
  - **Note**: It's `/api/status-update`, NOT `/api/status`

### System

- `GET /api/system/info` — System health (CPU, RAM, disk, GPU)
- `GET /api/system/usage` — Usage tracking data

---

## 2nd Brain (port 3333)

Base URL: `http://192.168.50.39:3333`

- `GET /` — Homepage
- `GET /doc/[...slug]` — Document viewer (e.g., `/doc/journal/2026-02-09`)

---

## Property Manager (port 9000)

Base URL: `http://192.168.50.39:9000`

Auth: `Authorization: Bearer pp-venture-2026-secure-token`

**TODO**: Document endpoints once app is built

---

## Command Hub (port 80)

Base URL: `http://192.168.50.39`

**TODO**: Document endpoints once integrated

---

## Helper Scripts

Jarvis has helper scripts for common API calls:

### Feed Post
```bash
/home/mo/claudebot/scripts/feed-post.sh <type> <message>
```

Example:
```bash
./feed-post.sh working "Building property manager database schema..."
```

---

## Finding Endpoints

If you need to find an endpoint, grep the source:

**Kanban server**:
```bash
grep -n "app.router.add" /home/mo/mo-assistant/kanban/server_ws.py
```

**Express apps**:
```bash
grep -rn "app.get\|app.post\|app.put\|app.delete" /path/to/project/
```

---

## Notes

- All internal services are **LAN-only** (no external access)
- No auth required for kanban/2nd brain (LAN trust model)
- Property manager uses Bearer token auth
- WebSocket endpoints exist but not documented yet (TODO)
