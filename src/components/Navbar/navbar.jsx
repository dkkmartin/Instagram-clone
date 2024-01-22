import {
    Navbar,
    NavbarContent,
} from "@nextui-org/react";
import React from "react";
import NavbarLinks from "./links";

export default function PrimaryNavbar() {
    return (
        <header className="fixed z-40 bottom-0 w-full">
            <Navbar className="border">
                <NavbarContent className="flex justify-around">
                    <NavbarLinks name="home"/>
                    <NavbarLinks name="search"/>
                    <NavbarLinks name="add_circle"/>
                    <NavbarLinks name="account_circle"/>
                </NavbarContent>
            </Navbar>
        </header>
    );
}
