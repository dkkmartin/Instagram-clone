import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

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

    const index = liked.indexOf(res.postId)
    let message: string, code: number

    if (index !== -1) {
      liked = liked.filter((id) => id !== res.postId)
      message = 'Post unliked'
      code = 201 // Code for unliked
    } else {
      liked.push(res.postId)
      message = 'Post liked'
      code = 200 // Code for liked
    }

    const { error } = await supabase
      .from('users')
      .update({ liked: liked })
      .eq('user_id', cookie.user_id)

    if (error) throw error
    return Response.json({ code, message })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
