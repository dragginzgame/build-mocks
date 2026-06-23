/* ============================================================================
   Toko FAQ — content data
   ----------------------------------------------------------------------------
   Plain, JSON-shaped data. Edit questions here; the page renders them.

   item = { aud, cat, q, a, wip? }
     aud  : audience — "collector" | "creator" | "both"
            Collectors view shows  collector + both
            Creators view shows    creator   + both
     cat  : category id (see `categories` below)
     q    : question (plain text)
     a    : answer (may contain simple inline <strong> / <em>)
     wip  : true if the feature is still being built / subject to change

   The Creators view goes deeper into the product design; the Collectors view
   keeps to wallet / buying / trading. Sourced from Design Documentation/.
   ============================================================================ */
window.TOKO_FAQ = {
  audiences: [
    { id: "collector", label: "For collectors" },
    { id: "creator",   label: "For creators" }
  ],

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
    /* ===================== ABOUT (both) ===================== */
    { aud: "both", cat: "about", q: "What is Toko?",
      a: "Toko is a digital asset platform on the Internet Computer. It brings together a <strong>Generator</strong> for building collectibles from layered artwork, a <strong>Wallet</strong> for holding them, a <strong>Launchpad</strong> for launching and claiming new collections, and a secondary <strong>Marketplace</strong> for peer-to-peer trading." },
    { aud: "both", cat: "about", q: "How is Toko structured — Project, Collection, Vendor?",
      a: "Three layers. A <strong>Project</strong> is the top-level creator workspace (team, media, whitelists, beneficiaries, and vendors). A <strong>Collection</strong> is the policy boundary for one set of tokens — its attributes, rarity, and supply. A <strong>Vendor</strong> is the “stall” that distributes tokens. The <strong>Generator</strong> sits beside the collection: its job is the art, while the collection owns the rules." },
    { aud: "both", cat: "about", q: "Do I need to sign in?",
      a: "Public surfaces (Launchpad, collection pages) are browsable, but wallet routes (“My Tokens”) are protected — you sign in with your Internet Computer identity, and ownership always resolves against your principal." },

    /* ===================== WALLET (collector) ===================== */
    { aud: "collector", cat: "wallet", q: "Where do I see what I own?",
      a: "In <strong>My Tokens</strong>, from the authenticated sidebar. It shows the tokens currently owned by your principal, your fungible balances (ICRC1 and NNS), and a transaction history — all in one place." },
    { aud: "collector", cat: "wallet", q: "What can I do with a token I own?",
      a: "Today: <strong>Transfer</strong> it to another principal, or <strong>Burn</strong> it, both with a confirmation step. Selling actions (list for sale / auction) and stack operations (split, unstack, merge, combine, compact) are designed but not finalized.", wip: true },
    { aud: "collector", cat: "wallet", q: "Is burning reversible?",
      a: "No. A burn is permanent and the token can't be recovered. The record is kept in ledger history (status Burned) so supply accounting and provenance stay intact." },
    { aud: "collector", cat: "wallet", q: "What are the balances in my wallet?",
      a: "Your fungible token balances — ICRC1 and NNS — shown with symbol/name and amount. In this version balances are <strong>view-only</strong>; sending and swapping fungibles is out of scope for now." },
    { aud: "collector", cat: "wallet", q: "What's in the transaction history?",
      a: "Recent transfers for both your NFTs and fungible balances: type (sent, received, mint, burn), amount, from/to principal, timestamp, and a transaction reference where available. View everything together or filter to NFT-only or fungible-only." },
    { aud: "collector", cat: "wallet", q: "I just claimed a token — when does it appear?",
      a: "On claim, ownership moves to your principal in the ledger and the token shows up in My Tokens on refresh/reload (or via live update where available)." },
    { aud: "collector", cat: "wallet", q: "Why might an action be blocked?",
      a: "Before any wallet action, Toko re-checks current ownership, status, and lock state. If something changed since the page loaded, the action fails safely with “Token state changed. Refresh and try again.” A token listed for sale is also locked against transfer/burn until you cancel the listing.", wip: true },

    /* ===================== BUYING / LAUNCHPAD (collector) ===================== */
    { aud: "collector", cat: "launchpad", q: "What is the Launchpad?",
      a: "The public place to discover and claim drops. The default view is a gallery of all live vendor drops, plus a Coming Soon rail and a Recently Ended rail. It's intentionally editorial and collectible-first, not a dense trading screen." },
    { aud: "collector", cat: "launchpad", q: "What do the labels mean (Live, Coming soon, Ending soon, Sold out, Ended)?",
      a: "They're derived from the vendor's real state: <strong>Coming soon</strong> (scheduled, before start), <strong>Live</strong> (claimable now), <strong>Ending soon</strong> (running with roughly ≤2 hours left), <strong>Sold out</strong> (inventory exhausted), and <strong>Ended</strong> (shown only during a short retention window after it finishes). Paused and faulted vendors are hidden." },
    { aud: "collector", cat: "launchpad", q: "How do I claim a token?",
      a: "From a vendor's Launchpad detail page. If you're eligible and the drop is live with inventory, the button reads <strong>Claim now</strong>; the claim is explicit, shows your wallet/payment context before you confirm, and consumes inventory atomically. If you're not eligible it reads <strong>View requirements</strong>." },
    { aud: "collector", cat: "launchpad", q: "Why can't I claim — what are “requirements”?",
      a: "Creators can attach programmable conditions to a drop: token-holding requirements, staking, an allowlist, or a per-person claim limit. If you don't meet them, the button shows View requirements instead of Claim. Eligibility is checked again live at claim time." },
    { aud: "collector", cat: "launchpad", q: "What ranking and discovery sections exist?",
      a: "Live vendors, Coming Soon, and Recently Ended are available today. Featured, Trending, Newest, and Recently Claimed are planned and the curation tooling isn't built yet.", wip: true },

    /* ===================== TRADING / MARKETPLACE (collector, wip) ===================== */
    { aud: "collector", cat: "marketplace", q: "What is the Marketplace?",
      a: "Toko's peer-to-peer trading layer for already-minted tokens: collector-to-collector sales, offers, auctions, and price/provenance transparency. It's a projection over ownership and listing state, not a separate ownership system.", wip: true },
    { aud: "collector", cat: "marketplace", q: "Is it custodial — do I hand over my token to list it?",
      a: "No. It's <strong>non-custodial</strong>: ownership stays with you until a sale settles. While listed, the token is locked against conflicting actions; cancel the listing to act on it again. Settlement is atomic — it executes fully or fails fully.", wip: true },
    { aud: "collector", cat: "marketplace", q: "What selling formats are planned?",
      a: "Fixed price (Buy Now), Auction (starting bid, duration, increment, optional buy-now), and Offers (make/accept/refuse/counter). A vendor buyback is modeled as an offer in the same system. If a listing ends unsold, the seller chooses whether it returns to the wallet or burns.", wip: true },
    { aud: "collector", cat: "marketplace", q: "How is this different from the Launchpad?",
      a: "The <strong>Launchpad</strong> is how you participate in a drop (primary distribution). The <strong>Marketplace</strong> is how you buy/trade existing tokens (secondary). The <strong>Collection Hub</strong> is the context page that summarizes a collection and links out, rather than duplicating either interface.", wip: true },

    /* ===================== GENERATOR (creator) ===================== */
    { aud: "creator", cat: "generator", q: "What is the Generator for?",
      a: "It builds the artwork. You give it ordered <strong>layers</strong> (background, body, accessories…) each holding <strong>parts</strong>, set compatibility rules, weighting and caps, then run a batch to assemble unique tokens. When you're happy, you <strong>pin</strong> the keepers and <strong>export</strong> them into a collection. The Generator deliberately does not assign rarity or score — those are collection policy." },
    { aud: "creator", cat: "generator", q: "What does “deterministic / replayable” mean, exactly?",
      a: "Output is a pure function of <code>configHash</code>, <code>seed</code>, batch type, target count and any CSV input. The same inputs always reproduce the same tokens, and if any input changes the output changes. No duplicate part-combinations occur within a batch, and every export carries a <strong>locked snapshot</strong> (batch id, seed, config hash, layers/parts, weights, compatibility rules, caps, asset versions) so a result can always be audited or replayed." },
    { aud: "creator", cat: "generator", q: "How does weighting work, and is weighting the same as rarity?",
      a: "No — this is the key distinction. Generator <strong>weighting</strong> only controls how often a part is picked (composition/frequency). Collection <strong>rarity</strong> is a separate policy about how rare a finished token is. Part weights use presets — Very Infrequent (1), Infrequent (2), <strong>Balanced (3, the default)</strong>, Frequent (5), Very Frequent (8) — or custom numbers. Per-part caps are batch-scoped only, never collection-wide scarcity." },
    { aud: "creator", cat: "generator", q: "What can the Generator produce in one run, and how do parts combine?",
      a: "Three batch types: a limited number, a single token, or generate from a CSV (download a template, fill it in, upload and validate). Assembly evaluates each layer's inclusion (<code>always</code> or <code>optional_with_probability</code>), picks parts by weighted choice, then validates compatibility (requires/excludes part or layer) and caps, rejecting invalid candidates until the target count of valid, unique tokens is reached." },
    { aud: "creator", cat: "generator", q: "How do tokens get from the Generator into a collection?",
      a: "Only through the Generator's export path — there's no separate import wizard. You preview, pin the keepers, and export the pinned set. Imported tokens arrive in <strong>Draft</strong> with composition/provenance attached. A collection links to a single generator source; once linked, imports from other generators are rejected. The export hands over composition evidence the attribute system can later map into derived values." },

    /* ===================== COLLECTIONS (creator) ===================== */
    { aud: "creator", cat: "collections", q: "What are the collection stages, and what changes between them?",
      a: "<strong>Draft → Review → Live.</strong> Draft is creator configuration (freely editable). Review is publicly reviewable but still editable. Live is production: core policy locks. A token can only go Live after its collection is Live." },
    { aud: "creator", cat: "collections", q: "What freezes when a collection goes Live?",
      a: "At go-live the budget basis and policy lock: <strong>Max Supply</strong>, rarity type, ratio/accelerator, the unlocked tier set, any definition-count cap, guardian permissions, supply caps, and attributes. Only aesthetic fields stay editable (description, thumbnail, banner) plus issue/copy-number display defaults for future vendors. There's no post-live “expand supply” — set it right before go-live. The roster stays open, though: new definitions can still be authored and set Live against the already-frozen budgets." },
    { aud: "creator", cat: "collections", q: "What is the Guardian?",
      a: "A set of collection-scoped, buyer-facing promises: whether the collection allows duplicate tokens, token destruction, transfer restrictions, and sale restrictions. They're guarantees collectors can rely on, locked at Live. (Today these are largely UI configuration + warnings; full backend enforcement of the invariants is still being completed.)" },
    { aud: "creator", cat: "collections", q: "How do supply and issue numbering work?",
      a: "Supply policy sets a total cap, a max number of unique tokens, and max copies per token. <strong>Issue numbers</strong> belong to the token definition (not each copy), are assigned in live-order at <strong>Review → Live</strong>, then locked and never reused. Each copy also gets an immutable <code>copy_sequence</code>. Display options: Hidden (default), Show issue only, or Show issue and supply when capped — non-stackable multi-copy tokens can additionally show a copy number." },
    { aud: "creator", cat: "collections", q: "Can I delete a collection?",
      a: "Only if no token has been minted yet (with an explicit confirmation). Once any token is minted, deletion is blocked." },

    /* ===================== ATTRIBUTES (creator) ===================== */
    { aud: "creator", cat: "attributes", q: "What are attributes, token types, and traits?",
      a: "Attributes are the schema of properties tokens can have, authored at the <strong>collection</strong> level (not in the Generator). A <strong>token type</strong> groups tokens that share an attribute set; traits are the specific values. Generator composition is <em>evidence</em> the attribute system maps into derived attribute values via the Generator Mapping surface — the Generator itself never stores attributes on parts." },
    { aud: "creator", cat: "attributes", q: "How do attributes become a token's score?",
      a: "On the Attributes page you map attribute values to numbers (Apply Values) and choose a calculation method — <strong>Add Values</strong>, <strong>Multiply</strong>, or <strong>Highest</strong>. Missing/unmapped values are excluded (not treated as 0 unless you map them to 0). That produces the attribute score, which feeds the final token score. Whether the score is shown to collectors is a separate per-collection visibility setting." },

    /* ===================== RARITY (creator) ===================== */
    { aud: "creator", cat: "rarity", q: "What rarity models are there?",
      a: "Three, set at the collection level; every collection starts in <strong>Uniform</strong>. <strong>Uniform</strong> treats all tokens equally. <strong>Tiered</strong> lets you define your own tiers (names + colours fully custom) and assign manually — the system shows Final Score and Score Rank as non-binding guidance but offers no “suggested tier”. <strong>Weighted</strong> uses Toko's fixed official tiers (Common, Uncommon, Rare by default; Epic and Legendary unlockable) and assigns deterministically by score. Switching models requires explicit confirmation and resets rarity outputs." },
    { aud: "creator", cat: "rarity", q: "How is the Weighted distribution decided?",
      a: "By a <strong>ratio</strong> (how much scarcer each rarer tier is than the one below) and an <strong>accelerator</strong> (curve steepness). Per-tier quotas are computed read-only from those over Max Supply — you tune the curve, not raw quotas. Defaults the moment you choose Weighted: <strong>Max Supply 1,000, ratio 3, accelerator 1.0</strong>, giving roughly Common 69% / Uncommon 23% / Rare 8% on the 3-tier set." },
    { aud: "creator", cat: "rarity", q: "What does a Weighted tier quota actually limit, and when is it enforced?",
      a: "A quota is a <strong>mint budget</strong> — a cap on how many <em>copies</em> across the whole tier may ever be minted, not a cap on how many definitions carry that tier. Each definition gets exactly one tier and its own supply. Oversubscription is allowed: you can author more “Rare” definitions than the Rare budget can mint. The budget is drawn down and enforced <strong>only at mint</strong>, first-come, in one atomic transaction; it's frozen at collection go-live. The Live view shows budget · minted · remaining and a per-definition “mintable now”." },
    { aud: "creator", cat: "rarity", q: "Will my tiers change on their own?",
      a: "No. There's no silent background re-tiering. On <code>Draft → Review</code> only the transitioning token is auto-assigned; collection-wide redistribution happens only when you run an explicit <strong>Rebalance</strong>. A manual per-row override pins a token to a tier (and excludes it from rebalance) until you undo it, and is frozen as the token's <code>locked_tier</code> at go-live." },

    /* ===================== TOKEN SCORE (creator) ===================== */
    { aud: "creator", cat: "score", q: "How is a token's score calculated?",
      a: "<code>final_score = attribute_score × layer_multiplier</code>. The attribute score comes from the numbers you mapped to attributes, combined by the collection's method (Add Values / Multiply / Highest). The layer multiplier scales by generator-layer weighting authored on the Layer Multipliers tab (it's 1.0 when no generator is linked). Adding more tokens never changes an existing token's score unless that token's own inputs changed." },
    { aud: "creator", cat: "score", q: "Is score the same as rank?",
      a: "No. <strong>Score Rank</strong> is always computed within a single token type, never across the whole collection — a type with five scoring attributes would otherwise systematically outscore one with a single attribute. Multi-type collections get a token-type filter on the assignment/scoring tables, and the copy spells out the scope (“Score Rank is within Character · 312 tokens”)." },
    { aud: "creator", cat: "score", q: "What is a “stale score” and why does it block go-live?",
      a: "Every token is <code>fresh</code> or <code>stale_score</code>. A score goes stale when an input changes — composition or attribute values (while Draft), the value→number mapping, the layer-weight config, or the calculation method. The UI flags it, and a token <strong>can't move Review → Live while stale</strong> (or while a recompute runs), so live tokens always reflect their current inputs. A bulk Refresh all stale exists; it can partially fail and reports per-token results." },
    { aud: "creator", cat: "score", q: "Is the score always visible to collectors?",
      a: "No — score visibility is a separate per-collection setting, orthogonal to the rarity model." },

    /* ===================== VENDORS (creator) ===================== */
    { aud: "creator", cat: "vendors", q: "What is a vendor?",
      a: "A distribution mechanism — the configured “shop” that hands tokens to collectors, with its own storefront, lifecycle, inventory, costs, rules, and revenue. Its inventory is backed by <strong>minted</strong> tokens, not draft definitions." },
    { aud: "creator", cat: "vendors", q: "Are vendors per-collection or per-project?",
      a: "Vendors are <strong>project-scoped</strong>: a single vendor can distribute minted tokens from several of a project's collections. Revenue templates are project-level and claim defaults are collection-level. Each vendor settles and holds buyback proceeds from its own subaccount." },
    { aud: "creator", cat: "vendors", q: "What vendor types are there?",
      a: "<strong>Market</strong> vendors (sell specific tokens) launch first. <strong>Gacha</strong> and GachaRwa (randomized “mystery pull”) are designed but deferred and feature-gated off until a later release — so at launch, expect Market vendors only." },
    { aud: "creator", cat: "vendors", q: "How do Gacha vendors work?",
      a: "A claim returns a randomly selected reward from the vendor's prize pool. Two draw modes: <strong>uniform lucky dip</strong> (equal chance per available unit) or <strong>weighted</strong> (odds from <code>configured_weight × available_quantity</code>, so they shift as inventory changes). The full prize pool — including sold-out entries — is always visible, draws are deterministic and fully audited (replayable from the recorded seed inputs), with optional reveal moments. Not in the first launch.", wip: true },
    { aud: "creator", cat: "vendors", q: "How do I control who can claim, and how much?",
      a: "Vendors support claim costs (by tier), requirements (holdings, staking, allowlist — evaluated per tier), restrictions, and rewards, plus per-principal limits. Tier rules inherit from lower tiers where higher entries are missing, and allowlists come from your project whitelists." },
    { aud: "creator", cat: "vendors", q: "What is the vendor lifecycle?",
      a: "Two axes: a stage (Draft / Review / Live) and a runtime status (setup, running, paused, empty, ended, faulted). You can start, pause, resume, restart, or stop a vendor. There's no separate vendor approval gate — go-live validation happens per token at Review → Live. When a vendor stops, unclaimed inventory either <strong>returns</strong> to inventory or is <strong>burned</strong>, per its termination policy." },

    /* ===================== REVENUE (creator) ===================== */
    { aud: "creator", cat: "revenue", q: "How does revenue work?",
      a: "Through <strong>Revenue Presets</strong> — named, project-level split templates authored in <em>Project → Revenue presets</em>. A vendor <strong>must select a Live preset</strong> at creation, which copies the values onto the vendor as a snapshot; editing the preset later doesn't change vendors already using it. Claim presets ship first; Sale presets are a future tab." },
    { aud: "creator", cat: "revenue", q: "What's in a revenue split?",
      a: "Fees off the top — <strong>Project / cycles funding</strong> (required, ~1–10%, funds your project canister) and an optional <strong>Toko contribution</strong> (0–10%) — plus optional <strong>royalties</strong> to your <strong>beneficiaries</strong>. Per-royalty cap ~10%, total royalties ≤ ~20%, and non-project allocations ≤ ~40%. Only <strong>Live beneficiaries</strong> can receive royalties; to pay yourself, add yourself as a beneficiary. (Percentages are current design values.)" },
    { aud: "creator", cat: "revenue", q: "Can royalties change over time?",
      a: "Yes. Each royalty runs <strong>Forever</strong> or for a <strong>fixed period</strong> (1/3/6/9/12/24 months) with a <strong>taper</strong> — No taper, Cliff, Linear, or Curve — that changes the effective percent across the period. The taper clock starts when the vendor first goes Running." },
    { aud: "creator", cat: "revenue", q: "What is a buyback?",
      a: "An offer from a vendor to buy a token back, configured at the <strong>vendor</strong> level (not in the revenue preset) — a vendor percentage in roughly the 1–20% range over a set duration. It runs through the same shared offer system as marketplace offers, and proceeds are held in the vendor subaccount until release." }
  ]
};
