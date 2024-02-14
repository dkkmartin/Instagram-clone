// Import necessary modules and initialize supabase client
import { initSupabase } from '@/lib/supabaseClient'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY
const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

// Define your POST function
export async function POST(request: Request) {
  // Define the removePosts function for convenience
  async function removePosts(id: number) {
    const { error } = await supabase.from('posts').delete().eq('post_id', id)
    if (error) throw error
  }

  // Parse the request and get cookies from headers
  const req = await request.json()
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
    // Remove all posts that belong to the current user ID
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('user_id', cookie.user_id)

    if (error) throw error

    // If there are errors, throw them
    const requestPostIds = req.data.map((media: any) => media.id)

    // Insert all new posts into the database
    await Promise.all(
      req.data.map(async (media: any) => {
        const { error } = await supabase.from('posts').insert({
          post_id: media.id,
          user_id: cookie.user_id,
          username: media.username,
          media_type: media.media_type,
          media_url: media.media_url,
          timestamp: media.timestamp,
        })

        // If there is an error, throw it
        if (error) throw error
      })
    )

    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
