import {
    Navbar,
    NavbarContent,
} from "@nextui-org/react";

import NavbarLink from "../components/links"

export default function PrimaryNavbar() {
    return (
        <header className="fixed z-40 bottom-0 w-full">
            <Navbar className="border">
                <NavbarContent className="flex justify-around">
                    <NavbarLink name="home" />
                    <NavbarLink name="search" />
                    <NavbarLink name="add_circle" />
                    <NavbarLink name="account_circle" />
                </NavbarContent>
            </Navbar>
        </header>
    );
}
