---
title: Homelab Infrastructure Map
created: 2026-02-09
updated: 2026-02-09
tags: [infrastructure, proxmox, homelab, networking, monitoring, critical]
summary: Complete map of Mo's Proxmox homelab — two nodes, all LXC containers, VMs, services, IPs, and ports
priority: critical
---

# Homelab Infrastructure Map

## Cluster Overview

Two Proxmox VE nodes on the local network (192.168.50.x):

| Node | Role | Containers | VMs |
|------|------|-----------|-----|
| **minipve** | Primary node | 7 LXC | 0 |
| **goliath** | Secondary node | 3 LXC | 1 VM (Jarvis) |

## All Containers & VMs

### minipve (7 LXC)

| VMID | Name | Type | IP | Status |
|------|------|------|-----|--------|
| 100 | nginxproxymanager | LXC | 192.168.50.100 | Running |
| 103 | pihole | LXC | 192.168.50.2 | Running |
| 104 | wireguard | LXC | 192.168.50.104 | Running |
| 105 | crowdsec | LXC | 192.168.50.105 | Running |
| 106 | authelia | LXC | 192.168.50.106 | Running |
| 107 | uptimekuma | LXC | 192.168.50.107 | Running |
| 110 | satisfactory | LXC | 192.168.50.110 | Running |

### goliath (3 LXC + 1 VM)

| VMID | Name | Type | IP | Status |
|------|------|------|-----|--------|
| 101 | jarvis | QEMU VM | 192.168.50.39 | Running |
| 108 | apt-cache | LXC | 192.168.50.108 | Running |
| 109 | nas | LXC | 192.168.50.109 | Running |
| 113 | dockge | LXC | 192.168.50.113 | Running |

## Services & Ports

### Network Infrastructure (minipve)

| Service | IP:Port | Protocol | Notes |
|---------|---------|----------|-------|
| Nginx Proxy Manager | 192.168.50.100:81 | HTTP | Reverse proxy admin panel |
| Pi-hole Web | 192.168.50.2:8080 | HTTP | DNS ad-blocker admin |
| Pi-hole DNS | 192.168.50.2:53 | TCP/UDP | DNS resolver (unbound on 5335 local) |
| WireGuard | 192.168.50.104 | VPN | No external web ports |
| CrowdSec | 192.168.50.105 | — | API on localhost:8080 only |
| Authelia | 192.168.50.106:9091 | HTTP | Auth gateway |
| Uptime Kuma | 192.168.50.107:3001 | HTTP | Monitoring dashboard |
| Satisfactory Server | 192.168.50.110:7777 | TCP | Game server (beacon on 8888) |

### Jarvis VM (goliath — 192.168.50.39)

| Service | Port | Stack | Notes |
|---------|------|-------|-------|
| Command Hub | 80 | Vite/React | Main web UI |
| Jarvis Command Center | 8080 | Python aiohttp | Kanban board |
| Jarvis Second Brain | 3333 | Next.js | Document viewer |
| PrimeProperty Ventures | 9000 | Express | Property management app |

### Support Services (goliath)

| Service | IP:Port | Protocol | Notes |
|---------|---------|----------|-------|
| Apt-Cache | 192.168.50.108:3142 | HTTP | apt-cacher-ng |
| NAS (Cockpit) | 192.168.50.109:9090 | HTTPS | Cockpit web console (self-signed) |
| Dockge | 192.168.50.113:3000 | HTTP | Docker compose manager |

## Uptime Kuma Monitoring

Set up 2026-02-09. 15 service monitors + 2 group monitors. All reporting to Telegram (@kuma_goliath_bot → @DravenDraven).

### Monitor Groups

**minipve group (ID 16):**
- Nginx Proxy Manager, Pi-hole, Pi-hole DNS, WireGuard, CrowdSec, Authelia, Uptime Kuma, Satisfactory Server

**goliath group (ID 17):**
- Command Hub, Apt-Cache, NAS, Dockge, Jarvis Command Center, Jarvis Second Brain, PrimeProperty Ventures

All monitors: 60-second intervals, 3 retries, 30-second retry intervals.

## Security Stack

- **Pi-hole**: DNS-level ad blocking and filtering
- **CrowdSec**: Collaborative intrusion prevention
- **Authelia**: Single sign-on / auth gateway
- **WireGuard**: VPN access
- **Nginx Proxy Manager**: Reverse proxy with SSL termination
