// pages/api/updateNote.ts
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function POST(res: NextApiResponse, req: NextApiRequest) {
  const { userID, postId } = req.body

  const { data, error } = await supabase
    .from('user')
    .update({ liked: postId })
    .eq('user_id', userID)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200)
}
