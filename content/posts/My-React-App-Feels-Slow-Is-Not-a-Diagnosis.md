---
title: “My React App Feels Slow” Is Not a Diagnosis
date: 2026-02-14T18:31:31.386Z
description: "In this post, you’ll learn why “my React app feels slow” is not a useful diagnosis, and how to translate vague user feedback into concrete categories like slow load, slow interaction, and janky scrolling. You’ll see how these map to web‑performance concepts like Time to Interactive, interaction latency, Total Blocking Time, and dropped frames, so you stop guessing where time is spent and start optimizing the right part of your React app."
series: "React Performance"
---

## Introduction

Most React performance stories start the same way: someone says, “This page feels slow.”

A product manager clicks into an Orders dashboard, waits a couple of seconds for anything useful to show up, and files a bug: “Optimize React performance on Orders page.” A few stand‑up meetings later, the team is experimenting with `useMemo` and `useCallback`, wrapping half the tree in `React.memo`, and shaving a couple kilobytes off a bundle.

The ticket gets closed. And yet, under real load or on a mid‑range Android phone, the page still feels sluggish.

The real issue usually isn’t that React is “too slow.” The issue is that **“it feels slow” is not a useful diagnosis**.

When users say an app is slow, they are describing a feeling, not a metric. That feeling can come from several completely different problems:

- The screen takes too long to show anything meaningful after navigation.
- The UI _looks_ ready, but taps and clicks don’t respond right away.
- Scrolling or typing stutters and drops frames.

Each of those is “slow,” but they live in different parts of the stack and have very different fixes. If you jump straight to micro‑optimizations in React components without understanding _which kind of slowness_ you are dealing with, you are basically guessing.

This post is about replacing that guesswork with better mental models.

Before touching `useMemo`, virtualization, or state libraries, it helps to understand three things:

1. What “slow” actually means in terms of **user‑visible behavior and metrics**.
2. How different kinds of slowness map to **different layers** of your app and the browser.
3. Why getting this wrong leads to **optimizing the wrong things** in React.

This article introduces the first part of that foundation: **translating “it feels slow” into concrete categories and metrics**. The next article will zoom in on how the browser’s main thread and React’s render pipeline turn your code into pixels on the screen.

---

## 1. The three kinds of “slow” in React apps

Before you can optimize a React app, you need to be precise about _what kind of slow_ you are dealing with. Most performance problems fall into three broad buckets:

1. **Slow to show something useful** (load performance)
2. **Slow to respond to input** (interaction latency)
3. **Janky while you interact** (animation/scroll jank)

Once you can put a problem into one of these buckets, the space of reasonable fixes shrinks a lot.

### 1.1 Slow to show something useful

This is what users experience when they click a link or open your app and… nothing seems to happen for a while. Maybe there’s a blank screen. Maybe there’s a spinner, but no real content.

Typical user quotes:

- “I click on ‘Orders’ and it just sits there for a couple of seconds.”
- “On mobile, the app takes forever before I can actually use it.”

Under the hood, a mix of things might be happening:

- Network time for HTML, CSS, JS, and initial data.
- Downloading, parsing, and executing your JavaScript bundles.
- The initial React render of your top‑level view.
- The browser doing layout and paint for the first time.

The common theme: the user is blocked **before they can do anything**. They are waiting for the app to become visibly and functionally “there.”

### 1.2 Slow to respond to input

Here, the UI _looks_ alive. Buttons, inputs, and lists are visible. But when users interact, there is a noticeable delay before anything happens.

Typical user quotes:

- “I click ‘Apply Filters’ and nothing happens for a moment, then everything updates at once.”
- “Tapping the menu sometimes takes half a second before it opens.”

This is usually about:

- Event handlers doing heavy work on the main thread.
- State updates triggering expensive re‑renders across large parts of the tree.
- Other long‑running tasks still blocking the main thread when the interaction occurs.

The symptom: **input happens, feedback is delayed**. Users feel ignored, even if the app eventually catches up.

### 1.3 Janky while interacting

