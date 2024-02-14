import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  async function removePosts(id: number) {
    const { error } = await supabase.from('posts').delete().eq('post_id', id)
    if (error) throw error
  }

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
    const { data: userPosts, error } = await supabase
      .from('posts')
      .select('post_id')
      .eq('user_id', cookie.user_id)
    if (error) throw error
    const userPostIds = userPosts.map((post: any) => post.post_id)
    const requestPostIds = req.data.map((media: any) => media.id)
    const postsToRemove = userPostIds.filter(
      (id) => !requestPostIds.includes(id)
    )
    // Remove posts that are not in the request
    if (postsToRemove.length > 0) {
      postsToRemove.forEach(async (postId) => {
        await removePosts(postId)
      })
    }

    // Add new posts
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

        if (error) throw error
      })
    )

    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
