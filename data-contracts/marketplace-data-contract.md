# Marketplace — Data Contract & Component Binding

Implementation companion to the secondary-marketplace mockups (v1, **fixed-price
only — no auctions, no offers**). Same format as
[launchpad-data-contract.md](./launchpad-data-contract.md): for each screen it
lists **(a)** what it loads, **(b)** element → field bindings, **(c)** states to
handle, **(d)** actions and their API calls.

Covers these mocks:
- `build-mocks/html-mockups/marketplace-states-gallery-2026-06-28.html` — browse (global + collection-scoped + activity)
- `build-mocks/html-mockups/marketplace-token-states-gallery-2026-06-28.html` — token detail / Buy Now
- `build-mocks/html-mockups/marketplace-list-states-gallery-2026-06-28.html` — List for sale (seller flow)

Behaviour source of truth: [secondary-marketplace-design.md](./secondary-marketplace-design.md).
Field provenance: [token-system-design.md](./token-system-design.md),
[collection-system-design.md](./collection-system-design.md),
[rarity-system-design.md](./rarity-system-design.md),
[attribute-system-design.md](./attribute-system-design.md),
[wallet.md](./wallet.md) (My Tokens → listing entry).

Shared conventions (money formatting, connected principal + balances,
pagination/search/sort, the featured carousel) are defined in
[launchpad-data-contract.md §0](./launchpad-data-contract.md) and reused here.

## How to read this

Same rules as the launchpad doc: `code` field names are the **shape the UI
needs** (reconcile with your real API — every such spot is in the §5 checklist);
**Derived** = computed client-side.

---

## 0. Marketplace cross-cutting

### 0.1 Listing runtime (from the spec)

```
Unlisted | ListedFixed | SoldPendingSettlement | TransferPending
```
The UI only ever shows `Unlisted` (no buy) or `ListedFixed` (buyable). The two
pending states drive the disabled/"settling" UI during a purchase. No auction or
offer states exist in v1.

### 0.2 Currency (multi-token)

A listing is denominated in **exactly one** payment token — `ICP` or a supported
`ICRC1`. The seller picks it; the buyer pays it; there is no conversion.

```
getSupportedTokens() -> [ { token, symbol, decimals } ]   // feeds the currency dropdown
Price { amount, token, symbol, decimals }                  // shown wherever price appears
```
A fiat estimate is informational only and never the settlement amount.

### 0.3 Fees (from config, not hardcoded)

The listing summary and seller net come from:
- `marketplaceFeeRate` — platform config (the mock shows 2%)
- `royaltyRate` — **per collection** config (the mock shows 5%)

`net = listPrice − marketplaceFee − royalty`. Confirm both rates' sources.

### 0.4 Non-custodial rule

While `ListedFixed` the token stays in the seller's wallet and is **sale-locked**
(no transfer/re-list/burn via other flows). Ownership transfers only on
settlement. The UI must reflect "stays in your wallet until it sells".

---

## 1. Browse — `marketplace-states-gallery`

### 1.1 Data the screen loads

| Block | Call | Returns |
| --- | --- | --- |
| Featured carousel | `getFeatured()` (trending collections / top sales) | `FeaturedSlide[]` (see launchpad §1) |
| Global / scoped grid | `getListings({ scope, collectionId?, q, status, rarityTier?, priceMin?, priceMax?, issueFrom?, issueTo?, attrs?, sort, page, pageSize })` | `Paged<Listing>` |
| Collection header | `getCollectionMarket(collectionId)` | `CollectionMarket` |
| Activity feed | `getCollectionActivity(collectionId, { page, pageSize })` | `Paged<ActivityEvent>` |
| Filter rail facets | `getCollections()` (+counts), `getCollectionRarityTiers(collectionId)`, collection attribute schema | facet lists |

```
Listing {
  listingId, tokenId, collectionId, collectionName,
  sellerPrincipal,
  price: Price,
  status,                       // §0.1
  createdAtUtc, expiresAtUtc|null,   // null = "Until I cancel"
  endBehavior,                  // returnToWallet | burn
  // denormalised token display:
  name, issueNumber, rarityTier, rarityScore, mediaAsset,
  viewerOwns: boolean,          // true -> show "List", not "Buy"
  tokenRoute
}

CollectionMarket {
  collectionId, name, creatorName,
  bannerAsset, avatarAsset, description,
  socials { website, x, discord, youtube, instagram },
  stats { floorPrice: Price, volume: Price, listingsCount, avgPrice: Price }
}

ActivityEvent {
  type,            // Mint | Listing | Sale | Transfer | Cancel   (no Offer/Bid in v1)
  tokenId, name, mediaAsset,
  price: Price | null,
  rarityTier|null, from|null, to|null, timeUtc
}
```

### 1.2 Element → field binding

**Item card** (approved token card): rarity frame ← `rarityTier`; art ←
`mediaAsset`; `.col` ← `collectionName` (global scope only); `.name`/`.issue` ←
`name`/`issueNumber`; `.pr` ← `price`; CTA chip ← derived (§1.3); click →
`tokenRoute`.

