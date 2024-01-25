'use client'

import { Navbar, NavbarContent } from '@nextui-org/react'
import PostsLinks from './post-links'
import PostInfo from './post-info'
import Image from 'next/image'

export default function Post({ imageSrc }) {
  return (
    <section className="mb-20 mt-1">
      <div className="flex justify-center">
        <Image src={imageSrc} width={350} height={350} alt=""></Image>
      </div>
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
