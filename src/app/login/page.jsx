'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import tokenHandler from '@/lib/tokenHandler'
import LoginPage from '@/components/LoginPage/loginPage'
import { Spinner } from '@nextui-org/react'

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const runTokenHandler = async () => {
      try {
        await tokenHandler({ setIsLoading })
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

    runTokenHandler()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false)
    }

    const intervalId = setInterval(async () => {
      const token = Cookies.get('token')

      if (token) {
        // Adds the user ID from instagram to the database
        await fetch('/api/adduser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        router.push('/')
      }
    }, 500)

    if (router && router.events) {
      router.events.on('routeChangeComplete', handleRouteChange)
    }

    return () => {
      clearInterval(intervalId)

      if (router && router.events) {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router])

  function handleClick() {
    const clientId = process.env.NEXT_PUBLIC_APP_ID
    // Fix this when deploying
    const redirectUri =
      process.env.NODE_ENV === 'development'
        ? 'https://mildly-pro-pipefish.ngrok-free.app'
        : process.env.NEXT_PUBLIC_REDIRECT_URL
    const scope = 'user_profile,user_media'
    const responseType = 'code'

    const authLink = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&response_type=${responseType}`

    window.location.href = authLink
  }

  return (
    <>
      {isLoading ? (
        <>
          <div className="absolute h-dvh w-dvw flex justify-center items-center z-10 bg-black opacity-70 ">
            <Spinner size="lg" />
          </div>
          <LoginPage className={''} handleClick={handleClick} />
        </>
      ) : (
        <LoginPage className={''} handleClick={handleClick} />
      )}
    </>
  )
}
