# logos/

The Toko brandmark. The logo is composed of two files used together — there is no single "full lockup" file. Always pair them as character + wordmark.

## Files

| File                        | Format | Use on  | Notes                                                                                            |
| --------------------------- | ------ | ------- | ------------------------------------------------------------------------------------------------ |
| `2026-05 - face.svg`        | SVG    | Either  | **Preferred character file.** Vector — use anywhere SVG renders cleanly (web, app UI, modern email, Figma exports). Scales to any size; set only `height` *or* `width`, never both. Renders the same on light and dark surfaces; never recolor it. |
| `2026-05 - face.png`        | PNG    | Either  | Raster fallback of the same character artwork. Use only when SVG isn't supported (e.g. older email clients, OG/social preview images, contexts that need a fixed-pixel raster). |
| `app-name.png`              | PNG    | Dark    | The "TOKO" wordmark. Ships as white — use as-is on dark surfaces.                                |
| `app-name.png` + CSS filter | PNG    | Light   | Same file, with `filter: brightness(0)` applied to flip the wordmark to black on light surfaces. |

**Picking SVG vs PNG for the character:** default to the SVG. Only reach for the PNG when the rendering surface can't handle SVG, or when you specifically need a fixed-pixel raster (social cards, certain email clients).

The `.ai` file alongside the SVG/PNG is the editable source and is not used directly in production.

## Picking the right variant

- **Full lockup (preferred):** character + wordmark side by side. Use this anywhere the brand needs to be established — site header, marketing hero, splash, README.
- **Character only** (`2026-05 - face.svg`, or `2026-05 - face.png` where SVG isn't supported): favicons, app icons, profile avatar fallbacks, compact navigation bars, anywhere the wordmark would be illegible or redundant.
- **Wordmark only** (`app-name.png`): rare — only where the character is already established immediately adjacent.

## Rules

- **Pair colour to surface using a CSS filter on the wordmark.** The wordmark ships as white; apply `filter: brightness(0)` for light surfaces. The character file is the same on both surfaces and is never filtered.
- **Minimum clear-space** is the height of the "T" on every side of the lockup.
- **Never recolour the character.** If you need a different treatment, raise it as a brand exception first.
- **Gap between character and wordmark** is roughly the height of the "T" — slightly tighter at small sizes is acceptable.

## Adding a new logo file

If a marketing or partner variant is genuinely required, add the file here with a descriptive lowercase, hyphen-separated filename (e.g. `partner-lockup-horizontal.png`) and document it in the table above so future contributors know which file to reach for.
