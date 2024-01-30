'use client'

import './links.css'
import { Navbar, NavbarContent, Avatar } from '@nextui-org/react'
import PostsLinks from './post-links'
import PostInfo from './post-info'
import Image from 'next/image'

export default function Post({ username, mediaType, mediaUrl }) {
  return (
    <section className="rounded-xl shadow-large">
      <div className="flex gap-2 items-center mb-1 max-w-[350px] m-auto">
        <Avatar
          className="flex-0 mt-1"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <h4 className="flex-1">
          <strong>{username}</strong>
        </h4>
        <Image
          className="flex-3"
          src={'/MoreIcon.svg'}
          alt=""
          width={30}
          height={30}
        ></Image>
      </div>
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
      <article className="max-w-[350px] m-auto">
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
