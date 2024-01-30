'use client'

import Image from 'next/image'
import { useData } from '@/stores/useMediaStore'
import { Avatar, AvatarGroup, AvatarIcon } from '@nextui-org/react'
import Gallery from '@/components/Profile/gallery'

export default function Profile() {
  const { data } = useData()

  return (
    <section className="w-auto h-auto flex flex-col gap-16 items-center">
      <header className="text-4xl mt-4">
        <h1 className="">{'@' + data?.data[0].username}</h1>
      </header>
      <Avatar
        src="https://i.pravatar.cc/300"
        className="w-[200px] h-[200px] text-large"
      />
      <Gallery data={data} />
    </section>
  )
}
