'use client'
import { Button } from '@nextui-org/react'

export default function LoginButton({ children }) {
  return (
    <>
      <Button
        radius="full"
        className="uppercase w-1/2 bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-solid border-white border-2 text-white mt-2"
      >
        {children}
      </Button>
    </>
  )
}
