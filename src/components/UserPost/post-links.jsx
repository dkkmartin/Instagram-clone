'use client'
import React from 'react'
import Image from 'next/image'
import { NavbarItem, Button, NavbarContent } from '@nextui-org/react'
import LikeButton from './likeButton'
import SaveButton from './saveButton'

export default function PostsLinks(props) {
  return (
    <NavbarContent className="flex">
      <NavbarItem className="flex-0">
        <Button isIconOnly color="none">
          <LikeButton />
        </Button>
      </NavbarItem>
      <NavbarItem className="flex-1">
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
      <NavbarItem className="flex-3">
        <SaveButton />
      </NavbarItem>
    </NavbarContent>
  )
}
