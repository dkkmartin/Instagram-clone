import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  async function fetchLikes() {
    const { data, error } = await supabase
      .from('users')
      .select('liked')
      .eq('user_id', cookie.user_id)

    if (error) {
      console.error(error)
      throw error
    }

    return data
  }

  const res = await request.json()
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
    const userData = await fetchLikes()
    let liked = userData[0].liked
    if (!Array.isArray(liked)) {
      liked = []
    }
    const linkedArray = [...liked, res.postId]

    const { error } = await supabase
      .from('users')
      .update({ liked: linkedArray })
      .eq('user_id', cookie.user_id)

    if (error) throw error
    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