In this case, the UI does respond, but it feels rough: scroll stutters, drag/resize judders, typing lags as characters appear.

Typical user quotes:

- “Scrolling that table is choppy.”
- “Typing in the search input lags when the results update.”
- “Dragging that panel feels like it’s stuck every few pixels.”

Here, motion and interaction are competing with other work on the main thread:

- React is re‑rendering large or complex subtrees on every scroll/keystroke.
- DOM updates are causing heavy layout and paint work mid‑interaction.
- Long tasks during animation frames are blowing past the frame budget.

The user sees **stutter instead of smooth motion**. This is often the difference between “acceptable” and “this feels cheap.”

---

## 2. The metrics behind those feelings

Under the hood, those feelings correlate with a few key performance concepts. You do not need to memorize spec‑level definitions, but having an intuitive sense of them is crucial when you start profiling and making trade‑offs.

Here are the big ones and how they map to the three buckets.

### 2.1 Time to Interactive (TTI)

**What it is, intuitively**\
Time to Interactive is the moment when the page has **both**:

- Meaningful content on screen, and
- A main thread that is free enough to reliably respond to input.

Restaurant analogy: the lights are on and the menu is in your hand—but TTI is when a server is actually available to take your order. Before that, the place _looks_ open, but you cannot get anything done.

**Which “slow” it explains**\
TTI is tightly connected to the **“slow to show something useful”** bucket:

- If your bundles are large and take a long time to parse and execute, TTI is delayed.
- If you run heavy initialization code before attaching event handlers, TTI is delayed.
- If the main thread is busy with long tasks, the browser may show UI, but it is not truly interactive yet.

Even if your React components are individually “fast,” a giant bundle or heavy startup logic will make the app feel slow to start.

### 2.2 Interaction latency (INP)

**What it is, intuitively**\
Interaction latency is how long it takes between a user doing something (click, tap, key press) and your JavaScript actually starting to run the handler and produce feedback.

Analogy: you flip a light switch, but the light turns on a beat later because something is delaying the signal.

**Which “slow” it explains**\
This maps to the **“slow to respond to input”** bucket:

- Your UI is on screen, but the main thread is busy with something else when the user interacts.
- The click handler sits in the event queue until the current long task finishes.
- By the time React starts processing the event and updating state, the user has already felt the delay.

React does not own the event loop, but heavy React work (or any heavy JS) contributes directly to this gap.

### 2.3 Total Blocking Time (TBT)

**What it is, intuitively**\
Total Blocking Time is the sum of all the time during initial load where the main thread is blocked by **long JavaScript tasks** (usually defined as >50 ms each).

Analogy: a construction crew keeps blocking the only road into a neighborhood with long closures. Even if each closure eventually ends, the total time cars are blocked from entering is what matters for people trying to get home.

**Which “slow” it explains**\
TBT is a key part of the **“slow to show something useful”** feeling:

- Big monolithic bundles, lots of synchronous work in module initializers, and heavy startup logic drive TBT up.
- High TBT usually correlates with poor TTI and with the “page is frozen for a while” feeling, even if content is visible.

If TBT is high, obsessing over `React.memo` on a single component is rearranging deck chairs.

### 2.4 Jank and dropped frames

**What it is, intuitively**\
The browser aims to render at 60 frames per second (or more), which gives about **16 ms per frame**. All your JS for that frame—event handlers, React renders, DOM updates—must complete within that window if you want perfectly smooth motion.

If you routinely take longer than that, the browser cannot update every frame, and users see stutter or “laggy” motion.

Analogy: a flip‑book animation where some pages are missing or repeated, so the motion looks choppy.

**Which “slow” it explains**\
This lines up with the **“janky while interacting”** bucket:

- Every scroll event, mouse move, drag, or key press can potentially trigger React work.
- If that work involves re‑rendering large lists, running expensive calculations, or triggering expensive layout, you blow through the 16 ms budget.
- The result is visible jank: choppy scrolling, laggy typing, jerky drag handles.

Here, performance is less about “how long the page took to load” and more about “how much work you try to do per frame.”

