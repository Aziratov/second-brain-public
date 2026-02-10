---
title: "Jarvis Security Hardening"
created: "2026-02-08T01:56:00.000Z"
updated: "2026-02-08T02:00:00.000Z"
tags: [security, infrastructure, hardening]
summary: "Security audit findings and hardening measures applied to the Jarvis infrastructure. File permissions, network exposure, input validation."
priority: high
---

# Jarvis Security Hardening

## Audit Results

### Fixed
- `.env` file permissions: 664 -> 600 (owner-only access)
- `settings.local.json` permissions: 644 -> 600
- Script permissions standardized to 755
- Input validation added to pagination parameters (max limit 100)
- Security audit script created for periodic checks

### Current Status
- UFW firewall: active
- OpenClaw Gateway: localhost-only (127.0.0.1:18789) with token auth
- Ollama: localhost-only (127.0.0.1:11434)
- Kanban: network accessible (0.0.0.0:8080) — intentional for Mo's browser access
- 2nd Brain: network accessible (port 3333) — intentional for Mo's browser access

### Remaining Considerations
- Kanban API has no auth — fine for home network, would need auth if exposed to internet
- `--dangerously-skip-permissions` flag required for autonomous operation via OpenClaw
- Consider adding basic auth to kanban if exposing beyond home network
- Consider reverse proxy (nginx) with SSL for external access

## Security Audit Script

Run manually or integrate into proactive maintenance:
```bash
/home/mo/mo-assistant/scripts/security-audit.sh
```

Checks: file permissions, service binding, firewall status, script ownership.
