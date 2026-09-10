---
name: burda-html
description: >-
  Create a self-contained HTML file in the Hubert Burda Media brand system
  (Burda Now, black/white plus the Brand Guidelines palette). Use when the
  user wants a Burda HTML artifact that is not specifically a diagram or a
  plan — a report, explainer, comparison, deck, prototype, or similar — or
  mentions burda-html, brand.burda.com, or Burda corporate design.
---

# Burda HTML

Review [references/design-system.md](references/design-system.md) and
[references/tokens.css](references/tokens.css). Optionally open
[references/specimen.html](references/specimen.html).

Create one self-contained HTML file for whatever the user is describing.
Match the Brand Guidelines: black/white contrast, Burda Now / Burda Now Tall,
pill buttons, left-aligned ragged text, no coloured logo.

Always include dark mode: the token pair from `tokens.css` on `:root` /
`html.dark`, a small theme toggle (pill), `localStorage` persistence, and an
apply-before-paint script in `<head>` (default to `prefers-color-scheme`).
Dark mode inverts surfaces only — accent hues stay the same.

Do not use the ivory/clay/serif “effective HTML” look.
