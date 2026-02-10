---
title: "Typing TTL Problem & Mitigation"
created: "2026-02-09T06:15:00.000Z"
updated: "2026-02-09T06:15:00.000Z"
tags: [jarvis, telegram, typing, ttl, operations, bugs]
summary: "Documents the 2-minute Telegram typing indicator timeout and strategies to prevent it."
priority: medium
---

# Typing TTL Problem & Mitigation

## The Problem

Telegram's typing indicator has a **2-minute TTL** (time-to-live). If Jarvis doesn't send a message within 2 minutes of Mo sending one, Telegram clears the typing indicator and Mo sees no activity.

**Metrics from last 24h**: 11 typing TTL hits.

This happens when I:
- Spawn agents and wait for output (agents can take 3-5 minutes)
- Do deep research (reading multiple docs, web scraping)
- Run complex bash operations (database migrations, builds)
- Read through large files or codebases

---

## Why It Matters

1. **Mo thinks I'm stuck or crashed** if he sees no typing indicator for >2 minutes
2. **Poor user experience** — no feedback during long operations
3. **Violates the "talking to someone" principle** — humans don't go silent for 5 minutes mid-conversation

---

## Root Cause

The typing indicator is sent by OpenClaw when Mo sends a message. It's NOT continuously renewed during my response. So if my response takes >2 minutes, the typing indicator expires.

---

## Mitigation Strategies

### 1. Post to Live Feed BEFORE Long Operations

**Primary fix**: Before starting any operation that might take >1 minute, post a status update to the Live Feed.

Example:
```
Mo: "Research 3D printers on eBay"
Jarvis: [POST to feed: "Researching 3D printers on eBay..."]
Jarvis: [Do the research — takes 4 minutes]
Jarvis: [Reply to Mo with results]
```

This gives Mo real-time visibility even if my final response takes >2 minutes.

---

### 2. Break Long Operations Into Phases

Instead of:
```
[5 minute silent research] → [Send full result]
```

Do:
```
[Quick acknowledgment: "Looking into this..."]
[POST to feed: "Researching..."]
[Research phase 1 — 2 min]
[POST to feed: "Found 18 listings, compiling..."]
[Research phase 2 — 2 min]
[Send full result]
```

---

### 3. Avoid Agent Delegation for Now

Background agents are the #1 cause of typing TTL hits because:
- They take 3-5 minutes minimum
- They often produce 0 output (fail silently)
- I sit idle waiting for output that never comes

**Decision**: Moratorium on agent delegation until proven reliable.

---

### 4. Acknowledge Messages Immediately

When Mo sends a message:
1. **Acknowledge receipt** within 10 seconds (even if it's just "On it")
2. **Post to feed** what you're about to do
3. **Do the work**
4. **Report results**

Never go silent for >2 minutes without at least a feed post.

---

## Tracking

Typing TTL hits are logged in daily metrics. Target: **<5 typing TTL hits per day**.

Day 2: 11 hits (FAILURE)
Day 3: TBD

---

## Technical Note

The typing indicator TTL is hardcoded in Telegram. OpenClaw can't extend it. The only solution is to:
1. Respond faster (<2 min)
2. Post to the feed during long ops
3. Send intermediate acknowledgments

**This is a discipline problem, not a technical problem.**
