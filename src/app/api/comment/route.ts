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
  const usernameCookie = cookies?.['username']

  // Fetch current comments
  async function fetchComments() {
    const { data, error } = await supabase
      .from('posts')
      .select('comments')
      .eq('post_id', res.postId)

    if (error) {
      console.error(error)
      throw error
    }

    // If data[0].comments is null, return an empty array
    if (!data || !data[0] || !data[0].comments) {
      return []
    }

    return data[0].comments
  }

  const res = await request.json()

  try {
    // Get current comments
    const currentComments = await fetchComments()

    // Prepare new comment
    const newComment = {
      user: usernameCookie,
      comment: res.comment,
    }

    // Add new comment to current comments
    const newComments = [...currentComments, newComment]

    // Update post with new comments
    const { error } = await supabase
      .from('posts')
      .update({ comments: newComments })
      .eq('post_id', res.postId)

    if (error) throw error
    return Response.json({ code: 200, message: 'success' })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
