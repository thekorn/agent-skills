---
name: burda-html-diagram
description: >-
  Create a self-contained HTML architecture diagram in the Hubert Burda
  Media brand system. Use when the user wants a full-screen Burda diagram,
  output that is light on prose, or mentions burda-html-diagram.
---

# Burda HTML Diagram

Review [references/design-system.md](references/design-system.md),
[references/tokens.css](references/tokens.css), and the SVG patterns in
[references/architecture-example.html](references/architecture-example.html).

Create an HTML file that is strictly for visualizing the architecture and
understanding the stack. It should not be prose-heavy. Full-screen diagram.

Build a high-quality diagram in SVG. Iterate on the diagram more than
anything. If it makes sense, make it interactive and able to visualize
sequences of system behavior.

Always include dark mode: the token pair from `tokens.css` on `:root` /
`html.dark`, a small theme toggle (pill), `localStorage` persistence, and an
apply-before-paint script in `<head>` (default to `prefers-color-scheme`).
Style the SVG through CSS classes using those variables — never hard-coded
hex inside the SVG — so the diagram follows the theme.

Map diagram roles to the palette without pretending colours have fixed brand
meanings: Yellow for the active/selected path, Purple for emphasis/gates,
Green for stores that are healthy, Red for errors, Blue for external
systems. Logo and wordmark stay black or white only.

Always make floating overlays dismissible. Any card or panel that overlays
the SVG stage MUST have a visible close button, and MUST re-open when the
user clicks a relevant node or filter.

Architecture diagrams almost always exceed the screen. Support pan (drag)
and zoom (mouse wheel). Wrap all SVG contents in `<g id="svg-content">` and
drive its `transform` attribute. Pan in SVG-space 1:1 (do NOT divide mouse
delta by scale). Zoom at the cursor position by translating so the SVG point
under the cursor stays fixed. Suppress node `click` events after a drag
(track a 5px movement threshold + a capture-phase one-shot
`stopPropagation`). Provide visual feedback: `grab` / `grabbing` cursors, a
zoom-level indicator, and a reset-to-100% button.

Do not use the ivory/clay/serif “effective HTML” look.
