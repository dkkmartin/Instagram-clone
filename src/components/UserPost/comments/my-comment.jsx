'use client'
import Image from 'next/image'
import React from 'react'

export default function MyComment() {
    return (
        <>
            <form className='bg-white w-screen border py-5 px-2 flex sticky bottom-16 '>
                <Image
                    src="/MaterialSymbolsAccountCircle.svg"
                    alt=""
                    width={30}
                    height={30}
                    className='mr-4 ml-2'
                ></Image>
                <input type="text" placeholder='Tilføj en kommentar ...'></input>
                <input className='text-sky-600 font-semibold font-mono' type="submit" value="Slå op" />
            </form>
        </>
    )
}