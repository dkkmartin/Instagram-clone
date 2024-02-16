import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  const cookies = request.headers
    .get('Cookie')
    ?.split('; ')
    .reduce((prev, curr) => {
      const [key, value] = curr.split('=')
      prev[key] = decodeURIComponent(value)
      return prev
    }, {} as Record<string, string>)
  const cookie = JSON.parse(cookies?.['token'])
  const usernameCookie = cookies?.['username']

  try {
    const { error } = await supabase
      .from('users')
      .insert({ user_id: cookie.user_id, user_name: usernameCookie })

    if (error) throw error
    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
