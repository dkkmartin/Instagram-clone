'use client'

import Comment from './comment'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function Comments({ comments }) {
  const [showComments, setShowComments] = useState(false)

  function handleClick() {
    setShowComments(!showComments)
  }

  return (
    <>
      {comments.length === 1 ? (
        <Comment user={comments[0].user} comment={comments[0].comment} />
      ) : null}

      {comments.length > 1 && (
        <>
          <Comment user={comments[0].user} comment={comments[0].comment} />
          {showComments &&
            comments
              .slice(1)
              .map((comment, index) => (
                <Comment
                  key={index}
                  user={comment.user}
                  comment={comment.comment}
                />
              ))}
          <Button
            className=" rounded-bl-xl rounded-br-xl"
            variant="flat"
            radius="none"
            onClick={handleClick}
          >
            {showComments
              ? 'Hide comments'
              : 'Show ' +
                (comments.length - 1) +
                (comments.length - 1 === 1 ? ' comment' : ' comments')}
          </Button>
        </>
      )}
    </>
  )
}
