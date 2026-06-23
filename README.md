# Toko — Design Mockups

Clickable, static HTML prototypes of the Toko web app, plus the live **style
guide** they're built from. Everything here is a design prototype with **sample
data — not the live product**, and nothing is wired to a backend. There is no
build step.

## Start here

Open **`index.html`** in a browser — it's the front door: a prominent link to the
style guide, then the screen mockups grouped by area.

For the most faithful rendering (fonts and relative paths resolve cleanly), serve
the folder rather than opening files directly:

```
npx serve .          # or:  python -m http.server
```

## Structure

```
index.html        # gallery / front door — start here
html-mockups/     # screen prototypes ("state galleries"), grouped by area
style-guide/      # styleguide.html (source of truth) + css/, logos/, icons/,
                  #   bot-images/ (character art), page-footer/
fonts/            # Anton-Regular.ttf, Mona-Sans-Regular.ttf (embedded via @font-face)
```

The layout matters: mockups load fonts at `../fonts`, the style guide CSS loads
them at `../../fonts`, and `index.html` links into `style-guide/` and
`html-mockups/`. Keep this structure intact or those paths break.

## The style guide is the source of truth

**`style-guide/styleguide.html`** defines the type scale, colour tokens, surfaces,
spacing, and every shared component. It has a **Light / Dark toggle** (top-right)
to verify components on both surfaces. Every mockup is built from these tokens —
read it before changing or adding anything visual.

## Fonts & brand

- **Two fonts only.** **Anton** for all headings and titles (kept ≥ 16px);
  **Mona Sans** for everything else. Both are embedded locally via `@font-face` —
  no Google Fonts / CDN. (Retired: Satoshi, Mona Sans Condensed.)
- **Logo.** The mark is two files: the character (`style-guide/logos/` SVG, PNG
  fallback) and the "TOKO" wordmark. The wordmark ships white — use as-is on dark
  surfaces, apply `filter: brightness(0)` on light. Never recolour the character.
- **Character art.** `style-guide/bot-images/` holds the Toko character by emotion
  (happy, bored, point, teach, etc.) — for empty states, success moments, and
  onboarding, not dense data views.

## What's in the mockups

Each file is a **state gallery**: one screen shown in several states (empty,
loading, populated, error, locked, etc.) on a single page. Grouped by area, as on
`index.html`:

- **Wallet & buying** — My Tokens (wallet), claiming a token, user profile.
- **Public site & navigation** — landing page, Launchpad, navigation, top bar,
  side navigation, hero carousel.
- **Creator studio — project** — studio, projects list, project, team & access,
  beneficiaries, whitelists, media library, revenue presets.
- **Creator studio — collection** — collections list, collection, attributes,
  rarity, supply, guardian, claim defaults.
- **Creator studio — generator** — the generator (layers, parts, rules, batches).
- **Creator studio — tokens** — token draft / review / live / add, minted tokens.
- **Creator studio — vendors** — vendor creation, vendor management.

## Conventions

- **Dated filenames** (`...-YYYY-MM-DD.html`) mark the latest iteration of a
  screen.
- **`html-mockups/(+) archive/`** holds superseded earlier versions. These are
  **not** linked from `index.html` and are excluded from the published site by
  default.
- **Mobile + desktop parity** — layouts are designed to hold up at ~375px wide and
  at desktop; there are no desktop-only mockups.

## Editing

- Use the **design tokens** (the CSS variables defined in
  `style-guide/page-shell.md` / `styleguide.css`) — never hard-code colours,
  spacing, or radii.
- **Anton** for every heading/title, **Mona Sans** for everything else.
- Match the page-shell rules (e.g. only the breadcrumb bar, cards, and list/
  pagination bar are white; the page header sits on the grey background).

## Deploy

This is a pure static site. On **Cloudflare Pages**: connect the repo, set
**Framework preset: None**, leave the build command empty, and set **build output
directory to `/`**. Pushes to the default branch redeploy automatically. (Use the
**Pages** product, not a Workers/Wrangler project, so the `.git` directory is
excluded from the upload.)
