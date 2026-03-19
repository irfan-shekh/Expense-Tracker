"use client"
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
function Header() {
    const { User, isSignedIn } = useUser();
    return (
        <div className='p-5 flex justify-between  border'>
            <Image src={'./logo.svg'}
                alt='logo'
                width={190}
                height={170}
            />
            {isSignedIn ?
                <UserButton /> :
                <Link href={'/sign-in'}><Button size='lg'>Login</Button></Link>}

        </div>
    )
}

export default Header