# Toko — Page shell & consistency spec

Source of truth for how a project/studio page is framed. Every studio surface (Overview, Collections, Generators, Media, Access, Whitelists, Beneficiaries) must use this shell so they stay visually identical at the chrome level. Reference implementation: `html-mockups/project-studio-tabs.html`.

This exists because the implemented app has drifted: Collections and Generators render the header inside a **solid white panel** over a grey body, while Beneficiaries renders the header **on grey**. The mock is correct (header on grey everywhere); the app needs to match the mock. See "Known divergence" at the end.

## The one rule

Three things are white on a studio page: the **breadcrumb bar** at the very top, the **cards**, and the **list / pagination bar** at the bottom of a paginated surface. Everything else — including the page title, description, search, and filters — sits directly on the grey page background. There is no white header band. The bottom list bar is a full-width white footer strip that mirrors the breadcrumb bar at the top (see "Pagination & list bar").

## Anatomy

```
section.page                     ← page background = --surface-page (#EAEAEA, grey)
├─ div.context-bar               ← white, sticky, bottom border — breadcrumb only
└─ div.section                   ← transparent, padding 32px (--s-8)
   ├─ div.section-head           ← header, ON GREY
   │  ├─ div                     ← left: eyebrow → h2 → lede
   │  │  ├─ div.eyebrow          "Project · {Area}"
   │  │  ├─ h2                   "{Area}."   (Anton display)
   │  │  └─ p.lede               one-line description
   │  └─ div.row                 ← right: controls (optional)
   │     ├─ input.input.search   search box
   │     └─ div.segmented        status filter
   └─ {content grid}             ← white cards on the grey
```

## Tokens (do not hard-code values — use the variables)

Surfaces
- `--surface-page` `#EAEAEA` — page background (the grey). Body and every `.section`.
- `--surface-canvas` `#FFFFFF` — white. Cards, the context bar, inputs, modals only.
- `--surface-canvas-alt` `#FAFAFA` — segmented control track, subtle fills.
- `--surface-canvas-deep` `#F2F2F2` — split bars, recessed wells.

Text: `--text-primary` `#1D1D1D` · `--text-secondary` `#6B6B6B` · `--text-muted` `#A0A0A0`
Borders: `--border-soft` `#E5E5E5` (default) · `--border-strong` `#1D1D1D`
Stages: `--stage-draft` `#F59E0B` · `--stage-review` `#6366F1` · `--stage-live` `#10B981` · error `--notify-error` `#EF4444`
Radius: `--r-2` 8px (inputs, and buttons welded flush to an input) · `--r-3` 12px (cards) · `--r-4` 16px (large cards) · `--r-pill` (standalone buttons/CTAs, badges, segmented). **Buttons default to `--r-pill`** — the only exception is a button fused to the right edge of a field (e.g. a search "Go"), which adopts the input's `--r-2` so the pair reads as one unit.
Spacing: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 (`--s-1` … `--s-16`). Section padding is `--s-8` (32px); header bottom margin `--s-6` (24px).

Type — two fonts only (as of 2026-06)
- `--font-display` **Anton** — all headers and subheadings, including card / section / panel / node titles (`h1`–`h6`, `.ttl`, flow-node `.n`).
- `--font-emphasis` and `--font-body` **Mona Sans Regular** — body, eyebrows, labels, badges, buttons, captions — everything that isn't a heading or title.

Both load from the root `/Fonts` folder (`Anton-Regular.ttf`, `Mona-Sans-Regular.ttf`) — the single source of truth; see `/Fonts/README.md`. The old lowercase `style-guide/fonts/` directory has been deleted. Satoshi and Mona Sans Condensed are retired — don't reference them.

**Casing.** All Anton headings and titles are set **uppercase** with `letter-spacing: 0.02em` — this includes card/section/node titles like collection, whitelist, and beneficiary names (e.g. `MARA OKAFOR`). The shared `.ttl { text-transform: uppercase; letter-spacing: 0.02em; }` rule applies it to every card title, matching the `h1`–`h6` treatment. Mona Sans body text stays sentence/normal case.

## Units

The root font size is **16px** (`html { font-size: 100% }`), the same base Tailwind uses. From there:

