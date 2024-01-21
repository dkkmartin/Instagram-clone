import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";

export default function PrimaryNavbar() {
    return (
        <header className="fixed z-40 bottom-0 w-full">
            <Navbar className="border">
                <NavbarContent className="flex justify-around">
                    <NavbarItem className="flex-1">
                        <Button className="text-black bg-transparent">
                            <span className="material-symbols-outlined">
                                home
                            </span>
                        </Button>
                    </NavbarItem>

                    <NavbarItem className="flex-1">
                        <Button className="text-black bg-transparent">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </Button>
                    </NavbarItem>

                    <NavbarItem className="flex-1">
                        <Button className="text-black bg-transparent">
                            <span className="material-symbols-outlined">
                                add_circle
                            </span>
                        </Button>
                    </NavbarItem>

                    <NavbarItem className="flex-0">
                        <Button className="text-black bg-transparent">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
}
