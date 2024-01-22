'use client'

import PrimaryNavbar from '@/components/Navbar/navbar'
import Post from '@/components/UserPost/post'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import getData from '@/lib/getData'

export default function Home() {
  async function tets() {
    const data = await getData()
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
