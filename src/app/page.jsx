'use client'

import Post from '@/components/UserPost/post'
import getData from '@/lib/getData'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useData } from '@/stores/useMediaStore'
import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const { data, setData } = useData()
  const [databaseData, setDatabaseData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(databaseData)
  }, [databaseData])

  useEffect(() => {
    console.log('useEffect called')
    function handleNewData(payload) {
      const newPost = payload.new

      setDatabaseData((prev) => {
        return prev.map((post) => {
          if (post.post_id === newPost.post_id) {
            // This is the post we want to change. Replace it with the new data.
            console.log('Updating post', newPost)
            return {
              ...newPost,
              comments: newPost.comments, // update the comments
            }
          } else {
            // This is not the post we want to change. Return it as is.
            console.log('Not updating post', post)
            return post
          }
        })
      })
    }

    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Change received!', payload)
          // handleNewData(payload)
        }
      )
      .subscribe()

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channels.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const getMediaData = async () => {
      setIsLoading(true)
      const cookie = Cookies.get('token')
        ? JSON.parse(Cookies.get('token'))
        : null
      if (!cookie) return
      const data = await getData(cookie.access_token)
      setData(data)
    }
    getMediaData()
  }, [setData])

  useEffect(() => {
    async function postMedia() {
      if (data) {
        await fetch('/api/media/addMedia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      }
    }
    postMedia()
  }, [data])

  useEffect(() => {
    async function getMedia() {
      const res = await fetch('/api/media/getMedia')
      const data = await res.json()
      const posts = data.posts
      setDatabaseData(posts)
      setIsLoading(false)
    }
    getMedia()
  }, [])

  return (
    <NextUIProvider>
      <div className="container flex flex-col gap-16 p-4 mb-16">
        {!isLoading && data && data.data && databaseData ? (
          databaseData.map((post) => {
            return (
              <Post
                key={post.id}
                postId={post.post_id}
                username={post.username}
                mediaType={post.media_type}
                mediaUrl={post.media_url}
                comments={post.comments ? post.comments : []}
              />
            )
          })
        ) : (
          <>
            <div className="flex justify-center items-center h-screen">
              <Spinner size="lg" color="primary" />
            </div>
          </>
        )}
      </div>
    </NextUIProvider>
  )
}
