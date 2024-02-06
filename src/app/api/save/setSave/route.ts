// setSave.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  async function fetchSaves() {
    const { data, error } = await supabase
      .from('users')
      .select('saved')
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
    const userData = await fetchSaves()
    let saved = userData[0].saved
    if (!Array.isArray(saved)) {
      saved = []
    }

    const index = saved.indexOf(res.postId)
    let message: string, code: number

    if (index !== -1) {
      saved = saved.filter((id) => id !== res.postId)
      message = 'Post unsaved'
      code = 201 // Code for unsaved
    } else {
      saved.push(res.postId)
      message = 'Post saved'
      code = 200 // Code for saved
    }

    const { error } = await supabase
      .from('users')
      .update({ saved: saved })
      .eq('user_id', cookie.user_id)

    if (error) throw error
    return Response.json({ code, message })
  } catch (error) {
    return Response.json({ code: 500, message: error.message })
  }
}
