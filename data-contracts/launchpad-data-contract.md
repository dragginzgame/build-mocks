# Launchpad — Data Contract & Component Binding

Implementation companion to the launchpad mockups. For each screen it lists
**(a)** the data the screen loads, **(b)** which field binds to which element,
**(c)** the states every component must handle, and **(d)** the actions and their
API calls. The goal is that a developer can build straight from the HTML without
reverse-engineering it.

Covers these mocks:
- `build-mocks/html-mockups/launchpad-states-gallery-2026-06-28.html` — discovery
- `build-mocks/html-mockups/vendor-detail-states-gallery-2026-06-28.html` — vendor storefront
- `build-mocks/html-mockups/vendor-claim-token-view-states-gallery-2026-06-22.html` — claim flow

Behaviour source of truth: [launchpad.md](./launchpad.md). Field provenance:
[vendor-system-design.md](./vendor-system-design.md),
[token-system-design.md](./token-system-design.md),
[collection-system-design.md](./collection-system-design.md),
[rarity-system-design.md](./rarity-system-design.md), [scoring.md](./scoring.md),
[attribute-system-design.md](./attribute-system-design.md).

## How to read this

- Field names in `code` are the **shape the UI needs**, not a claim about your
  exact API. Where the real field differs, map it — every such spot is also in
  the "Confirm against the real API" checklist at the end.
- **Derived** = computed client-side from other fields (don't expect it from the
  API).
- A "launch view-model" sits between the raw vendor record and the UI; see §0.

---

## 0. Shared / cross-cutting

### 0.1 Launch label (derived)

The UI never renders raw vendor `status`. Derive a `launchLabel` once and reuse:

| Condition (raw vendor) | `launchLabel` |
| --- | --- |
| `status=Running` and `now < scheduleStartUtc` | `ComingSoon` |
| `status=Running` and `(scheduleEndUtc - now) <= 2h` | `EndingSoon` |
| `status=Running` (otherwise) | `Live` |
| `status=Empty` | `SoldOut` |
| `status=Ended` or `now >= scheduleEndUtc` | `Ended` |
| `status=Paused` | `Paused` (hidden from discovery) |
| `status=Faulted / Setup / Deleted` | hidden from launchpad |

Visibility on the launchpad follows the policy in `launchpad.md` (Live, Coming
soon, Ending soon; Ended only inside the retention window). `Paused`/`Faulted`
are excluded from discovery and claim surfaces.

### 0.2 Countdown (derived)

- Target timestamp: `scheduleStartUtc` for `ComingSoon`, `scheduleEndUtc` for
  `Live`/`EndingSoon`. All timestamps **UTC**.
- Recompute remaining time from the absolute target every tick (never decrement a
  local counter). Tick `1s` when under 1h remaining, `60s` otherwise.
- At `remaining <= 0`, optimistically swap the label/CTA and trigger a canonical
  re-fetch; canonical state wins.

### 0.3 Money + identity

- Price: `{ amount, token, decimals, symbol }`. Render `amount` + `symbol`; fiat
  estimate optional and informational only.
- Connected principal + balances are needed for CTA gating and the claim confirm
  modal (`principal`, `balances[token] -> amount`).

### 0.4 Pagination / search / sort

Discovery grid, vendor inventory, and any list >25 rows are paginated. Expect
`page`, `pageSize` (25/50/100), `total`, plus `q` (search), `sort`, and filter
params passed to the API. Reset to page 1 when search/filter/sort changes.

---

## 1. Discovery — `launchpad-states-gallery`

### 1.1 Data the screen loads

| Block | Call (shape the UI needs) | Returns |
| --- | --- | --- |
| Featured carousel | `getFeatured()` (staff-curated slots) | `FeaturedSlide[]` |
| Live vendors grid | `getLaunchListings({ filter:'live', q, sort, page, pageSize })` | `Paged<LaunchListing>` |
| Coming soon rail | `getLaunchListings({ filter:'comingSoon', sort:'soonest', limit:5 })` | `LaunchListing[]` |
| Recently ended rail | `getLaunchListings({ filter:'recentlyEnded', sort:'mostRecent', limit:8 })` | `LaunchListing[]` |