| What | Unit | Why |
|------|------|-----|
| Font size | **rem** | Scales with the root; one knob resizes all type together. |
| Spacing — margin & padding | **rem** | Scales with type so rhythm holds at any root size. |
| Borders / hairlines | **px** | Precision — a border should stay crisp, not scale. |
| Radii and other fine UI details | **px** | Fixed detail, not type-relative. |

Never hard-code a `px` font size or margin. Use the scale tokens below; they already carry the right rem values. To resize the whole UI later, change the root size only.

### Type scale (rem · 16px root)

`--text-3xs` 0.625 (10) · `--text-2xs` 0.6875 (11) · `--text-xs` 0.75 (12) · `--text-sm` 0.8125 (13) · `--text-base` 0.875 (14) · `--text-md` 0.9375 (15, body) · `--text-lg` 1 (16) · `--text-xl` 1.125 (18) · `--text-2xl` 1.375 (22) · `--text-3xl` 2 (32) · `--text-4xl` 2.5 (40) · `--text-5xl` 2.75 (44). Parentheses = px equivalent.

### Spacing scale (rem · 16px root)

`--s-1` 0.25 (4) · `--s-2` 0.5 (8) · `--s-3` 0.75 (12) · `--s-4` 1 (16) · `--s-5` 1.25 (20) · `--s-6` 1.5 (24) · `--s-8` 2 (32) · `--s-10` 2.5 (40) · `--s-12` 3 (48) · `--s-16` 4 (64).

### Display type (Anton) — avoid the cramping

Anton is a tall, condensed, all-caps face. Two rules keep it from looking cramped or mismatched when it replaces a body/condensed font at the same size:
- **Line-height ≥ 1.05** on Anton headings (the shared `h1–h4` rule sets `1.05`; `line-height: 1` is too tight). Give large display numbers a little more.
- **Don't drop Anton below ~`--text-lg` (16px)** for UI labels — at 13–14px the condensed caps get illegible and tight. If a label needs to be small, keep it in Mona Sans (`--font-emphasis`/`--font-body`) rather than Anton.

### Enforcing this (tooling)

`style-guide/px-to-rem.mjs` converts `font-size` and spacing (margin/padding/gap/inset) from px to rem and leaves borders, radii, widths, shadows, stroke, letter-spacing, and transforms in px. It's idempotent, dependency-free, and works on `.html` and `.css`.

```
# convert every mock in place (folder is scanned recursively — no shell glob needed)
node "style-guide/px-to-rem.mjs" "html-mockups"

# CI / pre-commit gate — exits 1 if any file still has px type/spacing
node "style-guide/px-to-rem.mjs" --check "html-mockups"
```

The script emits **raw rem** (e.g. `0.875rem`), which is self-contained and safe in any file. The two reference files — `project-studio-tabs.html` and `beneficiaries-states-gallery.html` — go a step further and use the **named scale tokens** above (`var(--text-base)` etc.); new work should follow that file as the pattern. Wire the `--check` command into CI or a pre-commit hook so px type/spacing can't land again.

## Header (`.section-head`)

Left block, always in this order: `.eyebrow` ("Project · {Area}") → `h2` ("{Area}.") → `p.lede` (one sentence). Sub-section headings use `h3` (no inline styles — the shell defines `margin-top:8px; font-size:22px`).

**Page-title sub-text is full-width.** The `.lede` / description beneath the page title spans the **full width of the content area** — never cap it with a `max-width`, and don't let it get squeezed into a narrow column. If the header has right-side actions, the lede drops to its own full-width row beneath the title + actions rather than sitting short beside them. (This prevents the early-wrapping, half-width description shown in older mocks.)

**Stepper-driven flows (e.g. the generator Build → Preflight → Curate → Export → Batches rail):** the step rail already names the active step, so a matching `.section-head` (eyebrow + `h2` + lede) under it is redundant. Show the full header **only on the first-run / empty state** of a step (nothing to work on yet — the copy is onboarding). On **working states** (content present — layers/parts added, outputs to curate, etc.) drop the whole `.section-head` so the work sits directly under the step rail. Rule of thumb: teach on the empty state, get out of the way on working states.

**No save/discard buttons in the header (`.head-actions`).** Collection sub-pages (Attributes, Rarity, Supply, Guards, Tokens, etc.) must NEVER place `Discard` / `Save changes` (or any other persistence button) in the section-head. These pages auto-save, and stage persistence (`Save changes`, `Submit to Review`, `Publish to Live`) lives once on the **collection management bar at the collection level — not repeated per sub-page.** The only things allowed in a sub-page `.head-actions` are the read-only `stage-badge` and at most one contextual, non-persistence action (e.g. `View public page` on a Live page). Do not re-add Discard/Save changes here under any circumstances — this has regressed repeatedly.

