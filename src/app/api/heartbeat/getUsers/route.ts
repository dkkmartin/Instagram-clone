import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function GET(request: Request, response: Response) {
  try {
    const { data, error } = await supabase.from('users').select('*')

    if (error) throw error
    return Response.json({
      code: 200,
      message: 'success',
      users: data,
    })
  } catch (error) {
    return Response.json({
      code: 500,
      message: error.message,
    })
  }
}
