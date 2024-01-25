'use client'
import React from 'react'
import UserComment from '../../components/UserPost/comments/user-comments'
import MyComment from '@/components/UserPost/comments/my-comment'

export default function PostComment() {
    return (
        <div>
            <header className='flex p-3'>
                <button><a href="../"><img src="../arrow_back.png" alt="back" /></a></button>
                <h1 className='mx-auto'>Kommentarer</h1>
            </header>
            <section className='flex'>
                <div className='flex flex-wrap'>
                    <span>
                        Navn
                    </span>
                    <span>
                        Kommentar
                    </span>
                </div>
            </section>
            <UserComment />
            <MyComment />
        </div>
    )
}
