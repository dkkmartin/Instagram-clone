'use client'

import { User } from '@nextui-org/react'

export default function Comment({ comment, user }) {
  return (
    <div className="border-t border-b flex flex-col gap-2 px-4 py-1">
      <User
        className="font-bold justify-start"
        avatarProps={{
          src: 'https://i.pravatar.cc/50',
        }}
        name={user}
      />
      <p className="text-sm pl-12">{comment}</p>
    </div>
  )
}
