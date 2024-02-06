import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function SaveButton({ postId }) {
    const [isSaved, setIsSaved] = useState(false);

    const checkSavedStatus = useCallback(async () => {
        try {
            const response = await fetch('/api/saved/getSaved', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.saved && data.saved.includes(postId)) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [postId]);

    const updateSavedStatus = useCallback(async () => {
        try {
            const response = await fetch('/api/saved/setSaved', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }),
            });

            const data = await response.json();

            if (data.code === 200) {
                setIsSaved(true);
            } else if (data.code === 201) {
                setIsSaved(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [postId]);

    useEffect(() => {
        checkSavedStatus();
    }, [checkSavedStatus]);

    const handleClick = async () => {
        try {
            setIsSaved(!isSaved);

            await updateSavedStatus(postId);
        } catch (error) {
            setIsSaved(!isSaved);
            console.error(error);
        }
    };

    return (
        <>
            {isSaved

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