**Controls:** search → `q` (token name / `#issue` / attribute value / collection
name); status tabs (All / Listed / Unlisted) → `status`; sort select → `sort`
(Most recently listed | Oldest | Lowest price | Highest price | Rarity | Recently
sold | Ending soon). Grid density toggle is **client-only** (no API).

**Filter rail:** collection checklist ← `getCollections()` (+ per-collection
counts); **rarity tier dropdown ← `getCollectionRarityTiers(collectionId)`** —
options come from the in-scope collection's rarity settings, not a fixed list;
price min/max → `priceMin`/`priceMax` (currency-aware); issue range →
`issueFrom`/`issueTo`; attribute checks ← collection attribute schema.

**List bar:** results count ← `total`; pager ← `page`/`pageSize`; per-page select
(25/50/100). Reset to page 1 on any search/filter/sort change.

**Collection-scoped header** ← `CollectionMarket`: banner/avatar/name/creator/
socials; stat cells ← `stats.{floorPrice, volume, listingsCount, avgPrice}`. Tabs
Items / Activity.

**Activity table** ← `ActivityEvent[]`: event dot+label ← `type`; item ←
`mediaAsset`+`name`; price ← `price`; rarity ← `rarityTier`; from/to ←
`from`/`to`; time ← `timeUtc` (relative).

### 1.3 CTA chip (derived)

| Condition | Card CTA |
| --- | --- |
| `status=ListedFixed && !viewerOwns` | **Buy** |
| `viewerOwns` | **Yours · list** → list-for-sale flow |
| `status=Unlisted` (visibility filter on) | no price, no CTA |

### 1.4 States to handle

`loading` (skeleton); `loaded`+paged; `no-results` (filtered → character state,
**keep carousel + header + controls**); `empty` (nothing listed yet → same, keep
top); `error` (retry). Cross-currency feeds: price sorts use a normalised display
estimate but each card shows its **true listed currency**.

---

## 2. Token detail / Buy Now — `marketplace-token-states-gallery`

### 2.1 Data the screen loads

```
getMarketToken(tokenId) -> MarketTokenDetail {
  tokenId, collectionId, collectionName, ledgerCanister,
  name, issueNumber, rarityTier, rarityScore,
  attributes: [ { key, value, rarityPct? } ],
  media: [ assetUrl ],
  ownerPrincipal,
  listing: Listing | null,                 // active listing, else null
  metrics { collectionFloor: Price, lastSale: Price|null },
  activity: [ ActivityEvent ]              // this token's market history
}
getCollectionListings(collectionId, { excludeTokenId, limit }) -> Listing[]   // "More from…"
```
No `topOffer` field in v1 (offers deferred).

### 2.2 Binding

Left: media gallery ← `media[]`; identity ← `name`/`issueNumber`; rarity ←
`rarityTier`+`rarityScore`; attributes ← `attributes[]`; token rows ←
`collectionName`/`ledgerCanister`/`issueNumber`/`ownerPrincipal`; market history
← `activity[]`.

Buy panel (driven by `listing` + `metrics` + viewer):
- seller ← `listing.sellerPrincipal`; badge ← `listing.status`
- price ← `listing.price`; floor ← `metrics.collectionFloor`; last sale ←
  `metrics.lastSale`; expires ← `listing.expiresAtUtc`; if-unsold ←
  `listing.endBehavior`
- **Related rail** "More from {collectionName}" ← `getCollectionListings(...)`
  (approved token cards with rarity border)

### 2.3 Panel state (derived)

| Condition | Panel |
| --- | --- |
| `listing && ownerPrincipal != viewer` | **Buy now · {price}** + listing meta |
| `ownerPrincipal == viewer` | "You own this" → **List for sale** / Manage |
| `listing == null` (other owner) | "Not listed" — no buy (offers deferred) |

### 2.4 Action — Buy Now

Confirm modal: token preview, `listing.price`, `networkFee`, viewer
`balances[token]`, total. **Confirm → `buy(listingId, { expectedPrice, expectedToken })`.**

- Pre-settlement revalidation: listing still `ListedFixed`, seller still owns,
  buyer funds cover price + fees.
- Returns `{ ok:true, tokenId, txRef }` or a typed error.
- Settlement is atomic; on `ok`, ownership transfers to buyer and the listing
  closes; link to **My Tokens**.

| Error (confirm names) | Message | Next step |
| --- | --- | --- |
| `InsufficientFunds` | "Not enough {token} to cover this purchase + fees." | required vs available; link to wallet |
| `AlreadySold` | "This token was just bought by someone else." | re-fetch; clear CTA; suggest similar |
| `ListingGone` (cancelled/expired) | "This listing is no longer available." | re-fetch to current state |
| `UserRejected` | "Purchase cancelled — nothing was charged." | back to Buy now |
| `Timeout` | "This is taking longer than expected." | poll status; success if settled else retry |
| `Network`/other | "Couldn't reach the network. Try again." | retry; no charge |

