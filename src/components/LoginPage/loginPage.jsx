import Image from 'next/image'
import LoginButton from './loginButton'
import PreviousUser from './previousUser'
import InstagramTextScroll from './instagramTextScroll'
import React from 'react'

export default function LoginPage({ handleClick, className }) {
  return (
    <section
      className={`flex items-center
        flex-col justify-evenly h-screen bg-black ${className}`}
    >
      <div className="w-full flex flex-col items-center">
        <article className="mt-20 w-3/5">
          <PreviousUser />
        </article>
      </div>

      <div className="flex flex-col w-full items-center">
        <LoginButton onClick={handleClick}>login</LoginButton>
        <LoginButton>opret ny bruger</LoginButton>
      </div>
    </section>
  )
}
