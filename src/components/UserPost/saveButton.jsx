import Image from "next/image";
import { useState } from "react";

export default function SaveButton() {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(!isClicked)
    }

    return (
        <>
            {
                isClicked ? (
                    <Image onClick={handleClick}
                        src="/MaterialSymbolsBookmarkAdded.svg"
                        alt=""
                        width={30}
                        height={30}
                    ></Image>
                ) : (<Image onClick={handleClick}
                    src="/MaterialSymbolsBookmarkAdd.svg"
                    alt=""
                    width={30}
                    height={30}
                ></Image>)
            }
        </>
    )
}
