---
title: "Agent Delegation Strategy — Current Moratorium"
created: "2026-02-09T06:20:00.000Z"
updated: "2026-02-09T06:20:00.000Z"
tags: [jarvis, agents, delegation, strategy, operations]
summary: "Formal decision on agent delegation after repeated failures. Moratorium in effect until reliability improves."
priority: high
---

# Agent Delegation Strategy — Current Moratorium

## Historical Context

### Day 1 — Agent Delegation Experiments

Tested multiple approaches:
1. **Task tool with run_in_background=true**: 0% success rate (5 agents spawned, 0 output)
2. **TeamCreate (native Agent Teams)**: Partial success (1 agent worked, others failed)

**Key lesson from Day 1**: "Max 2 concurrent agents. Health check at 3 minutes. 10-minute hard timeout. Be ready to do it yourself."

Full details: `notes/agent-failure-log.md`

---

### Day 2 — Agent Failures Continue

Mo asked for 3D printer research. Spawned 2 background research agents. **Both failed** (0 output). Did the research myself.

**Result**: 0 agent tasks attempted in last 24h. I stopped delegating entirely after the failures.

---

## Current Decision: MORATORIUM

**Effective immediately**: No agent delegation until the underlying issues are resolved.

### Why?

1. **Reliability is <50%** — More agents fail than succeed
2. **Typing TTL violations** — Waiting for agents causes 2+ minute delays
3. **Wasted time** — Spawning an agent, waiting 5 minutes, getting 0 output, then doing the work myself is SLOWER than just doing it myself from the start
4. **No clear pattern** — Can't predict when agents will work vs. fail

---

## What Works: Do It Myself

**Approach**: Use the tools directly instead of delegating to agents.

Instead of:
```
Task tool → spawn agent → wait 5 min → agent fails → do it myself
```

Do:
```
Use Grep, Read, WebFetch, Bash directly → get result in <2 min
```

**Benefits:**
- Faster (no agent spawn overhead)
- More reliable (I control the tools)
- No typing TTL violations (finish in <2 min)
- Better feed visibility (I post status updates as I work)

---

## When the Moratorium Ends

The moratorium will be lifted when:
1. **Agent success rate >80%** in controlled testing
2. **Clear failure patterns identified** (e.g., "background agents always fail, but TeamCreate works")
3. **Timeouts are tunable** (can set 2-minute max instead of 10-minute default)

Until then: **just do the work myself.**

---

## Exceptions

The only exception is if Mo explicitly requests agent delegation or if Claude Code upstream fixes the known issues.

---

## Tracking

Daily metrics track:
- `agents.agent_tasks_today`: 0 (expected during moratorium)
- `agents.succeeded`: N/A
- `agents.failed`: N/A

When the moratorium ends, we'll start tracking these again.

---

## Alternative: Parallel Tool Calls

Instead of delegating to agents, use **parallel tool calls** for independent operations.

Example:
```
Instead of: spawn 3 agents to research 3 topics
Do: make 3 WebFetch calls in parallel
```

This gives parallelism without the agent reliability problem.

---

## Summary

**Status**: Moratorium in effect
**Reason**: <50% success rate, typing TTL violations, wasted time
**Alternative**: Do work myself with direct tool calls
**End condition**: >80% agent success rate in testing

No agent delegation until further notice.
