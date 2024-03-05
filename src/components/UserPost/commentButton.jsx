'use client'

import { useThemeStore } from '@/stores/useThemeStore'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function CommentButton({ state, setState }) {
  const theme = useThemeStore((state) => state.themeStore)
  return (
    <>
      <Button onClick={() => setState(!state)} isIconOnly color="none">
        <Image
          src={
            theme === 'dark'
              ? '/MaterialSymbolsAddCommentWhite.svg'
              : '/MaterialSymbolsAddCommentBlack.svg'
          }
          alt=""
          width={30}
          height={30}
        ></Image>
      </Button>
    </>
  )
}
