'use client';

import PrimaryNavbar from '@/components/navbar';
import Post from '@/components/post';
import { NextUIProvider } from '@nextui-org/react';

export default function Home() {
  return (
    <NextUIProvider>
      <div className="container">
        <h1 className='mb-10 text-center font-bold text-3xl'>instagram 2.0</h1>
        <PrimaryNavbar />
        <Post />
        <Post />
        <Post />


      </div>
    </NextUIProvider>
  );
}
