---
title: "Live Feed Discipline — When to Post"
created: "2026-02-09T06:10:00.000Z"
updated: "2026-02-09T06:10:00.000Z"
tags: [jarvis, feed, discipline, communication, operations]
summary: "Defines exactly when Jarvis must post to the Live Feed. Created after repeated feed compliance failures."
priority: high
---

# Live Feed Discipline — When to Post

## The Problem

Mo created the Live Feed so he can watch my work process in real-time. But my feed compliance is abysmal:
- Day 2: 4 posts in a full working session
- Day 3 (last 24h): 3 posts

Mo's feedback from Day 2 journal: "I should be posting at every phase change. This needs to be automatic, not something I remember."

This document defines EXACTLY when I must post.

---

## Mandatory Post Triggers

### 1. Before Starting Long Operations (>1 minute)

**Why**: Prevents Telegram typing TTL timeouts. If I go silent for >2 minutes, Telegram times out. Posting to the feed keeps Mo informed.

**Examples:**
- "Researching 3D printers on eBay..."
- "Reading through property manager API docs..."
- "Analyzing OpenClaw session corruption patterns..."

**Post BEFORE starting the work**, not after.

---

### 2. After Completing Tasks

**Examples:**
- "Sent Tahoe listings email to kking21669@gmail.com"
- "Fixed watchdog grep exclusion — feed-watcher protected from false orphan kills"
- "Property manager database schema designed, ready to build"

---

### 3. When Spawning Agents

**Examples:**
- "Spawned research-agent to analyze 3D printer options (background)"
- "Delegated API documentation read to doc-agent (TeamCreate)"

---

### 4. When Agents Complete or Fail

**Examples:**
- "research-agent completed: found 18 Tahoe listings"
- "doc-agent failed (0 output) — doing the work myself"

---

### 5. On Errors or Blockers

**Examples:**
- "FailoverError: Anthropic API timeout — retrying..."
- "Zoho Sign OAuth blocked: need Mo to authorize in browser"
- "GitHub CLI not configured — awaiting 'gh auth login'"

---

### 6. Phase Changes in Multi-Step Work

**Examples:**
- "Phase 1 complete: schema designed. Starting Phase 2: API endpoints"
- "Database migration successful. Now building React frontend..."

---

### 7. When Asking Mo Questions or Waiting for Input

**Examples:**
- "Created Zoho Sign OAuth URL — need Mo to authorize and provide redirect code"
- "Found 2 approaches for lease e-signatures — asking Mo which to use"

---

## Format Guidelines

- **Type codes**: Use the right badge (`thinking`, `working`, `completed`, `error`, `agent-spawned`, `agent-completed`)
- **Be specific**: Not "working on stuff" — say WHAT you're working on
- **Keep it short**: 1-2 sentences max. The feed scrolls fast.
- **No fluff**: Don't narrate trivial file reads or grep calls. Only meaningful phase changes.

---

## Enforcement

This is now a **hard requirement**. Feed compliance will be tracked in daily metrics. Target: **minimum 1 post per 30 minutes of active work**.

If I go >30 minutes without a feed post during active work, that's a failure.

---

## Implementation

The Live Feed API is: `POST http://192.168.50.39:8080/api/feed`

```json
{
  "type": "working",
  "message": "Building property manager tenant profile UI..."
}
```

Valid types: `thinking`, `working`, `completed`, `error`, `agent-spawned`, `agent-completed`

**No excuses. Just post.**
