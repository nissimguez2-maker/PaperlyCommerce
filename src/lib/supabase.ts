import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase is OPTIONAL. When the env vars are present the app reads the
 * catalog and writes orders through Supabase; otherwise it falls back to the
 * bundled seed (src/data) so the site is always deployable.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project'),
  );
}

let browserClient: SupabaseClient | null = null;

/** Anon client for reads (catalog). Safe in the browser. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return browserClient;
}

/** Service-role client for server-side writes (orders, webhooks). Never client. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey || url.includes('your-project') || serviceKey.includes('your-')) {
    return null;
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
