// This is a helper file to initialize the Supabase client.
// The two key and url variables will be exposed on the browser
// but we are using Row Level Security, so thats fine

import { createClient } from "@supabase/supabase-js"

// these are stored in /.env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// createClient() creates a new Supabase client for interacting with DB
export const supabase = createClient(supabaseUrl, supabaseAnonKey)