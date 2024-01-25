'use client'
import React from 'react'
import Image from 'next/image'
import { NavbarItem, Button, NavbarContent, className } from '@nextui-org/react'
import LikeButton from './likeButton'

export default function PostsLinks(props) {
  return (
    <NavbarContent className="flex gap-0">
      <NavbarItem className="flex-0">
        <Button isIconOnly color="none">
          <LikeButton />
        </Button>
      </NavbarItem>
      <NavbarItem className="flex-0">
        <Button isIconOnly color="none">
          <a href="../postComments">
            <Image
              src={'/PhChatTeardropDotsFill.svg'}
              alt=""
              width={30}
              height={30}
            ></Image>
          </a>
        </Button>
      </NavbarItem>
      <NavbarItem className="flex-1">
        <Button isIconOnly color="none">
          <Image
            src={'/ForwardIcon.svg'}
            alt=""
            width={30}
            height={30}
          ></Image>
        </Button>
      </NavbarItem>
      <NavbarItem className="flex-3">
        <Button isIconOnly color="none">
          <Image
            src={'/MaterialSymbolsBookmarkAdd.svg'}
            alt=""
            width={30}
            height={30}
          ></Image>
        </Button>
      </NavbarItem>
    </NavbarContent>
  )
}
