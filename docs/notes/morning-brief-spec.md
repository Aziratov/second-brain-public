---
title: "Morning Brief Specification"
created: "2026-02-08T00:00:00.000Z"
updated: "2026-02-08T00:45:00.000Z"
tags: [spec, morning-brief, automation, daily]
summary: "Specification for the daily 9am EST morning brief delivered via Telegram. Includes weather, YouTube, tasks, news, and recommendations."
priority: high
---

# Morning Brief Specification

## Overview

Every morning at 9am EST, Jarvis sends Mo a comprehensive brief via Telegram.

## Components

### 1. Weather
- **Source**: Weather API for ZIP 43209 (Columbus, OH)
- **Content**: Current temp, high/low, conditions, precipitation chance
- **Format**: Quick 2-line summary

### 2. YouTube Trending
- **Source**: YouTube Data API
- **Filter**: Based on Mo's interests — AI, technology, automation, 3D printing, business
- **Content**: 3-5 trending videos with titles and links
- **Selection**: Use AI to pick most relevant from trending

### 3. Task Overview
- **Source**: Kanban board API (`/api/tasks`)
- **Content**: Tasks in TODO and In Progress columns
- **Highlight**: High-priority items, items due soon

### 4. Jarvis Work Summary
- **Source**: Kanban activity log
- **Content**: What Jarvis accomplished overnight
- **Include**: Completed tasks, PRs created, discoveries made

### 5. Trending News
- **Source**: News API, filtered by interests
- **Topics**: AI, tech, business, markets
- **Content**: 3-5 stories with headlines and brief summaries

### 6. Recommendations
- **AI-generated**: Based on current tasks, goals, and context
- **Types**: Productivity tips, tool suggestions, strategic recommendations
- **Personalized**: Leverages knowledge of Mo's work style and goals

## Technical Implementation

- **Trigger**: Cron job at 9:00 AM EST (14:00 UTC)
- **Delivery**: Telegram DM to Mo
- **Format**: Plain text (Mo prefers no markdown in Telegram)
- **Fallback**: If any API fails, skip that section gracefully

## Mo's Preferences

- **Location**: Columbus, OH (ZIP 43209)
- **Timezone**: EST (UTC-5)
- **Format**: Plain text, no markdown
- **Tone**: Concise, useful, no fluff