`LaunchListing` (derived launchpad object — see `launchpad.md` "System
Context"). Proposed fields:

```
LaunchListing {
  vendorId, collectionId,
  name, creatorName,
  coverAsset, avatarAsset,        // image URLs
  status,                          // raw vendor status -> derive launchLabel (§0.1)
  activationPolicy,                // immediate | manual | scheduled
  scheduleStartUtc, scheduleEndUtc,
  price { amount, token, symbol, decimals },
  priceUnitLabel,                  // e.g. "ICP", "ICP / pull" (gacha)
  claimedCount, totalSupply,
  restrictionsSummary { allowlist:boolean, hold:boolean, limitPerPrincipal:number|null },
  vendorRoute                      // -> vendor detail
}
```

`FeaturedSlide { tag, launchLabel, title, blurb, ctaLabel, ctaRoute, coverAsset }`.

### 1.2 Element → field binding

**Vendor card** (`.rarity-frame--default` + `.tok-card`):
- card art `.art` ← `coverAsset`
- lifecycle badge `.lbadge` ← **derived** `launchLabel` (Live / Ending soon /
  Coming soon / Sold out / Ended) + countdown text for soon/ending
- title `.name` ← `name`; `.by` ← `creatorName` (or restriction note, e.g.
  "Allowlist")
- progress bar `.vbar > span` width ← `claimedCount / totalSupply` (0% for
  ComingSoon)
- foot `.pr` ← `price` + `priceUnitLabel`; `.ct` ← `claimedCount / totalSupply`
  (or `"{totalSupply} supply"` for ComingSoon)
- whole card click → `vendorRoute`

**Carousel slide** ← `FeaturedSlide` (eyebrow/pill ← `tag`/`launchLabel`, title ←
`title`, body ← `blurb`, CTA ← `ctaLabel`/`ctaRoute`).

**Controls:** search input → `q`; stage tabs (All / Coming soon / Live / Ending
soon) → `filter`; sort select → `sort`.

### 1.3 States to handle

- Grid: `loading` (skeleton cards), `loaded`, `empty` (no live drops →
  empty-launchpad screen, keep carousel + header + controls), `no-results`
  (filtered to nothing), `error` (retry).
- Card: one render per `launchLabel`; `Sold out`/`Ended` are de-emphasised
  (`.dim`).
- Rails: `getLaunchListings` should return them already ordered/capped
  (soonest-first ×5; most-recent-first ×8 within retention) — see
  `launchpad.md` "Rail Selection and Ordering". If the API can't, sort/cap
  client-side.

---

## 2. Vendor detail — `vendor-detail-states-gallery`

### 2.1 Data the screen loads

| Block | Call | Returns |
| --- | --- | --- |
| Storefront + claim policy | `getVendor(vendorId)` | `VendorDetail` |
| Claimable inventory | `getVendorInventory(vendorId, { filter, page, pageSize })` | `Paged<InventoryItem>` |
| Eligibility for viewer | `getEligibility(vendorId, principal)` (or embed in `getVendor`) | `Eligibility` |

```
VendorDetail {
  vendorId, name, creatorName,
  collectionId, collectionName, collectionHubRoute,
  bannerAsset, avatarAsset, description,
  status, activationPolicy, scheduleStartUtc, scheduleEndUtc,
  price { amount, token, symbol, decimals },
  claimedCount, totalSupply,
  limitPerPrincipal, principalClaimedCount
}

InventoryItem {
  tokenId, name, issueNumber,
  rarityTier,            // common|uncommon|rare|epic|legendary|mythical|inconceivable
  rarityScore,
  mediaAsset,
  price { amount, token, symbol, decimals },
  availability,          // Available | SoldOut
  tokenRoute             // -> claim token view
}

Eligibility {
  eligible: boolean,
  requirements: [ { type, label, description, met:boolean } ]   // type: allowlist|hold|neuron|limit
}
```

### 2.2 Element → field binding

**Header (`.vhead`):** banner `.banner` ← `bannerAsset`; avatar `.av` ←
`avatarAsset`; `h2` ← `name`; `.by` ← `creatorName` + link to
`collectionHubRoute`; badge ← derived `launchLabel`; `About` ← `description`.

**Claim panel (`.claim-panel`):**
- price ← `price`
- availability bar ← `claimedCount / totalSupply`; "{n} left" ← `totalSupply −
  claimedCount`
- countdown cells ← **derived** (§0.2)
- eligibility rows `.req` ← `Eligibility.requirements[]` (`.met`/`.unmet` ←
  `met`; title ← `label`; sub ← `description`)
- limit line ← `limitPerPrincipal` / `principalClaimedCount`
- CTA ← **derived** (§2.3)
- "View collection hub" ← `collectionHubRoute`

**Inventory card (approved token card):** rarity frame variant ← `rarityTier`;
art ← `mediaAsset`; `.name`/`.issue` ← `name`/`issueNumber`; foot `.pr` ←
`price`; status `.st` ← `availability` (Available = green dot; SoldOut = greyed
`.sold`, struck price, "Sold out" ribbon); click → `tokenRoute`. Filter tabs
(All / Available / Sold out) → inventory `filter`.

### 2.3 CTA state (derived) — matches `launchpad.md` "CTA States"

| Condition | CTA |
| --- | --- |
| `eligible && Live && availability=Available` | **Claim now · {price}** |
| `!eligible` | **View requirements** (disabled claim) |
| `availability=SoldOut` / `launchLabel=SoldOut` | **Sold out** (disabled) + route to marketplace |
| `launchLabel=ComingSoon` | **Opens {localTime}** (disabled; Notify-me deferred) |

### 2.4 States to handle

`loading`; `loaded`; `empty` (no claimable inventory → character state → route to
marketplace); `faulted`/unavailable vendor; eligibility `open` vs `gated`;
sold-out items greyed but still listed.

---

## 3. Claim flow — `vendor-claim-token-view-states-gallery`

### 3.1 Data the screen loads

| Block | Call | Returns |
| --- | --- | --- |
| Token viewer | `getToken(tokenId)` (same read-only minted-token component) | `TokenDetail` |
| Claimability | `getClaimability(vendorId, tokenId, principal)` | `{ availability, eligibility, price }` |

```
TokenDetail {
  tokenId, collectionId, collectionName,
  name, issueNumber, ledgerCanister,
  rarityTier, rarityScore,
  attributes: [ { key, value, rarityPct? } ],
  media: [ assetUrl ],
  provenance: { claimedFromVendor, originalMintTx }
}
```

### 3.2 Binding

Left viewer ← `media[]` (thumbnails), `name`/`issueNumber`, attributes ←
`attributes[]`, token rows ← collection/ledger/issue, rarity ← `rarityTier` +
`rarityScore`. Right panel = the claim panel from §2.2/§2.3.

### 3.3 Actions

**Claim now → confirm modal.** Show token preview, `price`, `networkFee`, the
viewer's `balances[token]`, and total. **Confirm → `claim(vendorId, tokenId,
{ expectedPrice, expectedToken })`.**

- Pre-submit revalidation: re-check eligibility + availability before settlement
  (hybrid eval — precomputed hint, live enforcement at claim time).
- Returns `ClaimResult` = `{ ok:true, tokenId, issueNumber, txRef }` or a typed
  error (see mapping).
- Settlement is atomic (IC: validate-then-mutate, no rollback). On `ok`, the
  token is wallet-visible; link to **My Tokens**.

**Error → UI** (matches `launchpad.md` "Error and Failure UX"):

| Error code (confirm names) | Message | Next step |
| --- | --- | --- |
| `InsufficientFunds` | "Not enough {token} to cover this claim + fees." | show required vs available; link to wallet |
| `SoldOut` / `Unavailable` | "This item just sold out." | re-fetch; CTA → Sold out; suggest other items |
| `UserRejected` | "Claim cancelled — nothing was charged." | back to CTA |
| `Timeout` | "This is taking longer than expected." | poll canonical status; success if settled, else retry |
| `Network` / other | "Couldn't reach the network. Try again." | retry; no charge |

### 3.4 Claim lifecycle (UX view-model)

`Available → Reserved → ClaimPending → Claimed` (happy path); `Failed`,
`Returned`, `Burned` terminal. This is a UX abstraction over canonical
inventory/item status — drive button/disabled/spinner from it; canonical status
remains source of truth.

### 3.5 States to handle

`loading`; available+eligible; ineligible (requirements); sold out; coming soon;
confirm; success; sold-out-during-claim; insufficient funds; timeout/network.

---

## 4. Component state matrix (QA checklist)

| Component | States it must implement |
| --- | --- |
| Featured carousel | loading, loaded, single-slide (no arrows/dots), empty (hidden or placeholder) |
| Vendor card | Live, EndingSoon (countdown), ComingSoon (countdown, 0% bar), SoldOut/Ended (dimmed) |
| Live grid | loading (skeleton), loaded+paged, no-results (filtered), empty-launchpad |
| Coming-soon / Recently-ended rails | populated (ordered/capped), empty (hide rail) |
| Vendor header | each launchLabel badge; faulted/unavailable |
| Claim panel | open-eligible, gated-ineligible, sold-out, coming-soon, loading |
| Inventory grid | loading, loaded+paged, all/available/sold-out filters, empty |
| Inventory card | Available, SoldOut (greyed + ribbon + struck price) |
| Claim confirm modal | confirm, submitting (disabled, single-flight), success, each error |

---

## 5. Confirm against the real API (checklist)

Each item is a place where the build will stall if the real API differs from the
shapes above — resolve these first.

1. **Vendor list/detail/inventory** — exact field names and nesting for
   `LaunchListing`, `VendorDetail`, `InventoryItem`.
2. **launchLabel** — derived client-side (as above) or returned by the API?
   Confirm the `EndingSoon` (≤2h) signal source.
3. **Timestamps** — `scheduleStartUtc`/`scheduleEndUtc` present and UTC?
4. **Eligibility** — embedded in `getVendor` or a separate call; exact
   `requirements[]` structure and `type` enum (allowlist/hold/neuron/limit).
5. **Per-principal limit** — `limitPerPrincipal` + `principalClaimedCount`
   available to drive the limit line and CTA?
6. **Rarity** — `rarityTier` enum values + `rarityScore` from the rarity engine
   (per `rarity-system-design.md` / `scoring.md`).
7. **Claim call** — exact signature, **idempotency**, the full **error
   taxonomy**, and how settlement confirmation comes back (sync result vs poll).
   This is the highest-risk contract — pin it down before building the modal.
8. **Pagination/sort/filter** — param names, page size options, `total`.
9. **Rails** — can the API order+cap (soonest ×5 / most-recent ×8 within the
   retention window), or must the client?
10. **Assets** — URL shape and available sizes for cover/banner/avatar/media.
11. **Featured** — is there a staff-curation endpoint yet, or hardcode slots for
    launch?
12. **Balances/principal** — how the connected principal and per-token balances
    are read for CTA gating + the confirm modal.

> Items the spec already marks pending implementation (some claim pathways,
> hybrid eligibility evaluation) are backend workstreams, not front-end — if
> they're not ready, stub them behind the contracts above so UI work isn't
> blocked.
