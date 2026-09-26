---
title: "How React Uses the Main Thread: Trigger → Render → Commit"
date: 2026-02-21T22:21:19.275Z
description: "How the browser's main thread actually works, where React's Trigger → Render → Commit pipeline fits inside it, and why that explains every kind of slowness you've seen."
series: React Performance
coverImage: /images/blog/react-main-thread.jpg
coverAlt: "One red thread running through a bell, a drafting compass and a rubber stamp"
---

## Introduction

In the [last article](/blog/My-React-App-Feels-Slow-Is-Not-a-Diagnosis/), we talked about the three kinds of "slow" your users actually experience — slow load, slow input response, and jank — and connected each to concrete metrics like TTI, interaction latency, and frame budget. The key takeaway was that "it feels slow" is not a diagnosis; different symptoms live in different parts of the stack.

But knowing _what_ feels slow is only half the job. The other half is understanding _how work actually flows_ — from a user action or initial page load all the way to pixels on the screen. That means understanding two things together: what the browser's main thread is doing at any given moment, and where React fits inside it.

Once you have that picture, you stop staring at a performance trace wondering which colored bar is the bad one. You start recognizing patterns: "Oh, that long yellow block is React calling my components. That's the render phase. And _that_ is why the input felt unresponsive."

This article builds that picture.

---

## 1. The browser's main thread in plain English

Your browser tab has one main thread. One. It is responsible for running your JavaScript, calculating styles, doing layout, painting pixels, compositing layers, and processing input events like clicks, keypresses, and scrolls — all of it, sequentially, on the same thread.

That last part is the key constraint. While your JavaScript is running, the thread cannot process a new click. It cannot do layout. It cannot paint. Everything else has to wait until the current task finishes.

### Long tasks and why 16 ms and 50 ms matter

The browser tries to produce a new frame roughly every 16 milliseconds on a 60 Hz display. That means every piece of work — JS execution, style, layout, paint — needs to fit inside that window for perfectly smooth motion. Blow the budget and the frame is dropped. Users see jank.

Think of a healthy frame as: a few milliseconds of JavaScript, a few milliseconds for the browser to compute styles and layout, a few milliseconds to paint, and then the thread goes idle waiting for the next frame. The whole thing wraps up in under 16 ms.

A frame with a long task looks completely different. The JavaScript alone takes 50, 60, or 80 ms. By the time it finishes, the browser has already missed one or more frame deadlines. Style and layout run late. Paint runs late. The user sees a frozen UI and then a sudden jump.

For interactions specifically, browsers define a **long task** as any continuous JavaScript execution that takes more than **50 ms**. Why 50 ms? Research suggests that delays under ~100 ms feel instant to users, but you need headroom for the browser's own work after your JS finishes. 50 ms of JS still gives the browser a fighting chance to update the screen and dispatch the next input event before anyone perceives a delay.

During a long task, any input the user fires — a click, a keypress — has to wait in a queue. The browser received the event, but it cannot dispatch it until the current task finishes. The interaction feels delayed even though nothing was technically "lost." This is why performance profiling is so often about finding long tasks and figuring out what is inside them.

---

## 2. React's pipeline: Trigger → Render → Commit

React does not magically bypass the main thread. Every time React needs to update the UI, it runs JavaScript. That JavaScript lives on the main thread, right alongside everything else.

React structures that work into three phases: Trigger, Render, and Commit. After those three phases finish, control returns to the browser, which then handles its own style, layout, and paint work before the user sees anything change.

Understanding each phase individually is the key to understanding almost every React performance problem you will encounter.

### Trigger

Something tells React it needs to do work. This could be the initial mount of your app, a `setState` or `useState` updater being called, a context value changing, or a parent component re-rendering which by default causes its children to re-render too.

The trigger phase itself is cheap. It is just React scheduling work — noting that something needs to update and queuing it up.

### Render

This is the expensive one, and it is frequently misunderstood.

