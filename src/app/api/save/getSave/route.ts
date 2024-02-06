import { createClient } from '@supabase/supabase-js'
import { Database } from '../../../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

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
    const { data, error } = await supabase
      .from('users')
      .select('saved')
      .eq('user_id', cookie.user_id)

    if (error) {
      console.error(error)
      throw error
    }

    if (error) throw error
    return Response.json({
      code: 200,
      message: 'success',
      saved: data[0].saved,
    })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
