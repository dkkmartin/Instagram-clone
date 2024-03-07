'use client'

import React from 'react'
import {
  Avatar,
  AvatarGroup,
  Button,
  Input,
  Spinner,
  Tooltip,
} from '@nextui-org/react'
import { Providers } from '../providers'
import Bubble from '@/components/Chat/bubble'
import { useEffect, useState } from 'react'
import { initSupabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const channels = supabase
      .channel('chat-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          console.log(payload.new)
        }
      )
      .subscribe()

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channels.unsubscribe()
    }
  }, [])

  useEffect(() => {
    async function getMessages() {
      const res = await fetch('/api/chat/getChat')
      const data = await res.json()
      setMessages(data.messages)
      setLoading(false)
    }
    getMessages()
  }, [])

  async function handleSendMessage() {
    if (message !== '') {
      await fetch('/api/chat/sendChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      setMessage('')
    }
  }

  function keyboardHandler(e) {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

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
        <section className="py-2">
          {loading && messages ? (
            <Spinner size="lg" />
          ) : (
            messages.map((message, index) => (
              <Bubble
                key={index}
                message={message.message}
                user={message.user}
              />
            ))
          )}
        </section>
        <section className="flex gap-2 mb-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => keyboardHandler(e)}
            placeholder="Message"
          ></Input>
          <Button
            color="primary"
            className="h-full"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </section>
      </main>
    </Providers>
  )
}
