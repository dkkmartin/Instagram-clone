"use client"

import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";

export default function Post() {
    return (
        <section className="mb-20 mt-1">
            <div className="box-border h-80 w-80 mx-auto bg-black">
            </div>
            <article>
                <Navbar className="z-20">
                    <NavbarContent className="flex">
                        <NavbarItem className="flex-0">
                            <Button className="text-black bg-transparent">
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                            </Button>
                        </NavbarItem >
                        <NavbarItem className="flex-1">
                            <Button className="text-black bg-transparent">
                                <span className="material-symbols-outlined">
                                    chat
                                </span>
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="flex-3">
                            <Button className="text-black bg-transparent">
                                <span className="material-symbols-outlined">
                                    bookmark
                                </span>
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </article>
        </section >
    )
}