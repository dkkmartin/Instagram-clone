'use client'
import React from 'react'

export default function UserComment() {
    return (
        <>
            <section className='flex border py-5 px-2'>
                <img src='https://via.placeholder.com/30x30' alt='alt' />
                <div className='flex flex-wrap gap-1'>
                    <span className='font-black font-mono'>
                        Navn Efternavn
                    </span>
                    <span className='font-mono'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Adipisci cumque deleniti optio laudantium omnis tempora veniam impedit.
                    </span>
                </div>
            </section>
        </>
    )
}