Right block (`.row`) is optional and only for index pages. When present it is **search + status filter, in that order**:
- `<input class="input search" placeholder="Search {things}…">`
- `<div class="segmented">` with `All · n` first (`aria-pressed="true"`), then one button per stage that the feature actually has.

Stages vary by feature — match the badges the cards actually use:
- Collections: All / Draft / Review / Live
- Generators: All / Draft / In review / Exported
- Beneficiaries: All / Draft / Live

Don't invent a stage a feature doesn't have (e.g. Beneficiaries has no Review stage).

## Cards

White surface (`--surface-canvas`), `--border-soft`, `--r-3`. Shared patterns:
- **Stage badge** top-right of the card header: `span.status.status--{draft|review|live}` with a leading `span.dot`.
- **Actions** live in the card footer as `button.icon-btn` (and `.icon-btn--danger` for delete). Change-stage = chevron, edit = pencil, delete = trash.
- **Locked**: when an item is live and in use, replace the action buttons with `span.benef-locked` (lock icon + "Locked"). In-use live items can't be edited or deleted.
- **Add card**: dashed `button.benef-add` / `.coll-card--new` with a `+` and label — always the first or last cell of the grid.
- **Inline "add" affordance (add a tier, attribute, token type, value, etc.)**: one shape everywhere — a **dashed pill** (`.add-chip`: `--r-pill`, 1.5px dashed `--border-soft`, `+` and label, muted until hover). Not a full-width rectangle bar, and not a square button. It echoes the item it creates but always reads as the same control across galleries. Exception: a **first-run / empty state** uses a solid primary button (`.btn--primary` "+ Add your first …") as the onboarding CTA, not the dashed pill.
- **No-name fallback is banned.** A card title must never fall back to a raw principal. Names are required at creation (see the Add modals), so titles always have a human label; the principal shows truncated in the subline as `k1m9…7uvw · {type}`.

## Empty states (first-run hero)

The first-run `.empty-hero` (image + title + sub + CTA) is **centred, not full-width**: `max-width: 920px; margin-inline: auto`, on every surface (Collections, Generators, Media, Access, Whitelists, Beneficiaries, Revenue presets, token galleries, …). One width everywhere — the implemented app currently varies per page (e.g. Collections stretches full-width while Media library centres); the centred version is canonical, matching the mocks as of 2026-07-10. Supporting rows under the hero (fact strip, explainer) keep their own layout and may span the full content width.

## Do / Don't

Do
- Put the title, description, search and filters on the grey, inside `.section`.
- Keep the breadcrumb bar (`.context-bar`) as the only white strip at the top.
- Reuse `.status--*`, `.icon-btn`, `.segmented`, `.input.search`, `.section-head` rather than re-styling per page.

Don't
- Wrap the header in a white card/panel (this is the current app bug).
- Hard-code colors, radii, or spacing — use the tokens.
- Add per-page inline styles for things the shell already defines (heading size/margin, search width).
- Show a status filter stage that the feature doesn't support.
- Put `Discard` / `Save changes` (or any persistence button) in a sub-page `.head-actions`. Sub-pages auto-save; stage persistence lives on the collection management bar only. (This keeps regressing — never add them back.)

## Pagination & list bar

Any list or table that can exceed ~25 rows is paginated — never render thousands of rows on one page. This covers rarity assignment tables (Tiered & Weighted), manage-token-definitions, generator outputs/curate, wallet "My Tokens", launchpad and marketplace lists. The live reference implementation is `html-mockups/pagination-system-mockup-2026-06-13.html`; reuse it, don't re-style per page.

