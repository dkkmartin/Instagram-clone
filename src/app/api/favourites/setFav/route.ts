import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  async function fetchFavourites() {
    const { data, error } = await supabase
      .from('users')
      .select('favourites')
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
    const userData = await fetchFavourites()
    let favourites = userData[0].favourites
    if (!Array.isArray(favourites)) {
      favourites = []
    }

    const index = favourites.indexOf(res.postId)
    let message: string, code: number

    if (index !== -1) {
      favourites = favourites.filter((id) => id !== res.postId)
      message = 'Post removed from favourites'
      code = 201
    } else {
      favourites.push(res.postId)
      message = 'Post added to favourites'
      code = 200
    }

    const { error } = await supabase
      .from('users')
      .update({ favourites: favourites })
      .eq('user_id', cookie.user_id)

    if (error) throw error
    return Response.json({ code, message })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
