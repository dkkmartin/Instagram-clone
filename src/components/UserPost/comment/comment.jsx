'use client'

import { User, Divider } from '@nextui-org/react'

export default function Comment({ comment, user }) {
  return (
    <div className="border rounded-lg flex flex-col gap-2 w-full bg-slate-50 px-4 py-1 mt-4">
      <User
        className="font-bold justify-start"
        avatarProps={{
          src: 'https://i.pravatar.cc/50',
        }}
        name={user}
      />
      <Divider orientation="vertical" />
      <p className="text-sm">{comment}</p>
    </div>
  )
}
