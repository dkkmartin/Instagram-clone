'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function SaveButton({ postId }) {
    const [isClicked, setIsClicked] = useState(false)
    const [saved, setSaved] = useState([])

    const handleSavedStatus = useCallback(() => {
        if (saved && saved.saved && saved.saved.includes(postId)) {
            setIsClicked(true)
        }
    }, [saved, postId])

    useEffect(() => {
        const checkSavedStatus = async () => {
            const response = await fetch('/api/save/getSave', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            return data
        }
        const saveSavedInState = async () => {
            const savedStatus = await checkSavedStatus()
            setSaved(savedStatus)
        }
        saveSavedInState()
    }, [])

    useEffect(() => {
        handleSavedStatus()
    }, [handleSavedStatus])

    const updateSavedStatus = async (postId) => {
        const response = await fetch('/api/save/setSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId }),
        })

        const data = await response.json()
        return data
    }

    async function handleClick() {
        try {
            // Optimistically update the UI
            setIsClicked(!isClicked)
            const statusCode = await updateSavedStatus(postId)
            if (statusCode.code === 200) {
                setIsClicked(true)
            } else if (statusCode.code === 201) {
                setIsClicked(false)
            }
        } catch (error) {
            setIsClicked(!isClicked)
            console.log(error)
        }
    }


    return (
        <>
            {isClicked

                ? (
                    <Image
                        onClick={handleClick}
                        src="/MaterialSymbolsBookmarkAdded.svg"
                        alt="Unsave the content"
                        width={30}
                        height={30}
                    />
                )

                : (
                    <Image
                        onClick={handleClick}
                        src="/MaterialSymbolsBookmarkAdd.svg"
                        alt="Save the content"
                        width={30}
                        height={30}
                    />
                )

            }
        </>
    );
}
