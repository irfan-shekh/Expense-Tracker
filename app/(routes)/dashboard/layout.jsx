"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { Budgets } from '../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { db } from '../../../utils/dbConfig'
import { useRouter } from 'next/navigation'  

function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();  

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            checkUserBudgets();
        }
    }, [user])

    const checkUserBudgets = async () => {
        try {
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

            console.log("Budgets found:", result);

            
            if (result?.length === 0) {
                router.replace('/dashboard/budgets');  
            }
        } catch (error) {
            console.error("Database query failed:", error);
        }
    }

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                <DashboardHeader />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout