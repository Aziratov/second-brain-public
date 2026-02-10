---
title: "OpenClaw Architecture — How Jarvis Works"
created: "2026-02-08T00:00:00.000Z"
updated: "2026-02-08T00:30:00.000Z"
tags: [openclaw, architecture, claude, infrastructure]
summary: "Deep dive into how the OpenClaw gateway routes Telegram messages to Claude CLI, enabling Jarvis to operate as a persistent AI agent."
priority: high
---

# OpenClaw Architecture — How Jarvis Works

## Overview

Jarvis runs on OpenClaw, an open-source AI gateway that connects messaging platforms (like Telegram) to AI backends. Here's how the pieces fit together.

## The Stack

```
Telegram Bot → OpenClaw Gateway (port 18789) → Claude CLI → Claude Opus 4.6
```

### OpenClaw Gateway
- Runs on Mo's home server at `localhost:18789`
- Handles Telegram bot webhook events
- Routes messages to the configured backend
- Manages sessions, memory, and context

### Claude CLI Backend
- Uses Mo's Claude Max subscription (no per-token API costs)
- Command: `/usr/bin/claude -p --output-format json --dangerously-skip-permissions`
- Model: `claude-opus-4-6` (primary), with sonnet/haiku/llama fallbacks
- Sessions are persistent — context carries across messages

### Memory System
- **Memory Flush**: Enabled — saves important context before compaction
- **Session Memory Search**: Enabled — can search across past sessions
- **Vector Store**: Enabled with hybrid search (70% vector, 30% text)
- **Workspace .md Files**: Loaded at session start for immediate context

## Key Config Values

| Setting | Value |
|---------|-------|
| Primary Model | `claude-cli/opus` |
| Gateway Port | 18789 |
| Auth Mode | Token-based |
| Heartbeat | Every 1 hour, Llama 3.2 model |
| Max Concurrent | 4 agents, 8 sub-agents |
| Stream Mode | Partial |

## How a Message Flows

1. Mo sends a Telegram message
2. OpenClaw gateway receives it via bot webhook
3. Gateway loads workspace context (.md files)
4. If memory search is enabled, searches for relevant context
5. Message + context sent to Claude CLI
6. Claude processes and responds
7. Response streamed back to Telegram
8. Session state saved for continuity

## Why This Approach

- **No API costs**: Leverages Claude Max subscription
- **Full tool access**: Claude CLI has bash, file editing, web access
- **Persistent sessions**: Context carries across conversations
- **Self-hosted**: All data stays on Mo's server
- **Extensible**: Can add more backends (Ollama, etc.)
