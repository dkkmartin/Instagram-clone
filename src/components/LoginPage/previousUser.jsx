'use client'

import { Card, Avatar } from '@nextui-org/react'

export default function PreviousUser() {
  return (
    <>
      <Card className="items-center justify-evenly flex flex-row bg-purple-500 w-full p-2 rounded-full gap-2 bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-solid border-white border-2">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="lg border-solid border-white border-1"
        ></Avatar>
        <h3 className="text-white">PsykopatiskePeter666</h3>
      </Card>
    </>
  )
}