---

## 3. List for sale — `marketplace-list-states-gallery`

Entered from **My Tokens** for a token the principal owns.

### 3.1 Data the screen loads

```
getListableTokens(principal) -> ListableToken[] {
  tokenId, name, issueNumber, rarityTier, mediaAsset,
  holding,           // 'single' | 'stack'
  stackCount?,       // when holding='stack'
  alreadyListed      // true -> locked in picker, can't re-list
}
getSupportedTokens()                       // currency dropdown (§0.2)
getListingTerms(tokenId)                   // { marketplaceFeeRate, royaltyRate, collectionName }
```

### 3.2 Binding

**Token (always visible, left):** asset ← selected `mediaAsset`; name/issue ←
`name`/`issueNumber`; rarity tag ← `rarityTier`; holding line ←
`holding`/`stackCount`. "Change token" → picker over `getListableTokens`
(`alreadyListed` rendered locked).

**Form:**
- Price: amount input + currency select ← `getSupportedTokens()`
- Duration select (presets only): `1 | 3 | 7 | 14 | 30` days, or `0` = **Until I
  cancel** (no expiry). `expiresAtUtc` = publish time + duration (UTC).
- End-of-listing radios → `endBehavior` (`returnToWallet` default | `burn`).
- Summary: list price; marketplace fee ← `price × marketplaceFeeRate`; royalty ←
  `price × royaltyRate`; **net** ← derived (§0.3).

### 3.3 Action — publish

**Review → `createListing({ tokenId, price:{amount,token}, durationDays, endBehavior })` → wallet sign.**
On success the token becomes `ListedFixed` + sale-locked; route to the listing.
Also: `cancelListing(listingId)`, `editPrice(listingId, price)` for the
already-listed guard.

| State | Handling |
| --- | --- |
| invalid price (≤0 / empty) | inline field error; disable Review |
| already listed | replace form with "already listed" + Edit price / Cancel listing |
| stale-state conflict | pre-submit revalidation fails (moved / already listed) → "refresh and try again", nothing published |
| publishing | single-flight; disable confirm while in flight |
| success | "listing live · sale-locked" + View listing / Back to My Tokens |

---

## 4. Component state matrix (QA checklist)

| Component | States |
| --- | --- |
| Featured carousel | loading, loaded, single-slide, empty |
| Item card | ListedFixed (Buy), viewerOwns (List), Unlisted (visibility only), multi-currency price |
| Browse grid | loading, loaded+paged, no-results (filtered), empty (nothing listed) — both keep the page top |
| Filter rail | rarity dropdown populated per selected collection; price/issue/attr facets |
| Collection header | stats present, missing/zero stats, social links present/absent |
| Activity table | each event type, price-less events (mint/transfer/cancel), responsive column hiding |
| Buy panel | listed (buyable), you-own-it, unlisted, loading |
| Buy confirm modal | confirm, submitting (single-flight), success, each error (§2.4) |
| Token picker (list flow) | selectable, already-listed (locked), stack vs single |
| Listing form | valid, invalid price, return vs burn, fee/royalty recompute on currency change |
| Listing result | live + sale-locked, stale-state conflict |

---

## 5. Confirm against the real API (checklist)

1. **Listing shape** — `Listing` field names; how the token display fields are
   denormalised onto a listing (or a second `getToken` call needed per card).
2. **Currency** — `getSupportedTokens` (which ICRC1s); `decimals` per token for
   formatting and amount entry.
3. **Fees** — exact source of `marketplaceFeeRate` (platform) and `royaltyRate`
   (per collection); are they returned with the listing terms?
4. **Buy call** — signature, **idempotency**, full **error taxonomy**, and how
   settlement confirmation comes back (sync vs poll). Highest-risk contract.
5. **Create listing** — signature; how `durationDays=0` (no expiry) and
   `endBehavior=burn` are represented; what sale-lock looks like to other flows.
6. **Stats** — are `floorPrice / volume / listingsCount / avgPrice` precomputed
   server-side, and in which currency (mixed-currency normalisation)?
7. **Rarity tiers** — `getCollectionRarityTiers(collectionId)` for the filter
   dropdown (values come from the collection's rarity settings).
8. **Activity** — event schema + enum (`Mint|Listing|Sale|Transfer|Cancel`);
   pagination contract.
9. **Listable tokens** — `getListableTokens` source from the wallet; how
   `alreadyListed` and stack vs single are flagged.
10. **Sort/filter params** — names for status/price/rarity/issue/attrs/sort;
    cross-currency price-sort behaviour.
11. **Search** — does `q` cover token name + `#issue` + attribute value +
    collection name server-side?
12. **Balances/principal** — connected principal + per-token balances for CTA
    gating and the buy confirm modal.

> v1 scope guard: anything offer- or auction-related (top offer, bids, offer
> inbox, accept/refuse/counter) is **deferred** per the spec — don't build the
> fields or surfaces. They re-enter when those features ship.
