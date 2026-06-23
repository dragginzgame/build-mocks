# icons/

The Toko icon library. Every icon is shipped as **SVG** (canonical) plus a **PNG** raster fallback at the same dimensions. Use the SVG everywhere a vector format is acceptable; reach for the PNG only where SVG isn't supported.

## File naming

Files use the original Figma export names — `Icon=<Name>.svg` and `Icon=<Name>.png`. Keep this convention so the inventory lines up with the Figma source. A few helper / status icons follow the secondary patterns `Property 1=<Name>.svg` and `Status=<Level>, Breakpoint=<Device>.svg`.

A handful of icons also exist as `<Name>@2x.png` rasters for legacy reasons (early Figma exports). Prefer the un-suffixed SVG; the `@2x` PNGs are kept until they're confirmed unused.

## Inventory

The set covers transactional, navigational, status, marketplace, social, and CMS-style verbs.

**Navigation & layout**
Arrow Up / Down (`Arrow Dwn`) / Left / Right · Arrows Filter · Expand · Collapse · Menu Dotted · Menu Dotted Horizontal · Grid layout · Grid Large · Grid Small · Grid Single · Sort List · Layers · Object Group · Tag

**Tokens & marketplace**
Token · Mint · Mint V2 · Cart · Sale · Box · Diamond · Star Filled · Star Outline · star outlined · Pin · Pin Filled · Verified · Unverified · Fire · Chip · Launchpad · Robot

**Wallet & money**
Bank · Balance · Money · Dollar · ICP · BTC · ETH · Transfer · increase money · money withdrawal · growth graph · mathematics calculation · add account

**Files & content**
Document · Document Landscape · Folder · Image · Add image · Upload · Export · download file 1 · download file 2 · Copy · Move Asset · Move File · Move to Set · Remove From Set · Bulk Actions · Bulk Action Empty · Bulk Action Selected · Add To Menu · Collection · Collections · photo editor · Edit · Trash · Refresh

**Status, alerts, system**
Check · check-circle · Close · Close Circle · Exclaim · Exclamation Mark · Lock · Unlock · List Lock · Eye · Help · Clock · Calendar · Plus · Minus · Pause · Play · History · Setting · Rules · Privacy Policy · Phone · Profile · Logout · Filter · Search · Link · Share · Attribute List · List · Vector

**Property variants** (used by the form-validation system)
`Property 1=check-mark` · `Property 1=exclamation-circle` · `Property 1=exclamation-tringle` · `Property 1=info-circle`

**Health gauges** (for the Cycle Status battery component)
`Status=High, Breakpoint=Desktop / Mobile`
`Status=Med, Breakpoint=Desktop / Mobile`
`Status=Low, Breakpoint=Desktop / Mobile`

**Guard badges** (collection guards — buyer-facing permission promises)
Self-contained shield badges, one per guard, shipped in an `on`/`off` pair. Used on the public collection page and across collection management (Manage → Guards, status summaries, Live locked list).

- `dupe_on` / `dupe_off` — allow duplicate tokens
- `destroy_on` / `destroy_off` — allow token destruction
- `transfer_restr_on` / `transfer_restr_off` — allow transfer restrictions
- `sale_restr_on` / `sale_restr_off` — allow sale restrictions

`_on` = the permission is allowed / active (solid black shield); `_off` = blocked / inactive (muted grey shield — a stronger guarantee to buyers). These are **placeholder PNGs only** (500 × 500) — SVGs to follow. Unlike the line icons, guard badges are pre-coloured raster art: render them via `<img>` at 22–32px and **do not** recolour with `currentColor`.

## Conventions

- All icons are designed on a **24 × 24** canvas. Don't render them larger than 32px without considering optical adjustments.
- Strokes use `currentColor` so the icon inherits text color from its container. Set `color` on the surrounding element to recolour an icon — never edit the SVG fill directly.
- The naming convention is currently the Figma export style (PascalCase with an `Icon=` prefix and spaces). If/when a renaming pass happens, use lowercase and hyphens (`arrow-down.svg`, `bulk-actions.svg`).

## Using an icon

```html
<img src="icons/Icon=Edit.svg" alt="" width="20" height="20" />
```

Or inline-embed the SVG when the icon needs to change colour with state (the `currentColor` strokes will inherit from `color`):

```html
<button class="btn btn--icon" aria-label="Edit">
  <!-- contents of icons/Icon=Edit.svg, with stroke="currentColor" -->
  <svg viewBox="0 0 24 24" ...>...</svg>
</button>
```

Many of the inline `<svg>` snippets currently in `styleguide.html` predate this folder; they can be progressively swapped to `<img>` references against this set.

## Adding a new icon

1. Export from Figma as SVG and PNG at 24 × 24.
2. Drop both into this folder using the same `Icon=<Name>.svg` / `.png` naming.
3. Add the name to the inventory above under the most appropriate group.