**The pager (`.pg`).** A row of `button`s: prev arrow (`.pg-arrow`), page numbers, `…` gaps (`.pg-gap`), next arrow. Targets are `40 × 40px`, gap `--s-1` (4px), radius `--r-2`. Numbers are Mona Sans 500; the current page is `aria-current="page"` on a dark `--text-primary` fill with `--text-inverse` text, weight 700, not clickable. Hover lifts to a soft `#F0F0F0` fill; focus uses a 2px `--text-primary` outline. Show **at most 7 page targets** — truncate around the current page with `…`, but page 1 and the last page stay reachable. At the ends, **disable** prev/next (don't hide them) so the row never shifts.

**Compact variant (`.pg--compact`).** Below ~660px container width, swap the full pager for bordered prev/next arrows around a "Page X of Y" status. Same data, same component — presentation only.

**The list bar (`.listbar`).** The bottom slot row that hosts pagination: a three-column grid — results count (`.results-count`, left) · pager (`.lb-center`) · per-page (`.perpage`, right). Any slot may be empty: with only the pager present, the bar centers it. Counts use `font-variant-numeric:tabular-nums` ("Showing **1–25** of **1,000**"). The per-page select offers 25 / 50 / 100. The bar is container-driven: on narrow widths it wraps to two rows (count + per-page on top, pager centered below) and the per-page label hides.

Rules: **the list bar always has a white (`--surface-canvas`) background.** Render it as a full-width footer band attached to the bottom edge of the white content surface with a `border-top` hairline (`--border-soft`), mirroring the white `.context-bar` at the top so the two bookend the grey content. Never leave the pager bare/transparent on grey, and never box it as a floating white card with its own border + radius island in the middle of grey. Keep the pager in the bottom list bar, centered — counts and per-page are reference info at the edges, not primary actions. **Reset to page 1** whenever search, filters, or per-page change. Pick paged *or* infinite scroll per surface — paged for management views, scroll for discovery feeds — never both on the same surface. Don't use the character illustration in the list bar; it belongs to empty states only.

## Notes, alerts & spec frames

Two different things, never conflated:

- **Notification banners** (the `.banner` / info-note component — success / error / warning / info) are for **end-user messages only**: validation errors, destructive-action warnings, lock states, success confirmations. Notification severity drives them, and they carry a close (×) where dismissible.
- **Developer / design guidance** — "this control only appears when…", label-placement specs, "a tab appears here for…", and any explanation aimed at whoever is building or reviewing the screen — **never goes in a banner inside the UI.** It lives on the grey background, in the frame caption / surrounding prose.

**Spec & explainer frames** (component variants, row states, conditional controls) are shown as **showcases on grey**: the example component sits directly on the grey page (or on a plain white showcase card), with the explanation in the grey caption. Do **not** dress a spec as real product UI — no fake modal chrome (title bar + close ×), no breadcrumb, no page header or big page title around a component that exists only to be documented.

## Destructive confirmation modal (the one canonical delete/confirm)

Every delete / destructive confirmation uses **one** shape — the Simple Modal Base, left-aligned:

- **Title** (in the header, Anton) names the action and its target: `Delete part · Body · Cobalt?`, `Delete 11 parts?`, `Delete layer · Body?`. A close **×** sits at the right.
- **Body** (`.mbody`) is a single flex row: a **red** warning-triangle icon (`color: var(--notify-error)`) beside **left-aligned** consequence text (Mona Sans, `--text-sm`). Bold the target and the phrase **"This can't be undone."** Add any carve-outs after it (e.g. "Pinned outputs are not erased").
- **Footer** (`.footer-row`, actions right): `btn--ghost` **Cancel** + `btn--danger` **Delete …**.
- **No character illustration and not centered.** The old centered "anxious Toko-bot / Are you sure?" treatment is retired for delete confirms — the character is for empty/success/personality moments, not destructive dialogs.

**Colour rule (important):**

- **Destructive confirmations are always red** (`--notify-error`) — the icon and the Delete button. Never amber, never a third colour, never the character frame.
- **Orange / amber** (`--notify-warn`, the `warn-note` variant) is reserved for **cautionary "proceed carefully / I understand the risk" notices that carry substantial explanatory text** (e.g. a go-Live caution, a "this vendor has no scheduled end" warning). That's a different component (an inline note / banner), not the delete dialog. Don't use amber as the accent of a delete confirm, and don't use a plain red delete dialog where a text-heavy caution-and-proceed note belongs.

## Known divergence to fix in the app

The implemented Collections and Generators pages wrap the header (title + search + filters) in a white panel sitting above a grey body. The shell — and the Beneficiaries page — keep that header on grey. **Remove the white header panel on Collections and Generators** so all index pages match. This is the single change needed to bring the app back in line with the mock.
