# FixKar.pk — Visual Assets Reference

> **Document Type:** Map of every illustration/visual component, where it's
> used, and how to replace it with real artwork later.
> **Status:** LIVE — reflects the visual enhancement pass (2026-09-28).
> **Constraint this phase was built under:** no image-generation tool was
> available in this session, so every visual below is a coded SVG
> component (`components/illustrations/*.tsx`) — not a photo, not an
> AI-generated illustration, not a stock asset. See §4 for how to swap in
> real artwork later without touching call sites.

---

## 1. Component → usage map

| Component | Used on | Purpose |
|---|---|---|
| `HeroIllustration` | `/` hero (desktop, `lg:` and up only) | Home + orbiting service badges (AC, electrical, plumbing, cleaning, painting) |
| `ServicesHeroIllustration` | `/services` hero (desktop only) | Hub-and-spoke composition — related to the homepage hero (same primitives) but a distinct arrangement, avoiding an exact duplicate per the brief |
| `CategoryIllustration` | `CategoryCard` (used on `/`, `/services`) | Accent-colored blob + centered category icon, one per taxonomy group (11 total, differentiated by `accent.blob`/`accent.text`/`icon` in `lib/serviceTaxonomy.ts`) |
| `HowItWorksIllustration` | `/` "How FixKar Works" (3 steps) | Small scene per step: `request` (form + check), `match` (two connected people), `pay` (invoice + checkmark) |
| `PathwayIllustration` | `/` Home/Business split + Projects preview; `/services` Business/Projects cards | 3 variants: `home` (house + person), `business` (office building + person), `projects` (renovation scene: wall, ladder, roller) |
| `PakistanIllustration` | `/` Cities section (desktop only) | Abstract scattered location-pin pattern in brand colors — deliberately not a literal map/flag (see inline code comment for reasoning) |
| `CTAIllustration` | `/` final CTA | Small technician + toolbox scene, kept simple so it doesn't compete with the CTA |
| `primitives.tsx` (`HouseShape`, `PersonShape`, `ToolBadge`, `BlobBackground`) | Shared by all of the above | The actual "illustration language" — every scene composes from these same few shapes, which is what makes them read as one family instead of unrelated graphics |

## 2. Design rationale

- **All inline SVG, zero image requests.** Every illustration above costs
  nothing extra over the page's own HTML — no separate network request, no
  layout shift, no image-optimization pipeline needed. This was the only
  way to satisfy the brief's performance requirements while also having
  zero image-generation capability available.
- **One shared vocabulary.** `HouseShape` and `PersonShape` are reused
  verbatim (just recolored) across the hero, pathway, and CTA
  illustrations — this is what makes them feel like one FixKar visual
  system rather than disconnected graphics, per the brief's explicit "one
  coherent illustration family" requirement.
- **Brand colors only.** Every fill/stroke is either a CSS variable
  (`var(--color-primary)` etc.) or one of the 11 category accent colors
  already defined in `lib/serviceTaxonomy.ts` — nothing hardcodes a color
  outside the established design system.
- **Abstract over literal.** `PakistanIllustration` deliberately avoids a
  literal map outline or flag imagery — both to avoid overclaiming precise
  geographic coverage (the brief's own instruction) and to sidestep
  political-symbol sensitivity around flag colors/iconography.

## 3. Category → icon/color reference

See `lib/serviceTaxonomy.ts` for the authoritative mapping (11 groups,
each with `icon` + `accent.{bg,border,text,iconBg,blob}`). Do not duplicate
this mapping elsewhere — `CategoryIllustration` and `CategoryCard` both
read from it directly.

## 4. Replacing a coded illustration with real artwork

1. Produce the asset per `public/images/illustrations/README.md`'s naming
   convention, save it in the matching subfolder.
2. At the call site (e.g. `app/page.tsx`'s hero), replace
   `<HeroIllustration className="..." />` with a `next/image` `<Image>`
   pointing at the new file, keeping the same wrapping `className`/sizing.
3. Write real `alt` text describing the scene (each coded component
   already has an `aria-label` you can adapt).
4. Delete the now-unused coded component only if nothing else references
   it — `CategoryIllustration` in particular is reused across `/` and
   `/services`, so check both before removing.

No other component needs to change — this is the entire point of keeping
illustrations as isolated, swappable components rather than inlining SVG
markup directly into page files.

## 5. Known gaps for a future real-artwork pass

- All 11 category illustrations are currently the same blob+icon template
  with only color/icon swapped — genuinely distinct per-category scenes
  (a technician servicing a specific appliance, per the brief's original
  vision) require real illustration and weren't achievable without an
  image-generation tool this phase.
- No location-specific visuals exist (the `locations/` folder is empty) —
  `PakistanIllustration` is the only location-related visual today.
