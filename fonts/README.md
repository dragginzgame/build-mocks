# Toko Fonts — usage guide

This folder holds the **only two typefaces** used across the Toko website and studio. This README is the quick reference for which font to use where, sizing, and the rules that keep them looking right. The full type system lives in [`../style-guide/page-shell.md`](../style-guide/page-shell.md); this doc is the font-specific cut of it.

## The two fonts

| File | Family | CSS token | Use it for |
|------|--------|-----------|------------|
| `Anton-Regular.ttf` | **Anton** | `--font-display` | Every heading and title — `h1`–`h6`, card / section / panel / node titles, `.ttl`, big display numbers. |
| `Mona-Sans-Regular.ttf` | **Mona Sans Regular** | `--font-emphasis`, `--font-body` | Everything else — body copy, eyebrows, labels, badges, buttons, captions, table cells, hints. |

That's it. **Two fonts, two jobs.** If it's a heading/title → Anton. If it's anything else → Mona Sans.

> **Retired — do not reference:** Satoshi, Mona Sans Condensed, and `Quicksand-VariableFont_wght.ttf`. The earlier duplicate font directory inside `style-guide/` has been **deleted** — this root `/fonts` folder is the single source of truth. Always point `@font-face` here.

## Embedding

Both fonts are local — embed from this folder, never from Google Fonts or a CDN.

```css
@font-face {
  font-family: "Anton";
  src: url("../fonts/Anton-Regular.ttf") format("truetype");
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Mona Sans";
  src: url("../fonts/Mona-Sans-Regular.ttf") format("truetype");
  font-weight: 400; font-style: normal; font-display: swap;
}

:root {
  --font-display:  "Anton", system-ui, sans-serif;        /* headings / titles */
  --font-emphasis: "Mona Sans", system-ui, sans-serif;    /* labels, buttons, badges (weight 700) */
  --font-body:     "Mona Sans", system-ui, sans-serif;    /* body copy */
}
```

(Adjust the relative path to suit the file's location.)

## When to use each — by element

| Element | Font | Token | Notes |
|---------|------|-------|-------|
| Page / section title (`h2` "{Area}.") | Anton | `--font-display` | Uppercase, the big one. |
| Card / panel / node title, sub-headings (`h3`, `.ttl`) | Anton | `--font-display` | Uppercase. |
| Large display numbers (stats, scores) | Anton | `--font-display` | Give extra line-height. |
| Body / paragraph copy, ledes, table cells | Mona Sans | `--font-body` | Sentence case. |
| Eyebrow ("Collection · Rarity") | Mona Sans | `--font-emphasis` | Weight 700, uppercase, tracked. |
| Buttons, badges, tags, pills | Mona Sans | `--font-emphasis` | Weight 700. |
| Labels, field labels, hints, captions | Mona Sans | `--font-emphasis` / `--font-body` | — |
| Any small UI text (< 16px) | **Mona Sans** | — | Never Anton at this size (see below). |

## Sizing — the type scale

Root is **16px** (`html { font-size: 100% }`). **Never hard-code a `px` font size** — use the rem scale tokens so the whole UI resizes from one knob.

| Token | rem | px | Typical use |
|-------|-----|----|-------------|
| `--text-3xs` | 0.625 | 10 | micro tags |
| `--text-2xs` | 0.6875 | 11 | eyebrows, badge text |
| `--text-xs` | 0.75 | 12 | hints, captions |
| `--text-sm` | 0.8125 | 13 | table cells, secondary |
| `--text-base` | 0.875 | 14 | dense body, controls |
| `--text-md` | 0.9375 | 15 | **default body** |
| `--text-lg` | 1 | 16 | Anton's floor for labels |
| `--text-xl` | 1.125 | 18 | card titles (`h3`) |
| `--text-2xl` | 1.375 | 22 | sub-headings |
| `--text-3xl` | 2 | 32 | group headings |
| `--text-4xl` | 2.5 | 40 | page title (`h2`) |
| `--text-5xl` | 2.75 | 44 | hero |

## Rules that keep the fonts looking right

**Anton**

- **Weight is always 400.** Anton ships in a single weight. Never apply `font-weight: 700` or wrap Anton text in `<strong>` / `<b>` — the browser will *synthesize* a fake bold, which is a styleguide violation. Emphasis inside a heading isn't needed; the face is already heavy.
- **Don't go below ~16px (`--text-lg`).** Anton is a tall, condensed, all-caps face; at 13–14px the caps get cramped and illegible. If a label must be small, set it in Mona Sans instead.
- **Line-height ≥ 1.05.** `line-height: 1` is too tight for Anton. The shared `h1`–`h4` rule uses `1.05`; give large display numbers a little more room.
- **Uppercase + `letter-spacing: 0.02em`.** All Anton headings and titles are uppercase with light tracking (the shared `.ttl` rule). This includes proper-noun card titles (e.g. `MARA OKAFOR`).
- **Set height *or* width on the logo character, not a square box** — but that's the logo, see `../style-guide/logos/`.

**Mona Sans**

- **Weight 400 for body, 700 for emphasis.** Use `--font-body` (400) for paragraphs and `--font-emphasis` (700) for labels, eyebrows, buttons, badges, and table headers.
- **Stays sentence/normal case** for body copy. Eyebrows, badges and table headers may be uppercase + tracked, but that's a per-component choice, not the default.

## Quick decision tree

1. Is it a heading, title, or big number? → **Anton** (`--font-display`), uppercase, ≥16px, weight 400, no `<strong>`.
2. Is it small (< 16px) or any non-title text? → **Mona Sans** (`--font-body` / `--font-emphasis`).
3. Need emphasis on non-heading text? → bump Mona Sans to **700** (`--font-emphasis`), don't change the font.

## Enforcement

`style-guide/px-to-rem.mjs` rewrites `px` font sizes and spacing to rem and can gate CI:

```bash
node "style-guide/px-to-rem.mjs" "html-mockups"            # convert in place
node "style-guide/px-to-rem.mjs" --check "html-mockups"    # exits 1 if any px type/spacing remains
```
