'use client'

import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import tokenHandler from '@/lib/tokenHandler'
import LoginPage from '@/components/LoginPage/loginPage'

export default function Auth() {
  const router = useRouter()

  useEffect(() => {
    const runTokenHandler = async () => {
      try {
        await tokenHandler()
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

    runTokenHandler()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = Cookies.get('token')

      if (token) {
        router.push('/')
      }
    }, 500) // Check every second

    return () => clearInterval(intervalId) // Clean up on unmount
  }, [router])

  function handleClick() {
    const clientId = '923874965815275'
    // Fix this when deploying
    const redirectUri =
      process.env.NODE_ENV === 'development'
        ? 'https://mildly-pro-pipefish.ngrok-free.app'
        : window.location.origin
    const scope = 'user_profile,user_media'
    const responseType = 'code'

    const authLink = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&response_type=${responseType}`

    window.location.href = authLink
  }

  return <LoginPage handleClick={handleClick} />
}
