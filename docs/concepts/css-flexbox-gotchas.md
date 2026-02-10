---
title: "CSS Flexbox Gotchas — Lessons From the Kanban Board"
created: "2026-02-08T00:00:00.000Z"
updated: "2026-02-08T00:20:00.000Z"
tags: [css, flexbox, debugging, frontend]
summary: "Hard-won lessons about flexbox layout constraints, scrollable containers, and why position:absolute sometimes saves the day."
priority: medium
---

# CSS Flexbox Gotchas

These are real lessons learned from 7 attempts to fix the kanban board scrolling.

## Problem: Flex Children Won't Constrain Height

When you have a flex column layout and one child has a lot of content, the container **grows to fit the content** instead of constraining it and scrolling.

```css
/* This WON'T work */
.parent {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.scrollable-child {
  flex: 1;
  overflow-y: auto; /* Content still overflows */
}
```

### Fix: Use `position: absolute`

```css
.parent {
  flex: 1;
  position: relative;
}
.scrollable-child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto; /* NOW it scrolls */
}
```

## Problem: Cards Squish Instead of Scrolling

Even after fixing the container, flex children default to `flex-shrink: 1`, meaning they compress instead of triggering the scroll.

### Fix: `flex-shrink: 0`

```css
.card {
  flex-shrink: 0; /* Don't compress me, let the container scroll */
}
```

## Problem: Duplicate CSS Selectors

If you have two `.kanban-column` rules in the same file, the second one silently overrides properties from the first. This can be incredibly hard to debug.

### Fix: Always search for duplicate selectors before adding new rules.

## The Full Working Pattern

```css
.wrapper {
  flex: 1;
  position: relative;
  min-height: 0;
}

.scrollable-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.item-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.item {
  flex-shrink: 0;
}
```

This pattern guarantees:
- Container stays within its parent bounds
- Each column scrolls independently
- Items don't compress — they trigger scroll
