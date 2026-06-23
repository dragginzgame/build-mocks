# css/

The single stylesheet powering the entire style guide.

## Contents

- `styleguide.css` — design tokens, component styles, dark-theme overrides, and animation keyframes. Loaded by `styleguide.html` via a single `<link rel="stylesheet" href="css/styleguide.css">`.

## Conventions

The file is organised top-to-bottom in the order a reader would expect:

1. `@font-face` declarations (loading from `../fonts/`)
2. `:root` design tokens — surfaces, text, borders, lifecycle, health, notification, spacing, radius, elevation, typography
3. `:root[data-theme="dark"]` token overrides
4. `:root[data-theme="dark"]` component overrides
5. Reset and base
6. Layout primitives (shell, sidebar, brand hero)
7. Section atoms (eyebrows, ledes, canvases)
8. Component blocks, each prefixed with a comment banner

## Adding a new component

Add the rule near related components, then add a matching dark-theme override in the dark-overrides block at the top. Every new component must read correctly in both light and dark — verify before merging.

## Tokens

Use CSS custom properties from `:root` (`--text-primary`, `--surface-canvas`, `--r-2`, `--s-4`, etc.) instead of hard-coded values. Hard-coded values are only acceptable when the property genuinely doesn't have a token (one-off illustration colors, etc.) and a comment should explain why.

## Asset paths

Asset URLs in this file are relative to the file itself, so fonts live at `../fonts/...`. If you reference any other asset, follow the same `../<folder>/<file>` pattern.
