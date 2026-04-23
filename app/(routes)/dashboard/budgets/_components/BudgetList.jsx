"use client"
import React, { useEffect, useState } from 'react'
import CreatBudgets from './CreatBudgets'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import { motion, AnimatePresence } from 'framer-motion'

function BudgetList() {
    const [budgetList, setBudgetList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getBudgetList();
    }, [user])

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
    }

    return (
        <div className='mt-10'>
            {/* Header Section for the List */}
            <div className="flex items-center justify-between mb-8 px-2">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Your Budgets</h2>
                    <p className="text-sm text-white/40">Manage your limits and monitor spending flows</p>
                </div>
                <div className="hidden md:block h-[1px] flex-1 mx-8 bg-gradient-to-r from-emerald-500/50 to-transparent opacity-20"></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* 1. Create Budget Card (Always First) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CreatBudgets refreshData={() => getBudgetList()} />
                </motion.div>

                {/* 2. Budget Items with Staggered Entrance */}
                <AnimatePresence mode="popLayout">
                    {budgetList?.length > 0 ? (
                        budgetList.map((budget, index) => (
                            <motion.div
                                key={budget.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                            >
                                <BudgetItem budget={budget} />
                            </motion.div>
                        ))
                    ) : (
                        /* 3. High-End Skeleton Loaders */
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div
                                key={index}
                                className='w-full bg-white/[0.03] border border-white/5 rounded-[2rem] h-[180px] relative overflow-hidden'
                            >
                                {/* Shimmering Scanner Effect */}
                                <motion.div
                                    animate={{
                                        top: ['-100%', '200%'],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        delay: index * 0.2
                                    }}
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-1/2 w-full"
                                />

                                {/* Static Skeleton Content */}
                                <div className="p-7 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5" />
                                            <div className="space-y-2">
                                                <div className="w-24 h-4 rounded bg-white/5" />
                                                <div className="w-16 h-3 rounded bg-white/5" />
                                            </div>
                                        </div>
                                        <div className="w-16 h-6 rounded bg-white/5" />
                                    </div>
                                    <div className="mt-8 space-y-2">
                                        <div className="w-full h-2 rounded bg-white/5" />
                                        <div className="w-3/4 h-2 rounded bg-white/5" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default BudgetList