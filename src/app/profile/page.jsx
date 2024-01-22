"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
    return (
        <section className="profileContainer">
            <header className="topHeader">
                <h1 className="userName">Navn</h1>
                <li className="userSettings"><FontAwesomeIcon icon={faBars}/></li>
            </header>
            <img className="userImg" src="https://placehold.co/200x200" alt="" />

            <div className="bioContainer">
                <p className="userBio">bio</p>
                <p className="userLocation">location</p>
            </div>

            <section className="galleryContainer">
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                <img className="galleryImage" src="https://placehold.co/200x200" alt="" />
                </section>
        </section>
    )
}