"use client"
import React from "react"
import {
    NavbarItem,
    Button,
    NavbarContent,
} from "@nextui-org/react";

export default function PostsLinks(props) {
    return (
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
        </NavbarItem >    
        <NavbarItem className="flex-3">
            <Button className="text-black bg-transparent">
                <span className="material-symbols-outlined">
                    bookmark
                </span>
            </Button>
        </NavbarItem >
        </NavbarContent>
        
    )
}