# Toko Style Guide

The visual and component system behind Toko — Internet Computer-native generator, wallet, launchpad, and secondary marketplace.

A single static HTML page that documents the type, color, components, and patterns the product is built on. Open `styleguide.html` in a browser; no build step.

## Structure

```
style-guide/
├── styleguide.html        # The guide itself
├── README.md
├── css/                   # External stylesheet (see css/README.md)
│   └── styleguide.css
├── fonts/                 # (retired location) — fonts now live in the root /fonts folder: Anton, Mona Sans
├── logos/                 # Toko brandmark in all sanctioned variants (see logos/README.md)
├── icons/                 # The full Toko icon library, SVG + PNG (see icons/README.md)
├── page-footer/           # Wide footer illustration that anchors page bottoms (see page-footer/README.md)
└── bot-images/            # Toko character art, grouped by emotion / pose
    ├── hi/
    ├── laugh/
    ├── love/
    ├── party/
    ├── point/
    ├── teach-or-present/
    └── …                  # 20+ emotion folders in total
```

Each subfolder has its own `README.md` describing what belongs there and the conventions to follow.

## Type system

Two families, each with a single job:

- **Anton** — display / headlines (uppercase, tracked, never below 16px)
- **Mona Sans** — everything else: emphasis, eyebrows, table headers, body, and UI text

Fonts are loaded locally from the root `/fonts` folder via `@font-face`. No CDN dependency. (Satoshi and Mona Sans Condensed are retired — don't reference them.)

## Color

Three color languages, each scoped to one role — never crossed:

- **Lifecycle** (Draft / Review / Live) — stage indicators only
- **Health** (OK / Warn / Critical) — resource gauges
- **Notification** (Success / Error / Warning / Info) — toasts, banners, semantic CTAs

See the Color section of the guide for hex values and rules.

## Light / dark

A theme toggle in the top-right of the page flips the entire guide between light and dark. Every component has a dark-surface treatment.

## Viewing locally

Open `styleguide.html` directly in any modern browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/styleguide.html
```

## Notes on assets

- **Toko character images** live in `bot-images/`, grouped by emotion folder (Hi, Laugh, Confident, Grateful, Inspect, Recharge, Oops/sorry, Anxious, Unwell, etc.). The guide references one representative frame per folder. See `bot-images/README.md` for the full taxonomy and per-folder usage notes.
- **Icons** are inline SVG throughout the guide. The `icons/` folder is reserved for any external icon files the project decides to ship as separate assets.

## Contributing

Edit `css/styleguide.css` for design tokens, component styles, or new dark-mode overrides. Edit `styleguide.html` to add or amend sections — keep the existing section pattern (eyebrow / h2 / lede / canvas blocks) for visual consistency.
