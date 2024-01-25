'use client'

import Post from '@/components/UserPost/post'
import getData from '@/lib/getData'
import { NextUIProvider } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getMediaData = async () => {
      const cookie = Cookies.get('token')
        ? JSON.parse(Cookies.get('token'))
        : null
      if (!cookie) return
      const data = await getData(cookie.access_token)
      setData(data)
    }
    getMediaData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <NextUIProvider>
      <div className="container"></div>
      {data &&
        data.data.map((post) => {
          return <Post key={post.id} imageSrc={post.media_url} />
        })}
    </NextUIProvider>
  )
}
