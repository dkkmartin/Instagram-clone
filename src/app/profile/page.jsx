'use client'

import { useData } from '@/stores/useMediaStore'
import Gallery from '@/components/Profile/gallery'
import { useEffect } from 'react'
import { Avatar, Spinner } from '@nextui-org/react'

export default function Profile() {
  const { data } = useData()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      {!data ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <section className="w-auto h-auto flex flex-col gap-16 items-center">
          <header className="text-4xl mt-4">
            <h1 className="">{'@' + data?.data[0].username}</h1>
          </header>
          <Avatar
            src="https://i.pravatar.cc/300"
            className="w-[200px] h-[200px] text-large"
            isBordered
          />
          <Gallery data={data} />
        </section>
      )}
    </>
  )
}
