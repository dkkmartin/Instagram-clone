import Image from "next/image";
import { useState } from "react";

export default function LikeButton() {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked)
  }

  return (
    <>
      {
        isClicked ? (
          <Image onClick={handleClick}
            src="/MaterialSymbolsFavoriteRed.svg"
            alt=""
            width={30}
            height={30}
          ></Image>
        ) : (<Image onClick={handleClick}
          src="/MaterialSymbolsFavoriteBlack.svg"
          alt=""
          width={30}
          height={30}
        ></Image>)
      }
    </>
  )
}
