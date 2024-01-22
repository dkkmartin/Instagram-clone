'use client'

import Post from '@/components/UserPost/post'
import { Button, NextUIProvider } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { fetchAndStoreToken } from '@/fetchAndStoreToken'
import getData from '@/lib/getData'

export default function Home() {
  useEffect(() => {
    fetchAndStoreToken()
  }, [])

  async function tets() {
    const cookie = JSON.parse(Cookies.get('token'))
    const data = await getData(cookie.access_token)
    console.log(data)
  }

  return (
    <NextUIProvider>
      <Button color="primary" onClick={tets}>
        Test
      </Button>
      <div className="container">
        <h1 className="mb-10 text-center font-bold text-3xl">instagram 2.0</h1>

        <Post />
        <Post />
        <Post />
      </div>
    </NextUIProvider>
  )
}
