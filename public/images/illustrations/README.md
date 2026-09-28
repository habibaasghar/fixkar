# FixKar Illustration Assets

This folder is the future home for real illustration/photography assets.
As of this phase, **no files exist here** — every visual currently on the
site is a coded SVG component (`components/illustrations/*.tsx`), not a raster
image. See `docs/UI_DESIGN_SYSTEM.md` §6 and `docs/VISUAL_ASSETS.md` for why.

## Folder convention

```
public/images/illustrations/
  homepage/     — hero + section visuals used only on /
  services/     — hero + section visuals used only on /services
  categories/   — per-category illustrations (AC, electrical, plumbing, ...)
  business/     — business/commercial pathway visuals
  projects/     — projects/renovation pathway visuals
  locations/    — city/location-section visuals
```

## Naming convention

`{category-or-section-slug}-{variant}.webp`

Examples:
- `homepage/fixkar-home-services-hero.webp`
- `categories/ac-cooling.webp`
- `categories/electrical.webp`
- `business/business-services-hero.webp`
- `projects/renovation-scene.webp`

Prefer WebP (or AVIF where supported); keep each file under ~150KB after
compression. Always pair with meaningful `alt` text at the call site — see
existing coded illustrations for the `aria-label`/`alt` pattern already in
use (`role="img"` + `aria-label` on inline SVGs today).

## Swapping a coded illustration for a real asset

Each coded illustration has a single call site (or a small, known set of
call sites) — see `docs/VISUAL_ASSETS.md` for the current map of which
component renders where. Replace the component usage with a `next/image`
`<Image>` pointing here; no other code needs to change.
