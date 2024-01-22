"use client"

import {
    Navbar,
    NavbarContent,
} from "@nextui-org/react";
import PostsLinks from "./post-links";
import PostInfo from "./post-info";

export default function Post() {
    return (
        <section className="mb-20 mt-1">
            <div className="box-border h-80 w-80 mx-auto bg-black">
            </div>
            <article>
                <Navbar className="z-20">
                    <NavbarContent className="flex">
                        <PostsLinks/>
                    </NavbarContent>
                </Navbar>
            </article>
            <PostInfo/>
        </section >
    )
}