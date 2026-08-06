// Idempotent seed — safe to run multiple times (uses upserts on unique slugs).
// Populates the geo + catalog tables the backend validates against, so vendor
// registration / lead creation don't fail with "Invalid city/category".
// Run with:  npm run db:seed   (loads .env.local via node --env-file)
//
// Data mirrors web/lib/services.ts (the frontend's static city/category list),
// kept explicit here so the seed has no TS-build dependency.

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Load .env.local (Next's file) so DATABASE_URL is available when run directly.
try {
  process.loadEnvFile(".env.local");
} catch {
  // env provided by the platform (CI / Vercel)
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const cities = [
  { slug: "lahore", name: "Lahore", status: "ACTIVE", areas: ["DHA", "Gulberg", "Bahria Town", "Johar Town", "Model Town", "Cantt", "Faisal Town", "Garden Town", "Iqbal Town", "Valencia"] },
  { slug: "islamabad", name: "Islamabad", status: "COMING_SOON", areas: ["F-6", "F-7", "F-8", "F-10", "G-11", "DHA Phase 2", "Bahria Town"] },
  { slug: "rawalpindi", name: "Rawalpindi", status: "COMING_SOON", areas: ["Saddar", "Satellite Town", "Bahria Town", "Gulraiz"] },
  { slug: "karachi", name: "Karachi", status: "COMING_SOON", areas: ["DHA", "Clifton", "PECHS", "Gulshan-e-Iqbal", "Nazimabad"] },
  { slug: "gujranwala", name: "Gujranwala", status: "COMING_SOON", areas: ["DC Colony", "Wapda Town", "Model Town", "Garden Town"] },
];

const categories = [
  { slug: "ac-repair", name: "AC Repair & Gas Refill", shortName: "AC Repair", sortOrder: 1 },
  { slug: "electrician", name: "Electrician Services", shortName: "Electrician", sortOrder: 2 },
  { slug: "plumbing", name: "Plumbing Services", shortName: "Plumbing", sortOrder: 3 },
  { slug: "cleaning", name: "Deep Cleaning Services", shortName: "Cleaning", sortOrder: 4 },
  { slug: "painter", name: "House Painting Services", shortName: "Painter", sortOrder: 5 },
];

async function main() {
  for (const city of cities) {
    const record = await prisma.city.upsert({
      where: { slug: city.slug },
      update: { name: city.name, status: city.status },
      create: { slug: city.slug, name: city.name, status: city.status },
    });

    for (const areaName of city.areas) {
      const areaSlug = slugify(areaName);
      await prisma.area.upsert({
        where: { cityId_slug: { cityId: record.id, slug: areaSlug } },
        update: { name: areaName },
        create: { cityId: record.id, slug: areaSlug, name: areaName },
      });
    }
    console.log(`  city: ${city.name} (+${city.areas.length} areas)`);
  }

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, shortName: cat.shortName, sortOrder: cat.sortOrder },
      create: { slug: cat.slug, name: cat.name, shortName: cat.shortName, sortOrder: cat.sortOrder },
    });
    console.log(`  category: ${cat.name}`);
  }

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
