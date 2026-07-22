# Marketplace & Launchpad hero carousels — slide data

Slide copy for the six hero masters in this folder. **Split 2026-07-22:** the
single shared carousel is retired — the Marketplace and the Launchpad now run
**two distinct carousels** with different content models, because they promote
different things. Three masters are assigned to each. Per the spec in
`build-mocks/learn-hero-launchpad-marketplace.html`: the artwork is one clean
layer, and everything else is **live slide data** rendered over the left-side
scrim on desktop (bottom on mobile) — never baked into the image. Titles are
Anton (short); bodies wrap at ~46 characters.

Mock of both carousels (and the reworked empty states):
`html-mockups/marketplace-launchpad-heroes-2026-07-22.html`.

---

## The two templates

### Marketplace carousel — featured collections

Every slide promotes a **collection**, and every slide routes to the same
place: that collection's **Public Collection Hub** (the overview page —
`Design Documentation/public-facing-collection.md`), never a pre-filtered
search. The hub is where "why this collection matters" lives; the marketplace
grid is only ever reached from there.

```js
{ image,                      // 16:6 master, no baked text
  eyebrow,                    // short label — "Featured collection", etc.
  title,                      // Anton, a few words
  body,                       // 1–2 lines, ~46ch
  cta: { label: "View collection", href: "/collection/{id}" } }
```

No countdowns, no state pills — a featured collection isn't time-bound.

### Launchpad carousel — featured drops (state-driven)

Every slide promotes a **vendor** (a drop), and the slide's chrome is driven
by the vendor's launch state (labels per `Design Documentation/launchpad.md`):

| `state` | Pill | Countdown | CTA |
| --- | --- | --- | --- |
| `live` | Live | none | `Claim now · {price}` → vendor detail |
| `ending` | Ending soon | to `endsAtUtc` — days / hrs / mins / secs | `Claim before it ends` → vendor detail |
| `scheduled` | Coming soon | to `opensAtUtc` — days / hrs / mins / secs | `View the drop` → vendor detail (`Notify me` is post-v1) |

```js
{ image, state,               // "live" | "ending" | "scheduled"
  eyebrow,                    // context label after the pill
  title, body,
  endsAtUtc | opensAtUtc,     // UTC target; countdown recomputed from it each tick
  cta: { label, href } }
```

Countdown behaviour follows the launchpad spec: UTC target, client tick 1s
under an hour / 60s otherwise, recompute from the absolute target (never
decrement), optimistic state swap at zero then canonical re-fetch. The
**Ending soon pill** appears at ≤ 2h remaining per the spec; a featured live
drop with a scheduled end further out shows the countdown with the **Live**
pill instead.

---

## Marketplace set (featured collections)

### Slide M1 · `carousel_hero1.jpg` / `hero1.webp` — cyber-samurai city

- **Eyebrow:** Featured collection
- **Title:** NEON DISTRICT
- **Body:** Blades, bass and neon rain — a cyber-samurai
  series minted in the city that never powers down.
- **Button:** View collection → the Neon District collection hub
- *Crop note:* subject stands centre-right — clear of the left text zone;
  survives the 3:4 mobile crop centred on the figure. (Name matches the
  "Neon District" fixture project used in the notification mocks.)

### Slide M2 · `carousel_hero5.jpg` / `hero5.webp` — shuttle mission patches

- **Eyebrow:** Real-world collectibles
- **Title:** MISSION PATCHES
- **Body:** Authentic shuttle-era crew patches — vaulted,
  verified, and redeemable to your door.
- **Button:** View collection → the Mission Patches collection hub
- *Crop note:* the photographic slide of the set — patches sit in the centre
  band, engine bell to the left disappears under the scrim. This is the
  carousel's RWA/vaulted-collectibles slot ("vaulted · verified · redeemable"
  is the consumer phrasing of the custody pipeline — keep it, no backend
  terms).

### Slide M3 · `carousel_hero6.jpg` / `hero6.webp` — retro pixel valley at night

- **Eyebrow:** Retro pixel series
- **Title:** PIXEL VALLEY
- **Body:** A moonlit hike through the valley, rendered
  in glorious 8-bit — straight from the handheld era.
- **Button:** View collection → the Pixel Valley collection hub
- *Crop note:* the hiking line runs centre-bottom and survives both crops;
  the crescent moon top-left sits behind the desktop scrim — fine. The lead
  walker's TOKO shirt is the wink; don't cover it with the mobile text block.
- *Naming note:* deliberately evokes the valley + Game Boy heritage without
  naming the obvious inspiration — never use the real IP's name in copy.

**Rotation order M1 → M2 → M3** (loud cyber → photographic → quiet pixel).

## Launchpad set (featured drops)

### Slide L1 · `carousel_hero2.jpg` / `hero2.webp` — inked skeletons · **Live**

- **State:** `live` — pill **Live** · eyebrow "Featured drop"
- **Title:** SKELETON CREW
- **Body:** Hand-inked troublemakers with places to be.
  Claim yours before the crew rolls on.
- **Button:** Claim now · 8 ICP → the vendor detail page
- *Crop note:* light background — the scrim carries the text contrast;
  boombox skater is the mobile-crop anchor.

### Slide L2 · `carousel_hero3.jpg` / `hero3.webp` — flamingo float · **Ending soon**

- **State:** `ending` — pill **Ending soon** · countdown to `endsAtUtc`
  (days · hrs · mins · secs) · eyebrow "Summer series"
- **Title:** FLOAT SEASON
- **Body:** One inflatable legend, endless golden hour.
  Last chance to dive into the poolside drop.
- **Button:** Claim before it ends → the vendor detail page
- *Crop note:* flamingo is dead-centre — keep the desktop text left of the
  beak; sunset stays visible in both crops.

### Slide L3 · `carousel_hero4.jpg` / `hero4.webp` — penguin colony · **Coming soon**

- **State:** `scheduled` — pill **Coming soon** · countdown to `opensAtUtc`
  (days · hrs · mins · secs) · eyebrow "New drop · scheduled"
- **Title:** ICEBREAKERS
- **Body:** A tiny crew with big plans on thin ice.
  Bundle up before the colony opens its doors.
- **Button:** View the drop → the vendor detail page
- *Crop note:* penguins sit centre-right; the lone polar bear cub falls
  inside the left text zone on desktop — acceptable (it reads as texture
  behind the scrim), fully visible on mobile. Seasonal promos (a
  back-to-school sale, a holiday drop) slot into this position with the same
  scheduled-state chrome.

**Rotation order L1 → L2 → L3** (live claim → urgency → anticipation); the
set deliberately leads with something claimable right now.

---

All six masters are 2560×960 with no baked text, per the export checklist in
the learn page. History: the original mixed six-slide set was delivered in
chat 2026-07-17, written to disk 2026-07-21, and split into the two
per-surface sets above on 2026-07-22.
