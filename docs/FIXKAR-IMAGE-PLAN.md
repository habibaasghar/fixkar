# FixKar.pk — Hero / Parallax Image Plan

> Planning only — no images generated, no code/parallax wired yet. You
> generate the images from the prompts below, drop them in one folder, and
> tell me — I'll convert to WebP, compress, and wire them into the actual
> pages (same workflow as the 5 vendor before/after photos earlier).

## 1. Where images + parallax will actually go

| Location | Effect | Why |
|---|---|---|
| Homepage hero | Parallax background | First thing every visitor sees — biggest "generic vs premium" impact. |
| City hub pages (`/lahore`, `/islamabad`, `/gujranwala`) | Parallax background, one per city | This is what you asked for specifically — each city page gets its own recognizable, local background instead of the current plain white page. |
| 5 category pages without real vendor photos yet (`ac-repair`, `electrician`, `plumbing`, `painter`, `cleaning`) | Static banner image (**not** parallax) | Secondary priority — explained in §3. |
| Sofa/Carpet cluster (3 pages) | **No new image needed** | Already has 5 real vendor before/after photos live — those stay as the images there. Don't dilute real photos with AI ones on the same page type. |

Parallax is only on city pages + homepage — not on every category page. Doing
it everywhere would be repetitive and heavy; keeping it to 4 pages makes it
feel like a deliberate design moment instead of a template effect.

## 2. One important call I'm making — please override if you disagree

For the 5 category pages (AC repair, electrician, plumbing, painter,
cleaning), I did **not** write prompts for "a technician fixing an AC" as a
realistic full-scene photo. Reason: an AI-generated photo of a fake person
doing the job would sit right next to your actual trust claims ("CNIC
verified professionals," real before/after vendor photos on the sofa/carpet
pages) — if a customer clicks through and later realizes that "technician"
photo wasn't real, it undercuts the one thing the sofa/carpet page is
already doing right. So for these 5, I wrote **close-up hands/tools-only
prompts, no visible face** — same photographic style as the rest of the
site, but it's illustrating the *service*, not claiming to be a *specific
person*. If you'd rather skip these 5 entirely and wait for real vendor
photos (like sofa/carpet), that's a completely reasonable call too — just
say so and I'll drop them from scope.

## 3. Parallax implementation note (for later, not now)

