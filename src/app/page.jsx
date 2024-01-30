'use client'

import Post from '@/components/UserPost/post'
import getData from '@/lib/getData'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useData } from '@/stores/useMediaStore'

export default function Home() {
  const { data, setData } = useData()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getMediaData = async () => {
      setIsLoading(true)
      const cookie = Cookies.get('token')
        ? JSON.parse(Cookies.get('token'))
        : null
      if (!cookie) return
      const data = await getData(cookie.access_token)
      setData(data)
      setIsLoading(false)
    }
    getMediaData()
  }, [setData])

  useEffect(() => {
    console.log(data)
  })

  return (
    <NextUIProvider>
      <div className="container flex flex-col gap-16 p-4 mb-16">
        {!isLoading && data && data.data ? (
          data.data.map((post) => {
            return (
              <Post
                key={post.id}
                username={post.username}
                mediaType={post.media_type}
                mediaUrl={post.media_url}
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
