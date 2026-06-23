# page-footer/

The illustration that anchors the bottom of marketing and browse pages — a wide tile of small bots and tools that fades into the page background.

## Files

| File                  | Format | Use                                                                |
| --------------------- | ------ | ------------------------------------------------------------------ |
| `Rectangle 1175.svg`  | SVG    | Canonical asset. Crisp at any width.                               |
| `Rectangle 1175.png`  | PNG    | 1728 × 307 raster fallback at the design resolution.               |

The asset is one wrapped group with `opacity: 0.6` and a built-in white-to-transparent linear gradient on top of the pattern fill, so the top edge already eases into a white surface without an extra wrapper.

## How to use

```html
<img class="page-footer" src="page-footer/Rectangle 1175.svg" alt="" />
```

```css
.page-footer {
  display: block;
  width: 100%;
  height: auto;
  margin-top: auto;
  pointer-events: none;
  user-select: none;
}
:root[data-theme="dark"] .page-footer {
  filter: invert(1);
}
```

The dark-mode `filter: invert(1)` flips the white-fade into a black-fade, so the asset eases into the dark page background the same way it does on light.

## Rules

- **Decorative only.** Never place functional UI inside or on top of the footer.
- **Sparingly.** Long marketing or browse pages only — not modals, drawers, or transactional flows.
- **Don't crop.** It's designed at 1728 × 307 and reads best at full page width.
- **Don't tint.** The grey is intentional — coloured variants risk competing with token art above.
