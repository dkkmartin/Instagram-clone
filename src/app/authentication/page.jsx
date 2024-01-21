'use client'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'

export default function Auth() {
  function handleClick() {
    const clientId = '923874965815275'
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

  return (
    <div>
      <Button color="primary" onClick={handleClick}>
        Login
      </Button>
    </div>
  )
}
