# Burda design system (from brand.burda.com)

Source: Hubert Burda Media Brand Guidelines on Frontify — Home, Grundlagen (Logo, Farben, Typografie, Bildwelt, Icons), and Vorlagen. Distilled for HTML artifacts. Do not invent extra tokens.

Haltung: **Klar. Offen. Beweglich.**

## Surfaces

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--bg` | `#FFFFFF` White | `#000000` Black | Page |
| `--ink` | `#000000` Black | `#FFFFFF` White | Text and logo |
| `--muted` | `#5C504E` Smoked Clay | `#CCB8B8` Dusty Heather | Secondary text |
| `--surface` | `#F0EBEB` Pearl Dust | `#111110` | Panels, code wells |
| `--line` | `#E5DADA` Soft Taupe | `#5C504E` | Rules, strokes |

Black and white are the base. Colour sits on top of that contrast. Do not tint the BURDA wordmark or monogram — logo is black on light, white on dark.

## Palette

Colours are **not** bound to fixed meanings. Pick one accent family per artifact (or a small set) and keep hierarchy with black/white.

Each hue has Base → Deep → Dark:

| Family | Base | Deep | Dark |
| --- | --- | --- | --- |
| Red | Cherry Pop `#FA2D28` | Red Carpet `#C32824` | Velvet Crush `#A3201D` |
| Orange | `#FF6E00` | Juicy Punch `#E36200` | Ember Glow `#BB5100` |
| Yellow | Lemon Drop `#FFE232` | Honey Glow `#ECD021` | Golden Grain `#DDBD00` |
| Green | Fresh Mint `#69DC96` | Wild Leaf `#18A276` | Black Forest `#0A7D5D` |
| Blue | Bavarian Breeze `#73B4FF` | Open Sky `#0D8DFE` | Night Tide `#0059C0` |
| Purple | `#9682FF` | Electric Grape `#603CFE` | Blackberry Ink `#3303A7` |
| Pink | Soft Blush `#FF69E1` | Magenta Bloom `#F022C7` | Fuchsia Fizz `#BF0199` |
| Grey | Pearl Dust `#F0EBEB` | Soft Taupe `#E5DADA` / Dusty Heather `#CCB8B8` | Smoked Clay `#5C504E` |

Guideline callout mapping (from the portal theme): info = Lemon Drop, note = Electric Grape, tip = Wild Leaf, warning = Cherry Pop.

## Type

**Burda Now** is a variable font. Everyday cuts:

- Burda Now Regular / Italic / Bold / Bold Italic — body, UI, most headlines
- Burda Now Tall Regular / Italic / Bold / Bold Italic — display only

On Burda machines the family is installed. In HTML:

```css
--sans: "Burda Now", "Helvetica Neue", Helvetica, Arial, sans-serif;
--display: "Burda Now Tall", "Burda Now", "Arial Narrow", sans-serif;
```

Do not ship or hotlink the proprietary font files. If Burda Now is missing, the fallback stack is acceptable; still name Burda Now first.

### Scale (from the guideline theme; clamp down for screens)

| Role | Family | Weight | Size | Line-height |
| --- | --- | --- | --- | --- |
| Display / H1 | Burda Now Tall | 700 | `clamp(56px, 12vw, 140px)` | 1 |
| H2 | Burda Now Tall | 700 | `clamp(40px, 8vw, 80px)` | 1 |
| Statement / title slide | Burda Now Tall Bold | 700 | large, few short words | 1 |
| H3 | Burda Now | 300–400 | 30px | 1.3 |
| H4 | Burda Now | 300–400 | 22px | 1.3 |
| Body | Burda Now | 400 | 18px | 1.4 |
| Link | Burda Now | 700 | inherit | underline |
| Quote | Burda Now | 400 italic | 24px | 1.3 |
| Caption | Burda Now | 400 | 13.5–15px | 1.4–1.5 |
| Button | Burda Now | 800 (fallback 700) | 14–15px | 1.3, uppercase |

### Typesetting rules

- Mixed case always. No all-caps running text.
- Left-aligned ragged (Flattersatz). No justified body copy.
- Body line length about 50–75 characters.
- Separate paragraphs with spacing, not empty lines stacked for effect.
- Strong size contrast. Tall must look optically at least as wide as Regular next to it; if it does not, use Burda Now Bold instead.
- Tall is for a few short words with lots of space. Longer headlines, smaller formats, and presentation body titles use Burda Now Bold.
- **Wortbilder** (all-caps variable-width word pictures) are Branding-Team assets only. Do not invent or fake them. Never set a Wortbild in colour — black or white only, colour comes from the layout.

## Logo

- Wordmark **BURDA** is the default when there is room. Black on light, white on dark.
- Monogram **B** only when the wordmark cannot work (favicon, avatar, app icon).
- Never colour the logo. Never outline, shadow, or distort it.
- Do not rebuild Wortbilder or unofficial lockups.

## Components

Buttons (portal theme): pill (`border-radius: 500px`), extra-bold, uppercase, 15px / 20px padding.

| Variant | Default | Hover |
| --- | --- | --- |
| Primary | Black fill, white label | Lemon Drop `#FFE232`, black label |
| Secondary | White fill, 1px black border, black label | Fresh Mint `#69DC96` |
| Tertiary | Lemon Drop fill, black label | White fill, black border |

Links: bold, underlined, black (or white in dark).

Icons: even stroke, rounded caps, soft corners, even proportions. Treat as a line-icon set, not filled cartoons.

Cards and diagrams: square or barely rounded panels (`0–4px`). Pills are for actions and filters, not every box.

## Photography

People first. Portraits with presence. Events as encounter, not crowd stock. Work as people doing something. Topics through a human point of view. Images may surprise; they should not merely illustrate the noun.

## Motion

Short, decisive. Hover on pills. No ornamental gradients. Honor `prefers-reduced-motion`.

## Do not

- Ivory / clay / serif “effective HTML” look
- Inter / Roboto / system-ui as the primary face when Burda Now can load
- Coloured logos
- Justified columns
- All-caps UI chrome except buttons and official Wortbilder
- Binding one hue forever to “success” or “error” outside the callout mapping above
