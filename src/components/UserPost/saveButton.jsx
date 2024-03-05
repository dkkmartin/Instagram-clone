import { useThemeStore } from '@/stores/useThemeStore'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function SaveButton({ postId }) {
  const theme = useThemeStore((state) => state.themeStore)
  const [isClicked, setIsClicked] = useState(false)
  const [favourites, setFavourites] = useState([])

  const handleFavouritesStatus = useCallback(() => {
    if (
      favourites &&
      favourites.favourites &&
      favourites.favourites.includes(postId)
    ) {
      setIsClicked(true)
    }
  }, [favourites, postId])

  useEffect(() => {
    const checkFavouritesStatus = async () => {
      const response = await fetch('/api/favourites/getFav', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      return data
    }
    const saveFavouritesInState = async () => {
      const favouritesStatus = await checkFavouritesStatus()
      setFavourites(favouritesStatus)
    }
    saveFavouritesInState()
  }, [])

  useEffect(() => {
    handleFavouritesStatus()
  }, [handleFavouritesStatus])

  const updateFavouritesStatus = async (postId) => {
    const response = await fetch('/api/favourites/setFav', {
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
      const statusCode = await updateFavouritesStatus(postId)
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
          src="/MaterialSymbolsBookmarkAdded.svg"
          alt=""
          width={30}
          height={30}
        ></Image>
      ) : (
        <Image
          onClick={handleClick}
          src={
            theme === 'dark'
              ? '/MaterialSymbolsBookmarkAddWhite.svg'
              : '/MaterialSymbolsBookmarkAddBlack.svg'
          }
          alt=""
          width={30}
          height={30}
        ></Image>
      )}
    </>
  )
}
