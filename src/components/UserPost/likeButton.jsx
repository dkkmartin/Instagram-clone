'use client'

import Image from 'next/image'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function LikeButton({ postId }) {
  const [isClicked, setIsClicked] = useState(false)

  const updateLikedStatus = async (postId) => {
    const response = await fetch('/api/like/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
    })

    const data = await response.json()
    return data
  }

  async function handleClick() {
    try {
      // Optimistically update the UI
      setIsClicked(true)
      const statusCode = await updateLikedStatus(postId)
      if (statusCode.code !== 200) {
        setIsClicked(false)
      }
    } catch (error) {
      setIsClicked(false)
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
