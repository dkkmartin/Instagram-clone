'use client'

import { useThemeStore } from '@/stores/useThemeStore'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function LikeButton({ postId }) {
  const theme = useThemeStore((state) => state.themeStore)
  const [isClicked, setIsClicked] = useState(false)
  const [liked, setLiked] = useState([])

  const handleLikedStatus = useCallback(() => {
    if (liked && liked.liked && liked.liked.includes(postId)) {
      setIsClicked(true)
    }
  }, [liked, postId])

  useEffect(() => {
    const checkLikedStatus = async () => {
      const response = await fetch('/api/like/getLike', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      return data
    }
    const saveLikedInState = async () => {
      const likedStatus = await checkLikedStatus()
      setLiked(likedStatus)
    }
    saveLikedInState()
  }, [])

  useEffect(() => {
    handleLikedStatus()
  }, [handleLikedStatus])

  const updateLikedStatus = async (postId) => {
    const response = await fetch('/api/like/setLike', {
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
      setIsClicked(!isClicked)
      const statusCode = await updateLikedStatus(postId)
      if (statusCode.code === 200) {
        setIsClicked(true)
      } else if (statusCode.code === 201) {
        setIsClicked(false)
      }
    } catch (error) {
      setIsClicked(!isClicked)
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
          src={
            theme === 'dark'
              ? '/MaterialSymbolsFavoriteWhite.svg'
              : '/MaterialSymbolsFavoriteBlack.svg'
          }
          alt=""
          width={30}
          height={30}
        ></Image>
      )}
    </>
  )
}
