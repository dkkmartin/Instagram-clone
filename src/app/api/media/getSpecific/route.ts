import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const param = searchParams.get('id')

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', param)

    if (error) {
      console.error(error)
      throw error
    }

    return Response.json({
      code: 200,
      message: 'success',
      post: data,
    })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
