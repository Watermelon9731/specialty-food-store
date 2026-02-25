import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient<Database>> | undefined;
};

export const db =
  globalForSupabase.supabase ??
  createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

if (process.env.NODE_ENV !== "production") globalForSupabase.supabase = db;
