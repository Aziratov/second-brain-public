---
title: "GitHub Integration for PRs"
created: "2026-02-08T04:00:00.000Z"
updated: "2026-02-08T04:00:00.000Z"
tags: [github, pull-requests, git, automation, ci-cd]
summary: "Full GitHub integration enabling Jarvis to create branches, commit code, open PRs, and manage the code review workflow through Telegram."
priority: high
---

# GitHub Integration for PRs

## Overview

Jarvis can now manage the full GitHub pull request lifecycle: creating branches, committing changes, pushing to remote, and opening PRs for Mo's review. All operations are accessible via Telegram commands and are integrated into the agent worker system for autonomous PR creation.

## Architecture

```
Telegram (/pr commands)
    |
    v
index.js --> github.js --> gh CLI --> GitHub API
    |                         |
    v                         v
kanban.js           git CLI (local repo)
    |
agent-worker.js
(auto-PR on task completion)
```

### Key File: `src/github.js`

The GitHub module wraps both `gh` CLI and `git` CLI into a clean ES module API:

| Function | Description |
|----------|-------------|
| `checkAuth()` | Verify gh CLI authentication status |
| `isGitRepo(cwd)` | Check if directory is a git repository |
| `currentBranch(cwd)` | Get current branch name |
| `createBranch(name)` | Create and switch to a new feature branch |
| `commitFiles(files, message)` | Stage specific files and commit |
| `commitAll(message)` | Stage all changes and commit |
| `pushBranch()` | Push current branch to origin |
| `createPR({title, body, ...})` | Open a pull request via gh CLI |
| `listPRs({state, limit})` | List PRs with filtering |
| `getPR(number)` | Get full PR details |
| `createPRWorkflow({...})` | Full workflow: branch -> commit -> push -> PR |

## Safety Rules (CRITICAL)

1. NEVER commit directly to main/master - all functions enforce this
2. NEVER push to main/master - blocked at the module level
3. NEVER merge without Mo's review - PRs created as drafts by default
4. All commits include `Co-Authored-By: Jarvis` for traceability
5. Branch names auto-prefixed with `jarvis/` namespace

## Telegram Commands

| Command | Description |
|---------|-------------|
| `/pr` | Overview: auth status + open PRs |
| `/pr list [state]` | List PRs (open/closed/all) |
| `/pr <number>` | View specific PR details |
| `/pr status` | Show git status of the repo |
| `/pr auth` | Check GitHub authentication |

## Agent Auto-PR

When the agent worker completes a code task, it automatically:

1. Checks if GitHub is authenticated and we're in a git repo
2. Creates a feature branch: `jarvis/task-{id}-{title-slug}`
3. Commits all changes with a descriptive message
4. Pushes the branch to origin
5. Opens a draft PR linking back to the kanban task
6. Updates the kanban task with the PR URL

This behavior can be disabled by setting `GITHUB_AUTO_PR=false` in `.env`.

### Which Tasks Get Auto-PR?

Only tasks matching ALL of these criteria:
- Assigned to Code Agent or DevOps Agent
- Title/description contains keywords: code, build, implement, write, create, develop, engineer, fix, refactor, add, update

## Setup Requirements

### 1. Authenticate gh CLI

```bash
gh auth login
# Follow the prompts - choose GitHub.com, HTTPS, and authenticate
```

### 2. Initialize Git Repo (if needed)

```bash
cd /home/mo/mo-assistant
git init
git remote add origin https://github.com/USERNAME/REPO.git
```

### 3. Environment Variables (optional)

Add to `/home/mo/mo-assistant/.env`:

```
GITHUB_REPO=username/repo-name
GITHUB_AUTO_PR=true
BRANCH_PREFIX=jarvis
```

## Branch Naming Convention

All Jarvis-created branches follow: `jarvis/{description}`

For task-linked PRs: `jarvis/task-{taskId}-{title-slug}`

Examples:
- `jarvis/task-513f0a16-github-integration`
- `jarvis/task-abc12345-fix-memory-leak`

## PR Body Template

PRs created by Jarvis include:
- Summary from task description
- Link back to kanban task ID
- "REVIEW REQUIRED" notice
- Draft status by default

## Integration Points

### Kanban Board
- Task completion notes include PR URL when auto-PR is created
- `/tasks` command shows PR links on completed tasks

### Agent Worker
- `agent-worker.js` imports `createPRWorkflow` from `github.js`
- Auto-PR runs after task output is stored but before marking done
- Failures are logged but don't block task completion

### Telegram Bot
- `index.js` imports GitHub module for `/pr` commands
- All output formatted for Telegram (plain text, no markdown)
