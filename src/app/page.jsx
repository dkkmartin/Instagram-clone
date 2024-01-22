'use client'

import Post from '@/components/UserPost/post'
import { Button, NextUIProvider } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { fetchAndStoreToken } from '@/fetchAndStoreToken'
import getData from '@/lib/getData'
import Link from 'next/link'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchTokenAndData = async () => {
      await fetchAndStoreToken()
      const cookie = JSON.parse(Cookies.get('token'))
      const data = await getData(cookie.access_token)
      setData(data)
    }

    fetchTokenAndData()
  }, [])

  return (
    <NextUIProvider>
      <Link href={'/authentication'}>
        <Button color="danger">Login</Button>
      </Link>

      <div className="container">
        <h1 className="mb-10 text-center font-bold text-3xl">instagram 2.0</h1>

        <Post />
        <Post />
        <Post />
      </div>
    </NextUIProvider>
  )
}
