'use client'

import Post from '@/components/UserPost/post'
import getData from '@/lib/getData'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
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
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <NextUIProvider>
      <div className="container"></div>
      {!isLoading && data && data.data ? (
        data.data.map((post) => {
          return <Post key={post.id} mediaUrl={post.media_url} />
        })
      ) : (
        <>
          <div className="flex justify-center items-center h-screen">
            <Spinner size="lg" color="primary" />
          </div>
        </>
      )}
    </NextUIProvider>
  )
}
