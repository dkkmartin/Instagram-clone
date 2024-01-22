import {
    NavbarItem,
    Button,
} from "@nextui-org/react";

export default function NavbarLink(props) {
    return (
        <NavbarItem className="flex-1">
            <NavbarLink href="https://google.com/">
                <Button className="text-black bg-transparent">
                    <span className="material-symbols-outlined">
                        {props.name}
                    </span>
                </Button></NavbarLink>
        </NavbarItem>
    )
}