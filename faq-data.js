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
     a    : answer — a template literal (`...`) of simple HTML: <p>, <ul>/<li>,
            <strong>, <a>. Each item object MUST end with a comma.
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
    {
      aud: "both",
      cat: "about",
      q: "What is Toko?",
      a: `
        <p>
          Toko is a digital asset platform built on the Internet Computer.
        </p>
        <p>
          It gives creators the tools to create, launch, manage, and trade digital collectibles from one place.
        </p>
        <p>
          Toko includes a <strong>Generator</strong> for layered artwork, a <strong>Wallet</strong> for holding assets,
          a <strong>Launchpad</strong> for new drops, and a <strong>Marketplace</strong> for peer-to-peer trading.
        </p>
      `
    },
    {
      aud: "both",
      cat: "about",
      q: "How is Toko structured — Project, Collection, Vendor?",
      a: `
        <p>
          Toko is organized into three main layers:
        </p>
        <p>
          <strong>Project</strong><br>
          The top-level creator workspace. This is where teams manage media, whitelists, beneficiaries, and vendors.
        </p>
        <p>
          <strong>Collection</strong><br>
          The rule layer for a specific set of tokens. It defines things like attributes, rarity, supply, and token policy.
        </p>
        <p>
          <strong>Vendor</strong><br>
          The distribution layer. A vendor acts like a stall where tokens can be sold, claimed, or distributed.
        </p>
        <p>
          The <strong>Generator</strong> sits alongside the collection. It handles the artwork, while the collection controls the rules.
        </p>
      `
    },
    {
      aud: "both",
      cat: "about",
      q: "Do I need to sign in?",
      a: `
        <p>
          You can browse public areas like the Launchpad and collection pages without signing in.
        </p>
        <p>
          To use wallet features such as <strong>My Tokens</strong>, you need to sign in with your Internet Computer identity.
        </p>
        <p>
          Once signed in, Toko checks ownership against your principal, so your tokens are linked directly to your identity.
        </p>
      `
    },

    /* ===================== WALLET (collector) ===================== */
    {
      aud: "collector",
      cat: "wallet",
      q: "Where do I see what I own?",
      a: `
        <p>
          Open <strong>My Tokens</strong> from the authenticated sidebar to view everything owned by your account.
        </p>
        <p>
          You'll see your NFTs, fungible token balances (ICRC1 and NNS), and your recent transaction history all in one place.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "What can I do with a token I own?",
      a: `
        <p>
          You can currently:
        </p>
        <ul>
          <li><strong>Transfer</strong> a token to another principal.</li>
          <li><strong>Burn</strong> a token permanently.</li>
        </ul>
        <p>
          Both actions require confirmation before they are processed.
        </p>
        <p>
          Additional features such as marketplace listings, auctions, token splitting, merging, and other advanced operations are planned for future releases.
        </p>
      `,
      wip: true
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "Is burning reversible?",
      a: `
        <p>
          No. Burning a token is permanent and cannot be undone.
        </p>
        <p>
          The token is removed from circulation, while a historical record of the burn remains on the ledger to preserve provenance and supply tracking.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "What are the balances in my wallet?",
      a: `
        <p>
          Your wallet displays the fungible tokens associated with your account, including ICRC1 and NNS balances.
        </p>
        <p>
          Each balance shows the token name, symbol, and current amount held.
        </p>
        <p>
          In the current release, balances are <strong>view-only</strong>. Sending, swapping, and other fungible token operations are not yet available.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "What's in the transaction history?",
      a: `
        <p>
          Transaction history provides a record of recent activity across your NFTs and fungible tokens.
        </p>
        <p>
          Each entry may include:
        </p>
        <ul>
          <li>Transaction type (received, sent, minted, burned)</li>
          <li>Amount or token involved</li>
          <li>Sender and recipient principals</li>
          <li>Timestamp</li>
          <li>Transaction reference, where available</li>
        </ul>
        <p>
          You can view all activity together or filter by asset type.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "I just claimed a token — when does it appear?",
      a: `
        <p>
          Claimed tokens usually appear in <strong>My Tokens</strong> shortly after the claim is confirmed.
        </p>
        <p>
          If you don't see the token immediately, refresh the page. Some areas of Toko may also update automatically when ownership changes.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "wallet",
      q: "Why might an action be blocked?",
      a: `
        <p>
          Before processing a transfer, burn, or other wallet action, Toko verifies that the token is still in a valid state.
        </p>
        <p>
          An action may be blocked if:
        </p>
        <ul>
          <li>Ownership has changed.</li>
          <li>The token's status has changed.</li>
          <li>The token is temporarily locked.</li>
          <li>The token is listed for sale and cannot be transferred or burned.</li>
        </ul>
        <p>
          If this happens, refresh the page and try again.
        </p>
      `
    },

    /* ===================== BUYING / LAUNCHPAD (collector) ===================== */
    {
      aud: "collector",
      cat: "launchpad",
      q: "What is the Launchpad?",
      a: `
        <p>
          The Launchpad is where you discover and claim new drops on Toko.
        </p>
        <p>
          The default view is a gallery of all live vendor drops, alongside a Coming Soon rail and a Recently Ended rail.
        </p>
        <p>
          It's designed to feel editorial and collectible-first, rather than a dense trading interface.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "launchpad",
      q: "What do the labels mean (Live, Coming soon, Ending soon, Sold out, Ended)?",
      a: `
        <p>
          Each label reflects a vendor's real state:
        </p>
        <ul>
          <li><strong>Coming soon</strong> — scheduled, before its start time.</li>
          <li><strong>Live</strong> — running and claimable now.</li>
          <li><strong>Ending soon</strong> — running with roughly two hours or less remaining.</li>
          <li><strong>Sold out</strong> — inventory is exhausted.</li>
          <li><strong>Ended</strong> — finished, and shown only for a short retention window afterwards.</li>
        </ul>
        <p>
          Paused and faulted vendors are hidden from the Launchpad.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "launchpad",
      q: "How do I claim a token?",
      a: `
        <p>
          Open a vendor's Launchpad detail page and, if the drop is live and you're eligible, the button reads <strong>Claim now</strong>.
        </p>
        <p>
          Claiming is explicit: you'll see your wallet and payment context before confirming, and inventory is consumed atomically.
        </p>
        <p>
          If you don't meet the drop's requirements, the button reads <strong>View requirements</strong> instead.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "launchpad",
      q: "Why can't I claim — what are \"requirements\"?",
      a: `
        <p>
          Creators can attach conditions to a drop, such as:
        </p>
        <ul>
          <li>Holding a particular token</li>
          <li>Staking</li>
          <li>Being on an allowlist</li>
          <li>A per-person claim limit</li>
        </ul>
        <p>
          If you don't meet them, you'll see View requirements rather than Claim. Eligibility is always re-checked at the moment you claim.
        </p>
      `
    },
    {
      aud: "collector",
      cat: "launchpad",
      q: "What ranking and discovery sections exist?",
      a: `
        <p>
          Live vendors, Coming Soon, and Recently Ended are available today.
        </p>
        <p>
          Featured, Trending, Newest, and Recently Claimed are planned, but the curation tooling behind them isn't built yet.
        </p>
      `,
      wip: true
    },

    /* ===================== TRADING / MARKETPLACE (collector, wip) ===================== */
    {
      aud: "collector",
      cat: "marketplace",
      q: "What is the Marketplace?",
      a: `
        <p>
          The Marketplace is where collectors buy, sell, and trade tokens after they have been minted.
        </p>
        <p>
          It provides a transparent view of listings, pricing, ownership history, and trading activity across supported collections.
        </p>
        <p>
          Whether you're looking to expand your collection or sell a token you already own, the Marketplace is the place to do it.
        </p>
      `,
      wip: true
    },
    {
      aud: "collector",
      cat: "marketplace",
      q: "Is it custodial — do I hand over my token to list it?",
      a: `
        <p>
          No. Toko's Marketplace is <strong>non-custodial</strong>.
        </p>
        <p>
          Your token remains in your wallet while it is listed for sale. Toko never takes ownership of your asset.
        </p>
        <p>
          While a listing is active, the token is temporarily locked to prevent transfers, burns, or other conflicting actions.
        </p>
        <p>
          If you cancel the listing, the token becomes fully available again.
        </p>
      `,
      wip: true
    },
    {
      aud: "collector",
      cat: "marketplace",
      q: "What selling formats are planned?",
      a: `
        <p>
          Toko is designed to support multiple ways to buy and sell tokens.
        </p>
        <ul>
          <li><strong>Buy Now</strong> — Purchase immediately at a fixed price.</li>
          <li><strong>Auctions</strong> — Competitive bidding with configurable rules.</li>
          <li><strong>Offers</strong> — Negotiate directly with collectors through offers and counter-offers.</li>
        </ul>
        <p>
          Vendor buybacks are also planned and will use the same offer system.
        </p>
        <p>
          These features are still under development and may change before release.
        </p>
      `,
      wip: true
    },
    {
      aud: "collector",
      cat: "marketplace",
      q: "How is this different from the Launchpad?",
      a: `
        <p>
          The <strong>Launchpad</strong> is where new tokens are first distributed through drops and claims.
        </p>
        <p>
          The <strong>Marketplace</strong> is where collectors trade tokens that are already in circulation.
        </p>
        <p>
          The <strong>Collection Hub</strong> provides information about a collection and links to its Launchpad activity and Marketplace listings.
        </p>
        <p>
          In short: Launchpad for new drops, Marketplace for trading, Collection Hub for discovery and context.
        </p>
      `,
      wip: true
    },

    /* ===================== GENERATOR (creator) ===================== */
    {
      aud: "creator",
      cat: "generator",
      q: "What is the Generator for?",
      a: `
        <p>
          The Generator helps you create large collections of unique artwork from layered assets.
        </p>
        <p>
          Upload and organize layers such as backgrounds, bodies, clothing, and accessories, then define how those parts can appear together.
        </p>
        <p>
          Once configured, the Generator assembles unique tokens automatically. You can review the results, pin your favourites, and export them directly into a collection.
        </p>
        <p>
          The Generator is responsible for creating artwork. Collection settings such as rarity and distribution are managed separately.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "generator",
      q: "What does deterministic generation mean?",
      a: `
        <p>
          Deterministic generation means the same inputs always produce the same results.
        </p>
        <p>
          If you generate a batch using the same configuration, seed, and source data, Toko will recreate the exact same tokens every time.
        </p>
        <p>
          Every export includes a locked snapshot of the settings used to create it, making collections easy to audit, verify, and reproduce in the future.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "generator",
      q: "How does weighting work? Is weighting the same as rarity?",
      a: `
        <p>
          No. Weighting and rarity are intentionally separate concepts.
        </p>
        <p>
          <strong>Weighting</strong> controls how often a part appears during generation. For example, a hat with a higher weight is more likely to be selected than a hat with a lower weight.
        </p>
        <p>
          <strong>Rarity</strong> is defined at the collection level and determines how uncommon a finished token is considered to be.
        </p>
        <p>
          Toko includes simple weighting presets ranging from Very Infrequent to Very Frequent, or you can provide custom values for finer control.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "generator",
      q: "What can the Generator create?",
      a: `
        <p>
          The Generator supports several creation workflows:
        </p>
        <ul>
          <li>Create a full batch of unique tokens.</li>
          <li>Generate a single token for testing.</li>
          <li>Create tokens from a CSV file using predefined values.</li>
        </ul>
        <p>
          During generation, Toko selects parts from each layer, applies weighting rules, checks compatibility requirements, and ensures every generated token is unique.
        </p>
        <p>
          Invalid combinations are automatically rejected until the desired number of valid tokens has been produced.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "generator",
      q: "How do tokens move from the Generator into a collection?",
      a: `
        <p>
          Tokens are added to collections through the Generator's export process.
        </p>
        <p>
          After generating artwork, review the results, pin the tokens you want to keep, and export them directly into a collection.
        </p>
        <p>
          Exported tokens arrive as <strong>Draft</strong> items with their generation history and composition data attached.
        </p>
        <p>
          Each collection is linked to a single Generator source, ensuring provenance remains clear and consistent throughout the collection's lifecycle.
        </p>
      `
    },

    /* ===================== COLLECTIONS (creator) ===================== */
    {
      aud: "creator",
      cat: "collections",
      q: "What are the collection stages?",
      a: `
        <p>
          Collections move through three stages:
        </p>
        <ul>
          <li><strong>Draft</strong> — Build and configure your collection. Everything remains editable.</li>
          <li><strong>Review</strong> — Make the collection publicly viewable while continuing to refine it.</li>
          <li><strong>Live</strong> — Publish the collection and lock its core rules.</li>
        </ul>
        <p>
          A token can only be made <strong>Live</strong> after its collection has reached the <strong>Live</strong> stage.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "collections",
      q: "What changes when a collection goes Live?",
      a: `
        <p>
          Going <strong>Live</strong> permanently locks the collection's core policies and supply rules.
        </p>
        <p>
          This includes settings such as:
        </p>
        <ul>
          <li>Maximum supply</li>
          <li>Rarity configuration</li>
          <li>Attribute definitions</li>
          <li>Supply limits and distribution rules</li>
          <li>Guardian settings</li>
        </ul>
        <p>
          Visual content such as descriptions, thumbnails, and banners can still be updated after launch.
        </p>
        <p>
          New token definitions can also be added later, but they must operate within the collection rules that were locked when the collection went live.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "collections",
      q: "What is the Guardian?",
      a: `
        <p>
          The <strong>Guardian</strong> defines the promises your collection makes to collectors.
        </p>
        <p>
          These settings determine whether tokens can be duplicated, destroyed, transferred, or sold under specific conditions.
        </p>
        <p>
          Once a collection goes <strong>Live</strong>, Guardian settings are locked so collectors can rely on those guarantees.
        </p>
        <p>
          Some Guardian rules are currently informational while full backend enforcement continues to be developed.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "collections",
      q: "How do supply and issue numbers work?",
      a: `
        <p>
          Collections can define limits on total supply, the number of unique token definitions, and the number of copies that can exist for each token.
        </p>
        <p>
          Each token definition receives a permanent <strong>issue number</strong> when it moves from <strong>Review</strong> to <strong>Live</strong>.
        </p>
        <p>
          Issue numbers are assigned once, never change, and are never reused.
        </p>
        <p>
          Individual copies also receive their own immutable copy identifier, allowing collectors to distinguish between multiple copies of the same token.
        </p>
        <p>
          Creators can choose whether issue and copy numbers are displayed to collectors.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "collections",
      q: "Can I delete a collection?",
      a: `
        <p>
          Yes, but only if no tokens have been minted from the collection.
        </p>
        <p>
          Once a token has been minted, the collection becomes part of the permanent record and can no longer be deleted.
        </p>
        <p>
          Deleting a collection always requires confirmation before the action is completed.
        </p>
      `
    },

    /* ===================== ATTRIBUTES (creator) ===================== */
    {
      aud: "creator",
      cat: "attributes",
      q: "What are attributes, token types, and traits?",
      a: `
        <p>
          Attributes are the properties a token can have. They're defined at the <strong>collection</strong> level, not in the Generator.
        </p>
        <p>
          A <strong>token type</strong> groups tokens that share the same set of attributes, and traits are the specific values those attributes take.
        </p>
        <p>
          Artwork composition from the Generator is treated as evidence that the attribute system can map into attribute values — the Generator never stores attributes directly.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "attributes",
      q: "How do attributes become a token's score?",
      a: `
        <p>
          On the Attributes page you assign numeric values to attribute options, then choose how they combine.
        </p>
        <p>
          Three calculation methods are available: <strong>Add Values</strong>, <strong>Multiply</strong>, and <strong>Highest</strong>.
        </p>
        <p>
          Unmapped values are simply skipped — they aren't counted as zero unless you explicitly map them to zero. The result becomes the token's attribute score, which feeds its overall score.
        </p>
      `
    },

    /* ===================== RARITY (creator) ===================== */
    {
      aud: "creator",
      cat: "rarity",
      q: "What rarity models are there?",
      a: `
        <p>
          Rarity is set at the collection level, and every collection starts in <strong>Uniform</strong>.
        </p>
        <ul>
          <li><strong>Uniform</strong> — every token is treated as equal.</li>
          <li><strong>Tiered</strong> — you define your own tiers and assign them by hand; the system shows score guidance but never picks for you.</li>
          <li><strong>Weighted</strong> — Toko's fixed official tiers (Common, Uncommon, Rare, with Epic and Legendary unlockable), assigned automatically by score.</li>
        </ul>
        <p>
          Switching models requires confirmation and resets any rarity assignments you'd made. For a full walkthrough, see the <a href="learn-rarity.html">Rarity article</a>.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "rarity",
      q: "How is the Weighted distribution decided?",
      a: `
        <p>
          You shape the curve with two dials, and Toko computes the per-tier quotas over your Max Supply:
        </p>
        <ul>
          <li><strong>Ratio</strong> — how much scarcer each rarer tier is than the one below it.</li>
          <li><strong>Accelerator</strong> — how steeply the curve bends toward the rarest tiers.</li>
        </ul>
        <p>
          The defaults (Max Supply 1,000, ratio 3, accelerator 1.0) produce roughly 69% Common, 23% Uncommon, and 8% Rare.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "rarity",
      q: "What does a Weighted tier quota actually limit?",
      a: `
        <p>
          A tier's quota is a <strong>mint budget</strong> — a cap on how many copies across that whole tier can ever be minted.
        </p>
        <p>
          It is not a cap on how many token definitions can carry the tier. You can author more "Rare" definitions than the Rare budget allows.
        </p>
        <p>
          The budget is enforced only at mint, first-come, and it's frozen when the collection goes Live.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "rarity",
      q: "Will my tiers change on their own?",
      a: `
        <p>
          No. Toko never re-tiers tokens silently in the background.
        </p>
        <p>
          A collection-wide redistribution only happens when you run an explicit <strong>Rebalance</strong>.
        </p>
        <p>
          You can also override any token's tier by hand; an overridden token is excluded from rebalances until you undo it, and its tier locks permanently when the collection goes Live.
        </p>
      `
    },

    /* ===================== TOKEN SCORE (creator) ===================== */
    {
      aud: "creator",
      cat: "score",
      q: "How is a token's score calculated?",
      a: `
        <p>
          A token's final score is its attribute score multiplied by a layer multiplier.
        </p>
        <p>
          The attribute score comes from the numbers you map onto attributes, combined using Add Values, Multiply, or Highest.
        </p>
        <p>
          The layer multiplier scales the result based on generator-layer weighting. When no generator is linked it's 1.0, so the final score simply equals the attribute score. For a full breakdown, see the <a href="learn-score.html">Token score article</a>.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "score",
      q: "Is score the same as rank?",
      a: `
        <p>
          No. Score is a number; rank is a token's position relative to others.
        </p>
        <p>
          Rank is always calculated <strong>within a single token type</strong>, never across the whole collection — otherwise types with more scoring attributes would dominate the top tiers.
        </p>
        <p>
          The interface always shows the scope, for example "Score Rank is within Character · 312 tokens".
        </p>
      `
    },
    {
      aud: "creator",
      cat: "score",
      q: "What is a \"stale score\"?",
      a: `
        <p>
          A score is "stale" when something that feeds it has changed and it hasn't been recalculated yet.
        </p>
        <p>
          Triggers include editing composition or attribute values, changing the value mapping, adjusting layer weights, or switching the calculation method.
        </p>
        <p>
          A token can't move from <strong>Review</strong> to <strong>Live</strong> while its score is stale, so live tokens always reflect their current inputs. A bulk refresh recomputes all stale scores at once.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "score",
      q: "Is the score always visible to collectors?",
      a: `
        <p>
          No. Whether a token's score is shown to collectors is a separate, per-collection setting, independent of the rarity model.
        </p>
      `
    },

    /* ===================== VENDORS (creator) ===================== */
    {
      aud: "creator",
      cat: "vendors",
      q: "What is a vendor?",
      a: `
        <p>
          A vendor is a distribution mechanism — the configured "shop" that hands tokens to collectors.
        </p>
        <p>
          Each vendor has its own storefront, lifecycle, inventory, costs, rules, and revenue settings.
        </p>
        <p>
          A vendor's inventory is backed by minted tokens, not draft definitions.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "vendors",
      q: "Are vendors per-collection or per-project?",
      a: `
        <p>
          Vendors are <strong>project-scoped</strong>. A single vendor can distribute minted tokens from several of a project's collections.
        </p>
        <p>
          Revenue templates are managed at the project level, while claim defaults are managed at the collection level.
        </p>
        <p>
          Each vendor settles payments — and holds any buyback proceeds — from its own account.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "vendors",
      q: "What vendor types are there?",
      a: `
        <p>
          <strong>Market</strong> vendors, which sell specific tokens, are available first.
        </p>
        <p>
          <strong>Gacha</strong> and <strong>GachaRwa</strong> vendors, which distribute randomized rewards, are designed but deferred to a later release.
        </p>
        <p>
          At launch, expect Market vendors only.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "vendors",
      q: "How do Gacha vendors work?",
      a: `
        <p>
          A claim returns a randomly selected reward from the vendor's prize pool.
        </p>
        <p>
          There are two draw modes: <strong>uniform lucky dip</strong> (equal chance per available unit) and <strong>weighted</strong> (odds based on configured weight and remaining quantity).
        </p>
        <p>
          The full prize pool — including sold-out entries — is always visible, and every draw is deterministic and fully auditable. Gacha is not part of the first launch.
        </p>
      `,
      wip: true
    },
    {
      aud: "creator",
      cat: "vendors",
      q: "How do I control who can claim, and how much?",
      a: `
        <p>
          Vendors support claim costs by tier, along with requirements, restrictions, and rewards.
        </p>
        <p>
          Requirements can include holdings, staking, or allowlist membership, and are evaluated per tier. Higher tiers inherit rules from lower tiers where they aren't set explicitly.
        </p>
        <p>
          Allowlists come from your project's whitelists, and you can also set per-person claim limits.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "vendors",
      q: "What is the vendor lifecycle?",
      a: `
        <p>
          A vendor has a stage (Draft, Review, Live) and a runtime status (setup, running, paused, empty, ended, faulted).
        </p>
        <p>
          You can start, pause, resume, restart, or stop a vendor. There's no separate vendor approval step — validation happens per token at Review to Live.
        </p>
        <p>
          When a vendor stops, any unclaimed inventory is either returned to inventory or burned, depending on its termination policy.
        </p>
      `
    },

    /* ===================== REVENUE (creator) ===================== */
    {
      aud: "creator",
      cat: "revenue",
      q: "How does revenue work?",
      a: `
        <p>
          Revenue is configured through <strong>Revenue Presets</strong> — named, project-level split templates created in Project &rarr; Revenue presets.
        </p>
        <p>
          When creating a vendor, you select a Live preset, and its values are copied onto the vendor as a snapshot.
        </p>
        <p>
          Editing a preset later doesn't change vendors that already use it. Claim presets are available first; Sale presets are a future addition.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "revenue",
      q: "What's in a revenue split?",
      a: `
        <p>
          A split takes fees off the top, then optional royalties:
        </p>
        <ul>
          <li><strong>Project / cycles funding</strong> — required, roughly 1–10%, which funds your project canister.</li>
          <li><strong>Toko contribution</strong> — optional, 0–10%.</li>
          <li><strong>Royalties</strong> — optional, paid to your beneficiaries.</li>
        </ul>
        <p>
          Individual royalties are capped around 10%, total royalties around 20%, and non-project allocations around 40%. Only Live beneficiaries can receive royalties — to pay yourself, add yourself as a beneficiary.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "revenue",
      q: "Can royalties change over time?",
      a: `
        <p>
          Yes. Each royalty can run <strong>Forever</strong> or for a <strong>fixed period</strong> (1, 3, 6, 9, 12, or 24 months).
        </p>
        <p>
          A fixed-period royalty uses a taper — No taper, Cliff, Linear, or Curve — that changes the effective percentage across the period.
        </p>
        <p>
          The taper clock starts when the vendor first goes Running.
        </p>
      `
    },
    {
      aud: "creator",
      cat: "revenue",
      q: "What is a buyback?",
      a: `
        <p>
          A buyback is an offer from a vendor to buy a token back from a collector.
        </p>
        <p>
          It's configured at the vendor level — not in the revenue preset — as a vendor percentage (roughly 1–20%) over a set duration.
        </p>
        <p>
          Buybacks run through the same shared offer system as the marketplace, and proceeds are held in the vendor's account until release.
        </p>
      `
    }

  ]
};