---

## 3. Why these distinctions matter to React developers

At this point you might be thinking: “Okay, nice taxonomy. But I just want my React app to be fast—why split hairs?”

Because each kind of slowness tends to live in **different parts of your system** and calls for different strategies. If you misclassify the problem, you will very likely optimize the wrong thing.

### 3.1 Different symptoms, different likely causes

Consider how these map:

- **Slow to show something useful (TTI / TBT issues)**\
  Likely culprits:
  - Large bundles and too much JavaScript on the initial route.
  - Heavy module initialization logic (big config, data transformations at import time).
  - Complex above‑the‑fold React trees rendered on first paint.
    Useful tools:
  - Code splitting, lazy loading, and reducing initial JS.
  - Moving non‑critical work later (on interaction or in the background).
  - Simplifying the initial view or deferring heavy components.
- **Slow to respond to input (interaction latency)**\
  Likely culprits:
  - Event handlers doing expensive synchronous work.
  - State updates that cause large parts of the tree to re‑render.
  - Other long tasks running at the same time (e.g., analytics, logging, big computations).
    Useful tools:
  - Profiling and simplifying handlers.
  - Adjusting state placement to narrow the re‑render scope.
  - Deferring or chunking non‑critical work.
- **Janky while interacting (dropped frames)**\
  Likely culprits:
  - Re‑rendering large lists or complex components on each small change.
  - DOM updates that trigger heavy layout and repaint on every frame.
  - Doing animation logic in JS instead of leveraging CSS/compositor when possible.
    Useful tools:
  - List virtualization.
  - `React.memo`/memoization _when_ re‑render cost is actually the problem.
  - Moving heavy work off the hot path (or off the main thread entirely).

React plays a role in all of these, but not always in the same way. Sometimes the right fix is about how you structure components and state; sometimes it is about bundles and build output; sometimes it is about architecture choices like SSR, caching, or workers.

### 3.2 Why “optimize React” is often the wrong starting point

When teams treat “my React app is slow” as a single problem, a few common patterns show up:

- Blanket rules like **“always wrap handlers in `useCallback`”** or **“never use inline functions”**—even in components that render once.
- Premature **`React.memo` everywhere**, without profiling to see if rerenders are a real bottleneck.
- Framework hopping: **“React is slow, let’s rewrite in X”**—only to reproduce the same issues in a new stack.

All of these stem from a missing mental model. If you do not distinguish between “slow start,” “slow interaction,” and “janky frames,” and you do not connect those to things like TTI, interaction latency, TBT, and frame budget, then any optimization is a shot in the dark.

The shift you want is:

> Instead of asking “How do I make React faster?”, start by asking\
> **“What exactly is slow? Is it load, interaction, or animation—and what does that suggest about where the time is going?”**

Once you can answer _that_ with some confidence, the rest of your performance work becomes much more targeted:

- You know when you should focus on bundles versus components.
- You know when you should reach for memoization versus state refactors.
- You know when the real fix is “do less work per frame,” not “switch libraries.”

---

## 4. Where this series goes next

This post stayed deliberately high‑level and user‑centric. The goal was to give you a vocabulary:

- Three buckets of “slow” your users actually experience.
- A handful of core metrics—TTI, interaction latency, TBT, jank—that explain those feelings.
- The idea that different symptoms usually point to different layers of your app.

In the next part of this series, the focus shifts from **“what feels slow”** to **“how work actually flows”**:

- How the browser’s **main thread** juggles JavaScript, layout, paint, and input.
- How React fits into that with its **Trigger → Render → Commit** pipeline.
- How long tasks, re‑renders, and DOM updates show up in performance tools.

That mental model will make it much easier to look at a profile and say, “Ah, _this_ is where the time is really going,” before you ever touch `useMemo`.

In the meantime, a practical exercise:\
Pick one “slow” screen in your app and write down, in a single sentence, which category it falls into:

> “When I \<action>, it feels slow because \<load / input / jank>.”

If you can do that clearly, you are already ahead of most performance tickets.
