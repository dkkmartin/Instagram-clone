'use client'

import Post from '@/components/UserPost/post'
import getData from '@/lib/getData'
import { Spinner } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState, useRef } from 'react'
import { useData } from '@/stores/useMediaStore'
import { initSupabase } from '@/lib/supabaseClient'
import { Providers } from './providers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const { data, setData } = useData()
  const [databaseData, setDatabaseData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newComment, setNewComment] = useState([])

  const heartbeatIntervalId = useRef(null)

  useEffect(() => {
    console.log(databaseData)
  }, [databaseData])

  useEffect(() => {
    async function heartbeat() {
      await fetch('/api/heartbeat', {
        method: 'POST',
      })
    }

    heartbeat()
    heartbeatIntervalId.current = setInterval(heartbeat, 1 * 60 * 1000)

    return () => {
      clearInterval(heartbeatIntervalId.current)
    }
  }, [])

  useEffect(() => {
    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          setNewComment(payload.new)
        }
      )
      .subscribe()

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channels.unsubscribe()
    }
  }, [])

  useEffect(() => {
    function handleNewData(data) {
      // Check if newComment is not empty
      if (
        Object.keys(newComment).length === 0 &&
        newComment.constructor === Object
      ) {
        return
      }

      setDatabaseData((prev) => {
        // Check if the new comment belongs to one of the posts
        const postExists = prev.some((post) => post.post_id === data.post_id)
        if (!postExists) {
          return prev
        }

        const newState = prev.map((post) => {
          if (post.post_id === data.post_id) {
            // This is the post we want to change. Update its comments.

            return {
              ...post,
              comments: data.comments,
            }
          } else {
            // This is not the post we want to change. Return it as is.

            return post
          }
        })

        return newState
      })
    }

    handleNewData(newComment)
  }, [newComment])

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
    <Providers>
      <main>
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
      </main>
    </Providers>
  )
}
