'use client'

import Image from 'next/image'
import { NavbarItem, Button, NavbarContent } from '@nextui-org/react'
import LikeButton from './likeButton'
import SaveButton from './saveButton'
import CommentButton from './commentButton'
import { useThemeStore } from '@/stores/useThemeStore'

export default function PostsLinks({
  postId,
  isCommentClicked,
  setIsCommentClicked,
}) {
  const theme = useThemeStore((state) => state.themeStore)
  return (
    <div className="flex flex-col w-full ">
      <NavbarContent className="flex gap-0">
        <NavbarItem className="flex-0">
          <Button isIconOnly color="none">
            <LikeButton postId={postId} />
          </Button>
        </NavbarItem>
        <NavbarItem className="flex-0">
          <CommentButton
            postId={postId}
            state={isCommentClicked}
            setState={setIsCommentClicked}
          />
        </NavbarItem>
        <NavbarItem className="flex-1">
          <Button isIconOnly color="none">
            <Image
              src={
                theme === 'dark'
                  ? '/BitcoinIconsShareFilledWhite.svg'
                  : '/BitcoinIconsShareFilledBlack.svg'
              }
              alt=""
              width={30}
              height={30}
            ></Image>
          </Button>
        </NavbarItem>
        <NavbarItem className="flex-3">
          <SaveButton postId={postId} />
        </NavbarItem>
      </NavbarContent>
    </div>
  )
}
