---
name: burda-html-plan
description: >-
  Create a self-contained HTML plan in the Hubert Burda Media brand system.
  Use when the user wants a plan page with Burda Now, black/white, and the
  Brand Guidelines palette, wants the writing kept close to what they gave
  you, or mentions burda-html-plan or Burda corporate planning artifacts.
---

# Burda HTML Plan

Review [references/design-system.md](references/design-system.md) and
[references/tokens.css](references/tokens.css).

After reviewing them, create an HTML file for the plan in that system.

Keep it pragmatic and simple. Strong type contrast, left-aligned ragged
copy, short sections. Do not inflate the user's wording into a campaign.

Always include dark mode: the token pair from `tokens.css` on `:root` /
`html.dark`, a small theme toggle (pill), `localStorage` persistence, and an
apply-before-paint script in `<head>` (default to `prefers-color-scheme`).

Do not use the ivory/clay/serif “effective HTML” look.
