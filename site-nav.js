/* ============================================================================
   Toko — shared top nav
   ----------------------------------------------------------------------------
   Include on any page with:   <script src="site-nav.js"></script>
   (from a sub-folder like html-mockups/ or style-guide/, use ../site-nav.js)

   Injects the dark top bar (logo + Mockups / Learn / Style guide / Glossary / FAQ) at the top of
   <body>, working out relative paths from the page's depth and highlighting the
   current section. Single source of truth — edit the bar here, once.
   ============================================================================ */
(function () {
  var path = location.pathname.replace(/\\/g, "/");
  var inSub = /\/(html-mockups|style-guide)\//.test(path);
  var p = inSub ? "../" : "";

  var isMockups = /index\.html$/.test(path) || /\/html-mockups\//.test(path) || /\/$/.test(path);
  var isGuide   = /styleguide\.html$/.test(path);
  var isFaq     = /faq\.html$/.test(path);
  var isGloss   = /glossary\.html$/.test(path);
  var isLearn   = /\/learn(\.html|-|$)/.test(path);

  var css =
    '.site-nav{background:#0A0A0A;color:#fff;padding:1rem 2rem;display:flex;align-items:center;gap:.75rem;font-family:"Mona Sans",system-ui,sans-serif;position:relative;z-index:50;}' +
    '.site-nav .brand{display:flex;align-items:center;gap:.75rem;}' +
    '.site-nav img.face{height:30px;width:auto;}' +
    '.site-nav img.word{height:15px;width:auto;}' +
    '.site-nav .links{margin-left:auto;display:flex;gap:1.25rem;font-weight:700;font-size:.8125rem;}' +
    '.site-nav .links a{color:#cfcfcf;text-decoration:none;}' +
    '.site-nav .links a:hover,.site-nav .links a.here{color:#fff;}' +
    '@media (max-width:680px){.site-nav{padding:.85rem 1.1rem;}.site-nav .links{gap:.9rem;}}';
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function here(c) { return c ? ' class="here"' : ''; }
  var html =
    '<a class="brand" href="' + p + 'index.html">' +
      '<img class="face" src="' + p + 'style-guide/logos/2026-05 - face.svg" alt="" onerror="this.style.display=\'none\'">' +
      '<img class="word" src="' + p + 'style-guide/logos/app-name.png" alt="Toko" onerror="this.style.display=\'none\'">' +
    '</a>' +
    '<nav class="links">' +
      '<a href="' + p + 'index.html"' + here(isMockups) + '>Mockups</a>' +
      '<a href="' + p + 'learn.html"' + here(isLearn) + '>Learn</a>' +
      '<a href="' + p + 'style-guide/styleguide.html"' + here(isGuide) + '>Style guide</a>' +
      '<a href="' + p + 'html-mockups/glossary.html"' + here(isGloss) + '>Glossary</a>' +
      '<a href="' + p + 'html-mockups/faq.html"' + here(isFaq) + '>FAQ</a>' +  /* faq + glossary live in html-mockups/ (2026-07-03) */
    '</nav>';

  var bar = document.createElement("div");
  bar.className = "site-nav";
  bar.innerHTML = html;

  function mount() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