**Render does not touch the DOM.** Render is React calling your component functions, collecting their return values (JSX), and building a new virtual representation of the UI — sometimes called the fiber tree or virtual DOM. React then compares this new tree against the previous one (this comparison is called reconciliation or diffing) to figure out what actually changed.

Think of it this way: render is a calculation phase. React is doing math, not surgery.

This distinction matters enormously for performance. Heavy or redundant work in render wastes time on calculations that may not even produce DOM changes. And because render happens synchronously on the main thread (outside of React's concurrent features), anything expensive here blocks everything else.

### Commit

Once React knows what changed, it applies those changes to the real DOM. This is the moment React actually touches the document.

Commit is designed to be fast by construction — React only writes the differences it found during reconciliation, not the entire tree. A subtle text change in a deeply nested component should result in one targeted DOM mutation, not a full subtree rebuild.

After commit, React's work is done. Control returns to the browser, which recalculates styles, computes layout, fills pixels into layers, and composites the final frame. Only then does the user see anything change on screen.

---

## 3. What happens in the Render phase

Your components are just functions. During the render phase, React calls them:

```jsx
function ProductList({ items }) {
  // React calls this function during render
  // ⚠️ runs every render
  const sorted = items.sort((a, b) => b.rating - a.rating);
  return (

      {sorted.map(item => )}

  );
}
```

There is a problem in that example. `items.sort()` runs on every render, every time `ProductList` is called. If `items` has a thousand entries and this component re-renders frequently — say, because a parent updates on every keystroke — you are sorting a thousand items on every keystroke. That time adds up directly on the main thread.

This is also why **render should be pure and free of side effects**. React's reconciler (and concurrent mode in particular) may call your component functions more than once, out of order, or throw away results and start over. If your render function reaches out to the DOM, fires a network request, or modifies external state, things break in subtle and hard-to-reproduce ways. The render phase is a calculation — it should take some props and return some JSX, nothing else.

When React renders a subtree, it works top-down: it calls the parent component, then each child in order, then their children, all the way down. Every one of those function calls is JavaScript running on the main thread. A re-render that touches 40 components is 40 function calls, plus the reconciliation work comparing the new tree to the old one. That is where your render phase time goes.

Heavy work in render is one of the primary causes of both interaction latency and jank. The fix is not always memoization — sometimes it is structuring components so they simply get called less often, or moving expensive calculations out of the hot path entirely. But you cannot make good decisions about that without first understanding that render = calling your components = running JavaScript on the main thread.

---

## 4. What happens in the Commit phase

After the diff, React knows precisely which DOM nodes need to change. The commit phase applies those changes as efficiently as possible.

There are two importantly different scenarios.

**Initial mount:** React has no previous DOM to compare against. Every element in the tree gets created and inserted. This is inherently more expensive than any subsequent update — you are building the whole structure from scratch. For large component trees, this is often the dominant cost during initial page load.

**Updates:** React applies only what changed. If you toggle a boolean that controls one CSS class on one `<button>`, React writes exactly one DOM attribute change. The rest of the tree is untouched.

Once commit finishes, the browser takes over. It sees that the DOM changed and works through its own pipeline: style recalculation, layout, paint, and compositing. Only after all of that does the screen update.

This means React's commit phase and the browser's layout and paint are coupled. A small DOM change in the right place — like changing a `width` or `top` value — can trigger a full layout recalculation of large parts of the page. React can do its job perfectly and the frame can still drop because of what the DOM change caused downstream.

---

## 5. How this maps back to "slow"

Now we can connect the pipeline back to the three buckets from Article 1 and be precise about where time is actually going.

### Load slowness

When a user opens your app for the first time, the main thread works through a fixed sequence before anything useful appears on screen. First the browser downloads HTML, CSS, and JavaScript — that part happens off the main thread over the network. Then the main thread takes over: it parses and executes your JavaScript bundles, React runs the initial render phase calling every component in your tree for the first time, React commits every DOM node, and finally the browser does layout and paint.

The long stretches before anything shows up are driven by three things: how much JavaScript you ship (which determines parse and execution time), how complex your initial component tree is (which determines render phase time), and how many DOM nodes get created (which affects the initial commit). TTI and TBT are directly driven by those three.

This is why code splitting matters at the load level. Cutting the JS you execute upfront shortens that first big block of work. It has nothing to do with `useMemo`.

### Interaction slowness

When a user taps a button, the gap between "I tapped" and "something changed on screen" includes several steps in sequence: if the main thread is already busy with a long task, the event waits in a queue until that task finishes; then the browser dispatches the event to your handler; your handler runs and calls setState; React goes through Trigger, then Render, then Commit; and finally the browser does style, layout, and paint.

Every one of those steps adds latency. If your render phase is expensive because the state update causes a large subtree to re-render, that is where the delay lives. If your handler itself does heavy synchronous work before even calling setState, that is where the delay lives. Profiling interaction slowness is about finding which step in that chain is taking the most time.

### Jank

Jank is what happens when render or commit work regularly exceeds the ~16 ms frame budget during continuous interaction.

Imagine a scroll handler that triggers a React re-render on every event. In a good frame, the render takes 10 ms, the browser paints in 4 ms, and everything finishes in 14 ms — within budget. In a bad frame, the same render takes 42 ms because the scroll triggered a re-render of a large list. The frame was supposed to finish at 16 ms but finishes at 52 ms instead. The browser missed the frame it should have painted, and the user sees a stutter. Then the next frame arrives and work is reasonable again. Things recover. But the user noticed that hiccup.

Jank is almost always "too much render or commit work per frame." The render phase is the usual suspect because it is proportional to how many components you call and how much work each one does. Virtualizing long lists, narrowing what re-renders, and memoizing expensive calculations are all ultimately about keeping render work inside the 16 ms frame budget.

---

## 6. Putting it all together

Here is the complete sequence of what happens when a user taps a button in your React app, from finger to pixels:

1. The user taps. The browser queues a click event.
2. If the main thread is busy with a long task, the event waits. Otherwise, the browser dispatches it immediately.
3. Your event handler runs — maybe calling `setState`.
4. React enters the Trigger phase and schedules an update.
5. React enters the Render phase — it calls all affected components top-down, builds a new fiber tree, and diffs it against the previous one.
6. React enters the Commit phase — it applies the minimal set of DOM mutations.
7. The browser recalculates styles, runs layout, paints, and composites the final frame.
8. The user sees the result.

Every step from 3 onward is work on the main thread. When someone asks "where is the time going?", the answer is always one of those steps — usually step 5 (Render), occasionally step 7 (browser layout triggered by the wrong kind of DOM change).

The question to ask before reaching for any optimization tool is: **which step in this sequence is too slow?** A slow initial load is usually step 5 on the first mount plus the JS execution before it. A sluggish button response is usually step 5 on an update. Choppy scroll is usually step 5 running over budget on every frame. Once you can point to the step, the space of reasonable fixes gets much smaller.

---

## What's next

You now have the pipeline. You know that React's render phase is calling your component functions, that the commit phase is writing to the DOM, and that all of it runs on the same main thread that handles your user's input and the browser's paint work.

But knowing the pipeline raises a new question: **when and why does React actually re-render?**

In the next article, we will dig into exactly that — the rules that govern when React decides to call your components, how re-renders cascade through the tree, and why a single state update high in the tree can end up running dozens of component functions you never expected. That understanding is the prerequisite for any meaningful memoization or optimization work.

In the meantime, open your browser's DevTools and pull up the Performance panel on something that feels slow. Look for long yellow tasks. Ask yourself: "Is this the render phase? The commit? Something else on the main thread entirely?" You do not need to understand every detail yet — just start getting comfortable matching the shapes in the trace to the mental model you now have.

---

_This is Part 2 of the React Performance Blog Series. [← Part 1: "My React App Feels Slow" Is Not a Diagnosis](/blog/My-React-App-Feels-Slow-Is-Not-a-Diagnosis/)_
