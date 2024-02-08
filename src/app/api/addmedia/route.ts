import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  async function checkUser() {
    const { data, error } = await supabase
      .from('posts')
      .select('username')
      .eq('username', req.data[0].username)
    if (error) throw error
    return data
  }

  const req = await request.json()
  console.log(await checkUser())
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
    await Promise.all(
      req.data.map(async (media: any) => {
        const { error } = await supabase.from('posts').insert({
          post_id: media.id,
          username: media.username,
          media_type: media.type,
          media_url: media.url,
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
