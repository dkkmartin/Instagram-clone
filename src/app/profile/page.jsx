'use client'

import './profile.scss'
import Image from 'next/image'

export default function Profile() {
  return (
    <section className="profileContainer">
      <header className="topHeader">
        <h1 className="userName">Navn</h1>
      </header>
      <Image
        className="userImg"
        src="https://placehold.co/200x200"
        alt=""
        width={200}
        height={200}
      />

      <div className="bioContainer">
        <p className="userBio">bio</p>
        <p className="userLocation">location</p>
      </div>

      <section className="galleryContainer">
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
        <Image
          className="galleryImage"
          src="https://placehold.co/200x200"
          alt=""
          width={200}
          height={200}
        />
      </section>
    </section>
  )
}
