import React from 'react';
import { Button } from '@nextui-org/react';

export default function LogOutButton() {
    const clearTokenCookie = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 2020 00:00:00 GMT; path=/";
        window.location.reload();
    };

    return (
        <Button onClick={clearTokenCookie} isIconOnly color="none" className='text-red-600'>
            Log af
        </Button>
    );
}
