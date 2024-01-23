'use client'

import { Navbar, NavbarContent } from '@nextui-org/react'
import PostsLinks from './post-links'
import PostInfo from './post-info'
import Image from 'next/image'

export default function Post({imageSrc}) {
  return (
    <section className="mb-20 mt-1">
      <Image src={imageSrc} width={200} height={200}></Image>
      <div className="box-border h-80 w-80 mx-auto bg-black"></div>
      <article>
        <Navbar className="z-20">
          <NavbarContent className="flex">
            <PostsLinks />
          </NavbarContent>
        </Navbar>
      </article>
      <PostInfo />
    </section>
  )
}
