'use client'

import './links.css'
import { Navbar, NavbarContent } from '@nextui-org/react'
import PostsLinks from './post-links'
import PostInfo from './post-info'
import Image from 'next/image'

export default function Post({ username, mediaType, mediaUrl }) {
  return (
    <section className="mb-20 mt-1  max-w-[350px] m-auto">
      <h4>{username}</h4>
      <div className="flex justify-center">
        {mediaType === 'VIDEO' ? (
          <iframe
            className="rounded-lg"
            src={mediaUrl}
            allowFullScreen
            controls
            width={350}
            height={350}
          ></iframe>
        ) : (
          <Image src={mediaUrl} width={350} height={350} alt=""></Image>
        )}
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
