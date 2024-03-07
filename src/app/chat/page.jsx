import React from 'react'
import { Avatar, AvatarGroup, Button, Input, Tooltip } from '@nextui-org/react'
import { Providers } from '../providers'

export default function ChatPage() {
  return (
    <Providers>
      <header className="flex justify-between w-full p-4 shadow-xl">
        <h1 className="text-2xl font-semibold">Online</h1>
        <AvatarGroup isBordered max={5}>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/151" />
          </Tooltip>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/152" />
          </Tooltip>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/153" />
          </Tooltip>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/154" />
          </Tooltip>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/155" />
          </Tooltip>
          <Tooltip content="@peperino1995">
            <Avatar src="https://i.pravatar.cc/156" />
          </Tooltip>
        </AvatarGroup>
      </header>
      <main className="flex flex-col justify-between h-[calc(100dvh-(72px+64px))]">
        <section className="">
          <p>message</p>
        </section>
        <section className="flex gap-2 mb-2">
          <Input placeholder="Message"></Input>
          <Button color="primary" className="h-full">
            Send
          </Button>
        </section>
      </main>
    </Providers>
  )
}
