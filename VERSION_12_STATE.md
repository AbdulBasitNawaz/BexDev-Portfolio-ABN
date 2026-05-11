# Project State: Version 12 (Checkpoint)
**Date:** 2026-05-11
**Status:** Stable / Baseline

## 1. ChatBot Assistant & LiveCounter
- **Notification Cycle:**
  - Initial delay: **15 seconds** after page load.
  - Display duration: **15 seconds**.
  - Recurring interval: Appears **every 5 minutes**.
- **Interactive Features:**
  - **Animated Eyes:** Eyes transition from left to **center** smoothly (using `left: 50%` and `transform: translateX(-50%)`) when content switches to viewing count.
  - **Reaction:** Pupils dilate (scale up) and `look-around` animation pauses on hover/touch.
  - **Dismissal:** Click/tap the box to hide it immediately.
- **Visuals:** Dark bubble with a chat-tail (`::after`), positioned above the chatbot trigger button.

## 2. Skills Section (Tools & Technologies)
- **Animation Pattern:**
  - Cards slide in horizontally from `x: 100vw`.
  - Stagger: `0.2`.
  - Ease: `power2.out`.
- **ScrollTrigger Logic:**
  - **Trigger:** `.skills-section`.
  - **Pin:** `true`.
  - **Start:** `top 10%`.
  - **End:** `+=1500`.
  - **Scrub:** `1`.

## 3. General Architecture
- **Presence Tracking:** Firebase RTDB handles live viewer count in `LiveCounter.jsx`.
- **Navigation:** GSAP ScrollToPlugin for smooth section jumps (confirmed in previous sessions).
- **Styling:** Theme-aware CSS variables for consistency across sections.

## 4. Key Files to Revert (if needed):
- `src/components/Common/LiveCounter.jsx` (Timer & Eye Logic)
- `src/components/Common/LiveCounter.css` (Bubble & Eye Transitions)
- `src/components/Skills/Skills.jsx` (Horizontal Slide & Pinning)
- `src/components/ChatBot/ChatBot.jsx` (Integration)
