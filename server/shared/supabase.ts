import { createClient } from "@supabase/supabase-js";
import { appConfig } from "../config/app.config";

// Placeholder fallbacks below are dev-only in practice: app.config.ts calls
// validateEnv() on import, which throws before this module evaluates if
// NODE_ENV=production and these are unset. Safe to keep for local DX.

// Public Supabase client for client-side or anon operations
export const supabasePublic = createClient(
  appConfig.supabase.url || "https://placeholder.supabase.co",
  appConfig.supabase.anonKey || "placeholder-anon-key"
);

// Admin Supabase client with service role key (bypass RLS for server-side trusted operations)
export const supabaseAdmin = createClient(
  appConfig.supabase.url || "https://placeholder.supabase.co",
  appConfig.supabase.serviceRoleKey || appConfig.supabase.anonKey || "placeholder-service-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
