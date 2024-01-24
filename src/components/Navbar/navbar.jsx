import { Button, Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PrimaryNavbar() {
<<<<<<< HEAD
    return (
        <header className="fixed z-40 bottom-0 w-full">
            <Navbar className="border">
                <NavbarContent className="flex justify-around">
                    <NavbarLinks name="home" />
                    <NavbarLinks name="search" />
                    <NavbarLinks name="add_circle" />
                    <NavbarLinks name="account_circle" />
                </NavbarContent>
            </Navbar>
        </header>
    );
=======
  return (
    <header className=" fixed z-40 bottom-0 w-full border-t">
      <Navbar>
        <NavbarContent
          className="sm:flex gap-4 w-full justify-between"
          justify=""
        >
          <Link href={'/'}>
            <Button isIconOnly color="none">
              <Image
                src={'/MaterialSymbolsHouse.svg'}
                width={30}
                height={30}
                alt=""
              ></Image>
            </Button>
          </Link>

          <Link href={'/'}>
            <Button isIconOnly color="none">
              <Image
                src={'/MaterialSymbolsSearch.svg'}
                width={30}
                height={30}
                alt=""
              ></Image>
            </Button>
          </Link>

          <Link href={'/'}>
            <Button isIconOnly color="none">
              <Image
                src={'/MaterialSymbolsAddCircle.svg'}
                width={30}
                height={30}
                alt=""
              ></Image>
            </Button>
          </Link>

          <Link href={'/profile'}>
            <Button isIconOnly color="none">
              <Image
                src={'/MaterialSymbolsAccountCircle.svg'}
                width={30}
                height={30}
                alt=""
              ></Image>
            </Button>
          </Link>
        </NavbarContent>
      </Navbar>
    </header>
  )
>>>>>>> 0cb6d919f529d2a70c58adff8c26e2a4baa1b2a9
}
