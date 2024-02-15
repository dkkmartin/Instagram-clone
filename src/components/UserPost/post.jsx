'use client'

import './links.css'
import { Navbar, NavbarContent, Avatar, Divider } from '@nextui-org/react'
import PostsLinks from './post-links'
import Image from 'next/image'
import { imageLoader } from '../imageLoader'
import Comments from './comment/comments'

export default function Post({
  username,
  mediaType,
  mediaUrl,
  postId,
  comments,
}) {
  return (
    <section className="rounded-xl shadow-large">
      <div className="flex gap-2 items-center mb-1 max-w-[350px] m-auto py-2">
        <Avatar className="flex-0 mt-1" src="https://i.pravatar.cc/150" />
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
          <Image
            loader={imageLoader}
            src={mediaUrl}
            width={350}
            height={350}
            unoptimized
            priority
            alt=""
          ></Image>
        )}
      </div>
      <article className="max-w-[350px] m-auto">
        <Navbar className="z-20">
          <NavbarContent className="flex">
            <PostsLinks postId={postId} />
          </NavbarContent>
        </Navbar>
      </article>

      <section className="flex flex-col max-w-[350px] m-auto mb-4">
        <Divider />
        <Comments comments={comments} />
      </section>
    </section>
  )
}
