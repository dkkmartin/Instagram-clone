import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function GET(request: Request, response: Response) {
  const cookies = request.headers
    .get('Cookie')
    ?.split('; ')
    .reduce((prev, curr) => {
      const [key, value] = curr.split('=')
      prev[key] = decodeURIComponent(value)
      return prev
    }, {} as Record<string, string>)
  const cookie = JSON.parse(cookies?.['token'])

  try {
    const { data, error } = await supabase.from('posts').select('*')

    if (error) {
      console.error(error)
      throw error
    }

    if (error) throw error
    return Response.json({
      code: 200,
      message: 'success',
      posts: data,
    })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
