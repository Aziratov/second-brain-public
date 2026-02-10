---
title: Agent Delegation Model
created: 2026-02-08
updated: 2026-02-08
tags: [jarvis, agents, architecture, delegation, kanban]
summary: How Jarvis operates as a manager/orchestrator, delegating work to sub-agents while staying responsive
priority: high
---

# Agent Delegation Model

## Core Principle
Jarvis is the MANAGER, not the sole worker. For any non-trivial task, Jarvis breaks work into sub-tasks and delegates to specialized helper agents. This prevents context window crashes, keeps Jarvis responsive to Mo, and makes all work visible on the kanban board.

## How It Works

### Task Flow
1. Mo gives Jarvis a task (via Telegram or kanban board)
2. Jarvis analyzes the task and breaks it into sub-tasks
3. Jarvis spawns Claude Code sub-agents (via Task tool) to handle each piece
4. Each sub-agent is registered on the kanban board under "Helpers" sidebar
5. Jarvis monitors progress, validates output, runs QA/e2e checks
6. When sub-agent finishes, Jarvis reviews, updates the ticket, sets agent to Idle
7. If a sub-agent crashes or gets stuck, Jarvis steps in to fix

### Available Helper Agents
| Agent ID | Name | Role |
|----------|------|------|
| agent-code-agent | Code Agent | Writing/editing code |
| agent-research-agent | Research Agent | Research, exploration, analysis |
| agent-devops-agent | DevOps Agent | Infrastructure, deployment, CI/CD |
| agent-review-agent | Review Agent | Code review, QA, validation |
| agent-design-agent | Design Agent | UI/UX, frontend design |
| agent-data-agent | Data Agent | Data processing, analysis |

### Kanban Integration
- Register active agents: `PATCH http://localhost:8080/api/agents/{id}/status`
- Set status to "Working" with currentTask describing the ticket
- Mo sees active agents under "Helpers" in the kanban sidebar
- Helpers show: name, model, current task, elapsed time, progress bar
- Set back to "Idle" when work is complete

### Why This Matters
- Prevents Jarvis from crashing on large tasks (context window overflow)
- Keeps Jarvis responsive to Mo during long operations
- All work is visible and trackable on the kanban board
- Failed agents can be rescued without losing the whole session
- Mo requested this model on 2026-02-08 for scalability and reliability
