/* ============================================================================
   Toko FAQ — content data
   ----------------------------------------------------------------------------
   This is plain, JSON-shaped data. Edit questions here; the page renders them.
   To move to a CMS / the React app later, copy `TOKO_FAQ` straight into a
   faq.json file or a component prop — the shape doesn't change.

   item = { cat, q, a, wip? }
     cat  : category id (see `categories` below)
     q    : question (plain text)
     a    : answer (may contain simple inline <strong> / <em>)
     wip  : true if the feature is still being built / subject to change
   Sourced from Design Documentation/ (see faq-content-draft).
   ============================================================================ */
window.TOKO_FAQ = {
  categories: [
    { id: "about",       label: "About Toko" },
    { id: "wallet",      label: "Wallet" },
    { id: "launchpad",   label: "Buying" },
    { id: "marketplace", label: "Trading", wip: true },
    { id: "generator",   label: "Generator" },
    { id: "collections", label: "Collections" },
    { id: "attributes",  label: "Attributes" },
    { id: "rarity",      label: "Rarity" },
    { id: "score",       label: "Token score" },
    { id: "vendors",     label: "Vendors" },
    { id: "revenue",     label: "Revenue" }
  ],

  items: [
    /* ---- About Toko ---- */
    { cat: "about", q: "What is Toko?",
      a: "Toko is a digital asset platform on the Internet Computer. It brings together a <strong>Generator</strong> for building collectibles from layered artwork, a <strong>Wallet</strong> for holding them, a <strong>Launchpad</strong> for launching and claiming new collections, and a secondary <strong>Marketplace</strong> for peer-to-peer trading." },
    { cat: "about", q: "How is Toko structured — Project, Collection, Vendor?",
      a: "Three layers. A <strong>Project</strong> is the top-level creator workspace (team, media, whitelists, beneficiaries). A <strong>Collection</strong> is the policy boundary for one set of tokens — its attributes, rarity, and supply. A <strong>Vendor</strong> is the “stall” that distributes a collection's tokens. The <strong>Generator</strong> sits beside the collection: its job is the art, while the collection owns the rules." },
    { cat: "about", q: "Do I need to sign in?",
      a: "Public surfaces (Launchpad, collection pages) are browsable, but wallet routes (“My Tokens”) are protected — you sign in with your Internet Computer identity, and ownership always resolves against your principal." },

    /* ---- Wallet ---- */
    { cat: "wallet", q: "Where do I see what I own?",
      a: "In <strong>My Tokens</strong>, from the authenticated sidebar. It shows the tokens currently owned by your principal, your fungible balances (ICRC1 and NNS), and a transaction history — all in one place." },
    { cat: "wallet", q: "What can I do with a token I own?",
      a: "Today: <strong>Transfer</strong> it to another principal, or <strong>Burn</strong> it, both with a confirmation step. Selling actions (list for sale / auction) and stack operations (split, unstack, merge, combine, compact) are designed but not finalized.", wip: true },
    { cat: "wallet", q: "Is burning reversible?",
      a: "No. A burn is permanent and the token can't be recovered. The record is kept in ledger history (status Burned) so supply accounting and provenance stay intact." },
    { cat: "wallet", q: "What are the balances in my wallet?",
      a: "Your fungible token balances — ICRC1 and NNS — shown with symbol/name and amount. In this version balances are <strong>view-only</strong>; sending and swapping fungibles is out of scope for now." },
    { cat: "wallet", q: "What's in the transaction history?",
      a: "Recent transfers for both your NFTs and fungible balances: type (sent, received, mint, burn), amount, from/to principal, timestamp, and a transaction reference where available. View everything together or filter to NFT-only or fungible-only." },
    { cat: "wallet", q: "I just claimed a token — when does it appear?",
      a: "On claim, ownership moves to your principal in the ledger and the token shows up in My Tokens on refresh/reload (or via live update where available)." },
    { cat: "wallet", q: "Why might an action be blocked?",
      a: "Before any wallet action, Toko re-checks current ownership, status, and lock state. If something changed since the page loaded, the action fails safely with “Token state changed. Refresh and try again.” A token listed for sale is also locked against transfer/burn until you cancel the listing.", wip: true },

    /* ---- Buying (Launchpad) ---- */
    { cat: "launchpad", q: "What is the Launchpad?",
      a: "The public place to discover and claim drops. The default view is a gallery of all live vendor drops, plus a Coming Soon rail and a Recently Ended rail. It's intentionally editorial and collectible-first, not a dense trading screen." },
    { cat: "launchpad", q: "What do the labels mean (Live, Coming soon, Ending soon, Sold out, Ended)?",
      a: "They're derived from the vendor's real state: <strong>Coming soon</strong> (scheduled, before start), <strong>Live</strong> (claimable now), <strong>Ending soon</strong> (running with roughly ≤2 hours left), <strong>Sold out</strong> (inventory exhausted), and <strong>Ended</strong> (shown only during a short retention window after it finishes). Paused and faulted vendors are hidden." },
    { cat: "launchpad", q: "How do I claim a token?",
      a: "From a vendor's Launchpad detail page. If you're eligible and the drop is live with inventory, the button reads <strong>Claim now</strong>; the claim is explicit, shows your wallet/payment context before you confirm, and consumes inventory atomically. If you're not eligible it reads <strong>View requirements</strong>." },
    { cat: "launchpad", q: "Why can't I claim — what are “requirements”?",
      a: "Creators can attach programmable conditions to a drop: token-holding requirements, staking, an allowlist, or a per-person claim limit. If you don't meet them, the button shows View requirements instead of Claim. Eligibility is checked again live at claim time." },
    { cat: "launchpad", q: "What ranking and discovery sections exist?",
      a: "Live vendors, Coming Soon, and Recently Ended are available today. Featured, Trending, Newest, and Recently Claimed are planned and the curation tooling isn't built yet.", wip: true },

    /* ---- Trading (Marketplace) ---- */
    { cat: "marketplace", q: "What is the Marketplace?",
      a: "Toko's peer-to-peer trading layer for already-minted tokens: collector-to-collector sales, offers, auctions, and price/provenance transparency. It's a projection over ownership and listing state, not a separate ownership system.", wip: true },
    { cat: "marketplace", q: "Is it custodial — do I hand over my token to list it?",
      a: "No. It's <strong>non-custodial</strong>: ownership stays with you until a sale settles. While listed, the token is locked against conflicting actions; cancel the listing to act on it again. Settlement is atomic — it executes fully or fails fully.", wip: true },
    { cat: "marketplace", q: "What selling formats are planned?",
      a: "Fixed price (Buy Now), Auction (starting bid, duration, increment, optional buy-now), and Offers (make/accept/refuse/counter). A vendor buyback is modeled as an offer in the same system. If a listing ends unsold, the seller chooses whether it returns to the wallet or burns.", wip: true },
    { cat: "marketplace", q: "How is this different from the Launchpad?",
      a: "The <strong>Launchpad</strong> is how you participate in a drop (primary distribution). The <strong>Marketplace</strong> is how you buy/trade existing tokens (secondary). The <strong>Collection Hub</strong> is the context page that summarizes a collection and links out, rather than duplicating either interface.", wip: true },

    /* ---- Generator ---- */
    { cat: "generator", q: "What is the Generator for?",
      a: "It builds the artwork. You give it layered parts (bodies, accessories, etc.) and it assembles unique tokens, which you then export into a collection. It deliberately does not assign rarity or score — those belong to the collection." },
    { cat: "generator", q: "What does “deterministic / replayable” mean?",
      a: "Given the same configuration, seed, batch type, target count, and input, the Generator produces exactly the same output every time. No duplicate part-combinations occur within a batch, and every export carries a locked snapshot (seed, config hash, layers/parts, weights, rules) for audit and provenance." },
    { cat: "generator", q: "How does weighting work, and is weighting the same as rarity?",
      a: "No — and this is a key distinction. Generator <strong>weighting</strong> controls only how often a part is picked (composition/frequency). Collection <strong>rarity</strong> is a separate policy about how rare a finished token is. Part weights use presets — Very Infrequent, Infrequent, Balanced (default), Frequent, Very Frequent — or custom numbers." },
    { cat: "generator", q: "What can the Generator produce in one run?",
      a: "Three batch types: a limited number, a single token, or generate from a CSV (download a template, fill it in, upload and validate). You preview, pin the ones you want, and export the pinned set." },
    { cat: "generator", q: "How do tokens get into a collection?",
      a: "Only through the Generator's export path. Imported tokens arrive in Draft with their composition/provenance attached. A collection links to one generator source; once linked, imports from other generators are rejected." },

    /* ---- Collections ---- */
    { cat: "collections", q: "What are the collection stages?",
      a: "<strong>Draft → Review → Live.</strong> Draft is creator configuration; Review is publicly reviewable but still editable; Live is the production state where core policy becomes read-only." },
    { cat: "collections", q: "What do I need to create a collection?",
      a: "A valid name, a description, and a thumbnail. Creating it opens the collection overview." },
    { cat: "collections", q: "What can I still change once a collection is Live?",
      a: "The storefront/presentation fields (thumbnail, banner, name, description, URL, socials) and issue-number display defaults for future vendors. Locked at Live: guardian permissions, supply caps, attributes, rarity, and anything that would change existing tokens or their tier placement." },
    { cat: "collections", q: "Can I delete a collection?",
      a: "Only if no token has been minted yet (with an explicit confirmation). Once any token is minted, deletion is blocked." },
    { cat: "collections", q: "What is the Guardian?",
      a: "A set of collection-scoped, buyer-facing promises: whether the collection allows duplicate tokens, token destruction, transfer restrictions, and sale restrictions. They act as guarantees to collectors." },
    { cat: "collections", q: "How does supply and issue numbering work?",
      a: "Supply policy sets a total cap, a max number of unique tokens, and max copies per token. <strong>Issue numbers</strong> belong to the token definition (not each copy), are assigned at Review → Live, then locked and never reused. Each copy also gets an immutable copy sequence. Display options: Hidden (default), Show issue only, or Show issue and supply when capped." },

    /* ---- Attributes ---- */
    { cat: "attributes", q: "What are attributes, token types, and traits?",
      a: "Attributes are the schema of properties tokens can have; they're authored at the collection level (not in the Generator). A token type groups tokens that share an attribute set, and traits are the specific values. Generator composition is evidence the attribute system can map into derived attribute values." },
    { cat: "attributes", q: "Do attributes feed the token score?",
      a: "Yes, when you map attribute values to numbers and pick a calculation method. Whether the score is shown to collectors is a separate, per-collection visibility setting." },

    /* ---- Rarity ---- */
    { cat: "rarity", q: "What rarity models are there?",
      a: "Three, set at the collection level. Every collection starts in <strong>Uniform</strong> (all tokens equal). <strong>Tiered</strong> lets you define your own tiers and assign manually (the system shows score guidance but no suggested tier). <strong>Weighted</strong> uses Toko's fixed official tiers — Common, Uncommon, Rare by default, with Epic and Legendary unlockable — and assigns deterministically by score." },
    { cat: "rarity", q: "How is the Weighted distribution decided?",
      a: "By a <strong>ratio</strong> (how much scarcer each rarer tier is) and an <strong>accelerator</strong> (curve steepness), computed read-only over Max Supply. Defaults the moment you pick Weighted: Max Supply 1,000, ratio 3, accelerator 1.0 — roughly Common 69% / Uncommon 23% / Rare 8% on the 3-tier set." },
    { cat: "rarity", q: "What does a Weighted tier quota actually limit?",
      a: "It's a <strong>mint budget</strong>, not a cap on how many definitions carry that tier. Each definition gets one tier and its own supply; the quota limits how many copies across the whole tier may ever be minted, enforced first-come at mint. Quotas freeze when the collection goes Live." },
    { cat: "rarity", q: "Will my tiers change on their own?",
      a: "No. There's no silent background re-tiering. Weighted distribution only changes when you run an explicit Rebalance, and a manual override pins a token to a tier until you undo it." },

    /* ---- Token score ---- */
    { cat: "score", q: "How is a token's score calculated?",
      a: "final_score = attribute_score × layer_multiplier. The attribute score comes from the numbers you mapped to attributes, combined by the collection's method (Add Values, Multiply, or Highest). The layer multiplier scales by generator-layer weighting (1.0 when no generator is linked). Adding more tokens never changes an existing token's score unless its own inputs changed." },
    { cat: "score", q: "Is score the same as rank?",
      a: "No. <strong>Score Rank</strong> is always computed within a single token type, never across the whole collection — types with more scoring attributes would otherwise systematically outrank others. Multi-type collections get a token-type filter on the scoring tables." },
    { cat: "score", q: "What is a “stale score”?",
      a: "Each token is fresh or stale. A score goes stale when an input changes — token composition or attribute values (while Draft), the value→number mapping, the layer-weight config, or the calculation method. The UI flags it, and a token can't move Review → Live while its score is stale. A bulk Refresh all stale action exists." },
    { cat: "score", q: "Is the score always visible to collectors?",
      a: "No — score visibility is a separate per-collection setting, independent of the rarity model." },

    /* ---- Vendors ---- */
    { cat: "vendors", q: "What is a vendor?",
      a: "A distribution mechanism — the configured “shop” that hands tokens to collectors, with its own storefront, lifecycle, inventory, costs, rules, and revenue. Its inventory is backed by minted tokens, not draft definitions." },
    { cat: "vendors", q: "Are vendors per-collection or per-project?",
      a: "Today a vendor is collection-scoped. A decided change moves vendors to <strong>project scope</strong> (one vendor can distribute minted tokens from several of a project's collections, with project-level revenue templates and collection-level claim defaults). Treat the project-scope behavior as planned, not shipped.", wip: true },
    { cat: "vendors", q: "What vendor types are there?",
      a: "<strong>Market</strong> vendors (sell specific tokens) launch first. <strong>Gacha</strong> and GachaRwa (randomized “mystery pull”) are designed but deferred and feature-gated off until a later release — so at launch, expect Market vendors only." },
    { cat: "vendors", q: "How do Gacha vendors work?",
      a: "A claim returns a randomly selected reward from the vendor's prize pool. Two draw modes: uniform lucky dip (equal chance per available unit) or weighted (odds from weight × available quantity, so they shift as inventory changes). The full prize pool — including sold-out entries — is always visible, draws are deterministic and fully audited, with optional reveal moments. Not in the first launch.", wip: true },
    { cat: "vendors", q: "How do I control who can claim, and how much?",
      a: "Vendors support claim costs (by tier), requirements (holdings, staking, allowlist — evaluated per tier), restrictions, and rewards, plus per-principal limits. Allowlists come from your project whitelists." },
    { cat: "vendors", q: "Can I pause or stop a drop after it's live?",
      a: "Yes — vendors move through runtime states (setup, running, paused, empty, ended, faulted) and can be started, paused, resumed, restarted, or stopped. When a vendor stops, unclaimed inventory either returns to inventory or is burned, per its termination policy." },

    /* ---- Revenue ---- */
    { cat: "revenue", q: "How does revenue work?",
      a: "Through <strong>Revenue Presets</strong> — named, project-level split templates. A vendor selects a Live preset at creation, which copies the values onto the vendor as a snapshot; editing the preset later doesn't change vendors already using it. Claim presets ship first; Sale presets are a future tab.", wip: true },
    { cat: "revenue", q: "What's in a revenue split?",
      a: "Fees off the top — Project / cycles funding (required, ~1–10%) and an optional Toko contribution (0–10%) — plus optional royalties to your beneficiaries. Per-royalty cap ~10%, total royalties capped, and only Live beneficiaries can receive royalties. If you want a cut yourself, add yourself as a beneficiary." },
    { cat: "revenue", q: "Can royalties change over time?",
      a: "Yes. Each royalty runs Forever or for a fixed period with a taper (No taper, Cliff, Linear, or Curve) that changes the effective percent across the period. The taper clock starts when the vendor first goes Running." },
    { cat: "revenue", q: "What is a buyback?",
      a: "An offer from a vendor to buy a token back, configured at the vendor level (a percentage over a set duration). It runs through the same shared offer system as marketplace offers.", wip: true }
  ]
};
