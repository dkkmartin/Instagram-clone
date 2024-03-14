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
import { useEffect, useState, useRef } from 'react'
import { initSupabase } from '@/lib/supabaseClient'
import Cookies from 'js-cookie'
import Bubble from '@/components/Chat/bubble'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = initSupabase(supabaseUrl, supabaseAnonKey)

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState({})
  const [users, setUsers] = useState([])
  const userCookie = Cookies.get('username')
  const messagesEndRef = useRef(null)
  const heartbeatIntervalId = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const channels = supabase
      .channel('chat-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          setNewMessage(payload.new)
        }
      )
      .subscribe()

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channels.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setMessages((prev) => [...prev, newMessage])
  }, [newMessage])

  useEffect(() => {
    async function getMessages() {
      const res = await fetch('/api/chat/getChat')
      const data = await res.json()
      setMessages(data.messages)
      setLoading(false)
    }
    getMessages()
  }, [])

  useEffect(() => {
    async function heartbeat() {
      await fetch('/api/heartbeat', {
        method: 'POST',
      })
    }

    heartbeat()
    heartbeatIntervalId.current = setInterval(heartbeat, 1 * 60 * 1000)

    return () => {
      clearInterval(heartbeatIntervalId.current)
    }
  }, [])

  useEffect(() => {
    async function getUsers() {
      const res = await fetch('/api/heartbeat/getUsers')
      const data = await res.json()

      const wasLastSeenWithinTwoMinutes = (lastSeen) => {
        if (lastSeen === null) {
          return false
        }

        const lastSeenDate = new Date(lastSeen)
        const currentDate = new Date()
        const twoMinutes = 2 * 60 * 1000 // 2 minutes * 60 seconds * 1000 milliseconds

        // Adjust for time difference between server and client
        const timeDifference = currentDate.getTime() - lastSeenDate.getTime()

        return timeDifference >= 0 && timeDifference <= twoMinutes
      }

      // Filter data to only include users last seen within the last 2 minutes
      const recentUsers = data.users.filter((user) =>
        wasLastSeenWithinTwoMinutes(user.last_seen)
      )

      setUsers(recentUsers)
    }

    getUsers()
    const intervalId = setInterval(getUsers, 60 * 1000) // 60 seconds * 1000 milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId)
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
        <h1 className="text-2xl font-semibold">Chat</h1>
        <AvatarGroup isBordered max={5}>
          {users &&
            users.map((user, index) => (
              <Tooltip content={user.user_name} key={index}>
                <Avatar
                  color="success"
                  src={'https://i.pravatar.cc/15' + index}
                ></Avatar>
              </Tooltip>
            ))}
        </AvatarGroup>
      </header>
      <main className="flex flex-col justify-between h-[calc(100dvh-(72px+64px))]">
        <section className="py-2 flex flex-col gap-2 overflow-scroll">
          {loading && messages ? (
            <Spinner size="lg" />
          ) : (
            messages
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((message, index) =>
                message.user === userCookie ? (
                  <Bubble
                    key={index}
                    message={message.message}
                    user={message.user}
                    isMe={true}
                  />
                ) : (
                  <Bubble
                    key={index}
                    message={message.message}
                    user={message.user}
                    isMe={false}
                  />
                )
              )
          )}
          <div ref={messagesEndRef} />
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
