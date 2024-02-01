import Image from "next/image";
import { useState, useEffect } from "react";

export default function SaveButton() {
    const [isClicked, setIsClicked] = useState(() => {
        const savedState = window.localStorage.getItem('save_button');
        return savedState ? JSON.parse(savedState) : true;
    });

    function handleClick() {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        window.localStorage.setItem('save_button', JSON.stringify(isClicked));
    }, [isClicked]);

    return (
        <>
            {isClicked ? (
                <Image
                    onClick={handleClick}
                    src="/MaterialSymbolsBookmarkAdd.svg"
                    alt="Save the content"
                    width={30}
                    height={30}
                />
            ) : (
                <Image
                    onClick={handleClick}
                    src="/MaterialSymbolsBookmarkAdded.svg"
                    alt="Unsave the content"
                    width={30}
                    height={30}
                />
            )}
        </>
    );
}
