'use client'

import { Button, Navbar, NavbarContent } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Settings from '../Settings/settings'
import { useThemeStore } from '@/stores/useThemeStore'

export default function PrimaryNavbar() {
  const theme = useThemeStore((state) => state.themeStore)
  const pathname = usePathname()
  const [onLoginRoute, setOnLoginRoute] = useState(pathname === '/login')

  useEffect(() => {
    if (pathname === '/login') {
      setOnLoginRoute(true)
    } else {
      setOnLoginRoute(false)
    }
  }, [pathname])

  if (onLoginRoute) {
    return null
  } else {
    return (
      <header className=" fixed z-40 bottom-0 w-full">
        <Navbar>
          <NavbarContent
            className="sm:flex gap-4 w-full justify-between"
            justify=""
          >
            <Link href={'/'}>
              <Button isIconOnly color="none">
                <div className="text-white">
                  <Image
                    src={
                      theme === 'dark'
                        ? '/MaterialSymbolsHouseOutlineWhite.svg'
                        : '/MaterialSymbolsHouseOutlineBlack.svg'
                    }
                    width={30}
                    height={30}
                    alt="Home"
                  ></Image>
                </div>
              </Button>
            </Link>

            <Link href={'/'}>
              <Button isIconOnly color="none">
                <Image
                  src={
                    theme === 'dark'
                      ? '/MaterialSymbolsChatBubbleOutlineWhite.svg'
                      : '/MaterialSymbolsChatBubbleOutlineBlack.svg'
                  }
                  width={30}
                  height={30}
                  alt="Chat"
                ></Image>
              </Button>
            </Link>

            <Link href={'/'}>
              <Button isIconOnly color="none">
                <Image
                  src={
                    theme === 'dark'
                      ? '/MaterialSymbolsAddCircleOutlineWhite.svg'
                      : '/MaterialSymbolsAddCircleOutlineBlack.svg'
                  }
                  width={30}
                  height={30}
                  alt="New post"
                ></Image>
              </Button>
            </Link>

            <Link href={'/profile'}>
              <Button isIconOnly color="none">
                <Image
                  src={
                    theme === 'dark'
                      ? '/MaterialSymbolsAccountCircleWhite.svg'
                      : '/MaterialSymbolsAccountCircleBlack.svg'
                  }
                  width={30}
                  height={30}
                  alt="Profile"
                ></Image>
              </Button>
            </Link>

            <Settings />
          </NavbarContent>
        </Navbar>
      </header>
    )
  }
}
