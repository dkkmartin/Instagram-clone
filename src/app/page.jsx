'use client'

import PrimaryNavbar from '@/components/navbar'
import Post from '@/components/post'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
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
      <div className="container">
        <Button onClick={tets} color="primary">
          teest
        </Button>
        <h1 className="mb-10 text-center font-bold text-3xl">instagram 2.0</h1>
        <PrimaryNavbar />
        <Post />
        <Post />
        <Post />
      </div>
    </NextUIProvider>
  )
}
