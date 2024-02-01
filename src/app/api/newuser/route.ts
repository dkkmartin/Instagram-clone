import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  const res = await request.json()

  try {
    const { error } = await supabase
      .from('users')
      .insert({ user_id: res.userID })

    if (error) throw error
    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
