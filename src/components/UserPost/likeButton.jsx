'use client'

import Image from 'next/image'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function LikeButton({ postId }) {
  const [isClicked, setIsClicked] = useState(false)

  const updateLikedStatus = async (userID, postId) => {
    const response = await fetch('/like/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID, postId }),
    })

    const data = await response.json()
    return data
  }

  async function handleClick() {
    try {
      const cookie = JSON.parse(Cookies.get('token'))
      updateLikedStatus(cookie.user_id, postId)
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isClicked ? (
        <Image
          onClick={handleClick}
          src="/MaterialSymbolsFavoriteRed.svg"
          alt=""
          width={30}
          height={30}
        ></Image>
      ) : (
        <Image
          onClick={handleClick}
          src="/MaterialSymbolsFavoriteBlack.svg"
          alt=""
          width={30}
          height={30}
        ></Image>
      )}
    </>
  )
}
