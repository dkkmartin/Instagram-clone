'use client'

import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function CommentButton({ state, setState }) {
  return (
    <>
      <Button onClick={() => setState(!state)} isIconOnly color="none">
        <Image
          src={'/PhChatTeardropDotsFill.svg'}
          alt=""
          width={30}
          height={30}
        ></Image>
      </Button>
    </>
  )
}
