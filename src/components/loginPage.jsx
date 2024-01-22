import Image from 'next/image'
import LoginButton from './loginButton'
import PreviousUser from './previousUser'
import React from 'react'
import { Link } from '@nextui-org/react'


export default function LoginPage() {
    return (
        <section className='flex items-center
        flex-col justify-evenly h-full '>

            <div className='w-full flex flex-col items-center'>
                <Image src="/appIcon.png" alt="App Icon" width={150} height={100} />
                <article className='mt-20 w-3/5'>
                    <PreviousUser />
                </article>
            </div>

            <div className='flex flex-col w-full items-center'>
                <LoginButton>login</LoginButton>
                <LoginButton>opret ny bruger</LoginButton>
            </div>

            <Link href={'privacy'}>Test</Link>
                    </section>
    )
}