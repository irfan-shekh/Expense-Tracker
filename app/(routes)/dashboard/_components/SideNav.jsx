"use client"
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link' 

function SideNav() {
    const menuList = [
        { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
        { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
        { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' },
        { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' },
    ]

    const path = usePathname();

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={'/logo.svg'} alt='logo' width={160} height={100} />
            
            <div className='mt-5'>
                {menuList.map((menu, index) => (
                   
                    <Link href={menu.path} key={index}>
                        <h2 
                            className={`flex gap-2 items-center text-gray-500 font-medium 
                            mb-2 p-5 cursor-pointer rounded-md hover:text-purple-700 hover:bg-blue-100
                            ${path === menu.path && 'text-purple-700 bg-blue-100'}`}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav