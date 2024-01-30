'use client'
import React from 'react'
import UserComment from '../../components/UserPost/comments/user-comments'
import MyComment from '@/components/UserPost/comments/my-comment'

export default function PostComment() {
    return (
        <div>
            <header className='flex p-3 border'>
                <button><a href="../"><img src="../arrow_back.png" alt="back" /></a></button>
                <h1 className='mx-auto font-semibold font-mono'>Kommentarer</h1>
            </header>
            <section className='flex border py-5 px-2'>
                <div className='flex flex-wrap gap-1'>
                    <span className='font-black font-mono'>
                        Navn Efternavn
                    </span>
                    <span className='font-mono'>
                        Kommentar
                    </span>
                </div>
            </section>
            <UserComment />
            <UserComment />
            <UserComment />
            <UserComment />
            <UserComment />
            <MyComment />
        </div>
    )
}
