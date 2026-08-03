import { validateEnv } from "@/server/shared/env-validation";

validateEnv();

export const appConfig = {
  env: process.env.NODE_ENV || "development",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  isProduction: process.env.NODE_ENV === "production",

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    buckets: {
      vendorDocs: process.env.SUPABASE_STORAGE_VENDOR_DOCS_BUCKET || "vendor-documents",
      portfolio: process.env.SUPABASE_STORAGE_PORTFOLIO_BUCKET || "portfolio-images",
      blog: process.env.SUPABASE_STORAGE_BLOG_BUCKET || "blog-images",
      categoryIcons: process.env.SUPABASE_STORAGE_CATEGORY_ICONS_BUCKET || "category-icons",
    },
  },

  jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret-key-fixkar",
} as const;
