'use client'

import Post from '@/components/UserPost/post'
import { NextUIProvider } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { fetchAndStoreToken } from '@/lib/fetchAndStoreToken'
import getData from '@/lib/getData'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        await fetchAndStoreToken()
        const cookie = Cookies.get('token')
          ? JSON.parse(Cookies.get('token'))
          : null
        const data = await getData(cookie.access_token)
        setData(data)
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

    fetchTokenAndData()
  }, [])

  useEffect(() => {
    console.log(data)
  })

  return (
    <NextUIProvider>
      <div className="container">
        <h1 className="mb-10 text-center font-bold text-3xl">instagram 2.0</h1>
        <Post />
      </div>
    </NextUIProvider>
  )
}
