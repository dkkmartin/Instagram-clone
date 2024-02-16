'use client'

import './links.css'
import { useState } from 'react'
import {
  Navbar,
  NavbarContent,
  Avatar,
  Divider,
  Input,
  Button,
} from '@nextui-org/react'
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
  const [isCommentClicked, setIsCommentClicked] = useState(false)
  const [comment, setComment] = useState('')

  async function submitComment() {
    await fetch(`/api/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, username, comment }),
    })
    setComment('')
    setIsCommentClicked(false)
  }

  function keyboardHandler(e) {
    if (e.key === 'Enter') {
      submitComment()
    }
  }

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
            <PostsLinks
              postId={postId}
              setIsCommentClicked={setIsCommentClicked}
              isCommentClicked={isCommentClicked}
            />
          </NavbarContent>
        </Navbar>
      </article>

      <section className="flex flex-col max-w-[350px] m-auto mb-4">
        {isCommentClicked ? (
          <div className="flex gap-2 items-center h-full">
            <Input
              className="h-full rounded-tl-3xl"
              type="text"
              placeholder="Write a comment"
              variant="bordered"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => keyboardHandler(e)}
            ></Input>
            <Button
              className="min-h-[56px]"
              onClick={submitComment}
              color="primary"
              size="lg"
            >
              Send
            </Button>
          </div>
        ) : null}
        <Divider />
        <Comments comments={comments} />
      </section>
    </section>
  )
}
