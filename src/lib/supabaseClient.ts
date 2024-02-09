import { createClient } from '@supabase/supabase-js'
import { Database } from '../app/types/supabase'

export function initSupabase(URL: string, KEY: string) {
  return createClient<Database>(URL, KEY)
}