When you're ready to wire these in, the background needs ~15-20% extra
height beyond the visible viewport so the parallax scroll motion doesn't
show empty edges — that's already factored into the dimensions below.
Actual effect will be a scroll-linked transform (not CSS
`background-attachment: fixed`, which doesn't work on iOS Safari), disabled
automatically on mobile and for users with reduced-motion settings. No code
for this yet — just flagging it so the images are generated at the right
size the first time.

## 4. How to hand images back to me

1. Generate each image using the prompt in the table below (ChatGPT/DALL-E,
   Gemini, Midjourney — any of them work, the prompts are written to be
   tool-agnostic).
2. Save it with the **exact filename** in the "Save As" column, into your
   Downloads folder (same as last time with the vendor photos) — whatever
   format the tool gives you (PNG/JPG) is fine, I'll convert it.
3. Tell me they're ready. I'll find them, convert to compressed WebP, and
   wire each one into its actual page.

## 5. Image table

**Priority P0 = what you explicitly asked for (homepage + 3 city parallax
images). Priority P1 = the 5 category banners from §2, optional/secondary.**

| # | Save As | Page / Location | Purpose | Dimensions | Pri | AI Prompt |
|---|---|---|---|---|---|---|
| 1 | `hero-homepage-raw.png` | Homepage hero background | Parallax hero | 2400×1350 (16:9) | P0 | Modern upscale Pakistani residential house exterior in a DHA-style neighborhood at dusk, warm interior lights glowing through the windows, contrasted against a deep blue evening sky, wide-angle architectural photography, soft golden and blue color grade, empty foreground driveway, no visible people, no text or watermark, no logos, photorealistic, high resolution, cinematic depth of field, 16:9 wide aspect ratio |
| 2 | `hero-city-lahore-raw.png` | `/lahore` hero background | Parallax hero | 2400×1350 (16:9) | P0 | Iconic Lahore skyline at golden hour featuring the Badshahi Mosque and Minar-e-Pakistan silhouettes against a warm orange and blue dusk sky, wide panoramic cityscape photography, soft haze, birds in the sky, no people in close-up, no text or watermark, no logos, photorealistic, cinematic wide-angle lens, high resolution, 16:9 aspect ratio |
| 3 | `hero-city-islamabad-raw.png` | `/islamabad` hero background | Parallax hero | 2400×1350 (16:9) | P0 | Faisal Mosque in Islamabad at sunset with the Margalla Hills in the background, dramatic warm and blue dusk sky, wide-angle panoramic architectural photography, soft atmospheric haze, no people in close-up, no text or watermark, no logos, photorealistic, cinematic lighting, high resolution, 16:9 aspect ratio |
| 4 | `hero-city-gujranwala-raw.png` | `/gujranwala` hero background | Parallax hero | 2400×1350 (16:9) | P0 | Traditional Punjabi cityscape of Gujranwala at dusk — a mix of narrow bazaar streets, brick buildings, and modern residential blocks, warm string lights and glowing shopfronts, wide-angle street photography, soft golden hour haze, no people in close-up focus, no text or watermark, no logos, photorealistic, cinematic wide-angle lens, high resolution, 16:9 aspect ratio |
| 5 | `hero-category-ac-repair-raw.png` | `/lahore/ac-repair` banner | Static banner | 1600×1200 (4:3) | P1 | Close-up photorealistic photo of a technician's hands servicing a split air conditioner indoor unit, holding a wrench and gas gauge, blurred cool blue-toned background, natural lighting, no visible face, no text or watermark, no logos, high detail, 4:3 aspect ratio, high resolution |
| 6 | `hero-category-electrician-raw.png` | `/lahore/electrician` banner | Static banner | 1600×1200 (4:3) | P1 | Close-up photorealistic photo of an electrician's hands working on a wall switchboard with wires and a screwdriver, warm indoor lighting, no visible face, no text or watermark, no logos, high detail, 4:3 aspect ratio, high resolution |
| 7 | `hero-category-plumbing-raw.png` | `/lahore/plumbing` banner | Static banner | 1600×1200 (4:3) | P1 | Close-up photorealistic photo of a plumber's hands fixing a leaking pipe under a sink with a wrench, water droplets visible, soft indoor lighting, no visible face, no text or watermark, no logos, high detail, 4:3 aspect ratio, high resolution |
| 8 | `hero-category-painter-raw.png` | `/lahore/painter` banner | Static banner | 1600×1200 (4:3) | P1 | Close-up photorealistic photo of a painter's hand rolling fresh white paint onto an interior wall with a paint roller, paint can and brush visible in soft focus foreground, warm natural lighting, no visible face, no text or watermark, no logos, high detail, 4:3 aspect ratio, high resolution |
| 9 | `hero-category-cleaning-raw.png` | `/lahore/cleaning` banner | Static banner | 1600×1200 (4:3) | P1 | Close-up photorealistic photo of hands wiping a clean kitchen countertop with a microfiber cloth and spray bottle, bright natural daylight, fresh and hygienic mood, no visible face, no text or watermark, no logos, high detail, 4:3 aspect ratio, high resolution |

## 6. What I'll do once you hand these back

1. Convert each to WebP, compressed to the site's existing target (≤150KB
   for full-width heroes, matching the standard already set for the
   sofa/carpet vendor photos).
2. Save into `public/images/hero/` (new folder) with clean final names —
   e.g. `hero-city-lahore.webp`.
3. Wire the homepage + 3 city pages with the parallax background component
   (built at that point, per §3).
4. Wire the 5 category banners (if you want P1 done) as a static image next
   to the page intro.
5. Write real `alt` text per image (already have a description for each
   from the prompt itself).

Start with just the 4 P0 images if you want to see the city-page effect
first before committing to the 5 category ones — that's a completely fine
way to split this into two drops.
