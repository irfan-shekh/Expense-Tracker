"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp } from 'lucide-react';

function Dashboard() {
    const { user } = useUser();

    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

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
        getAllExpenses();
    }

    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Expenses.id));

        setExpensesList(result);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-10 bg-[#050505] min-h-screen text-white'
        >
            {/* 1. Cinematic Header Section */}
            <header className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10'>
                <div>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='h-1 w-8 bg-emerald-500 rounded-full' />
                        <span className='text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80'>
                            Operational Intelligence
                        </span>
                    </div>
                    <h2 className='text-4xl font-black tracking-tighter'>
                        System Overview, <span className='text-white/40 font-light italic'>{user?.firstName}</span>
                    </h2>
                    <p className='text-sm text-white/30 mt-2 font-medium max-w-md uppercase tracking-tight'>
                        Real-time fiscal monitoring and categorical expenditure analysis.
                    </p>
                </div>

                <div className='hidden lg:flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl'>
                    <TrendingUp className='h-4 w-4 text-emerald-400' />
                    <span className='text-[10px] font-bold text-white/60 tracking-widest uppercase'>
                        Network Status: Optimal
                    </span>
                </div>
            </header>

            {/* 2. Intelligence Cards (Stats) */}
            <CardInfo budgetList={budgetList} />

            <div className='grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10'>
                {/* 3. Main Analytics Column */}
                <div className='lg:col-span-2 space-y-10'>
                    <div className='relative group'>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent blur opacity-0 group-hover:opacity-100 transition duration-1000' />
                        <BarChartDashboard budgetList={budgetList} />
                    </div>

                    <div className='mt-8'>
                        <div className='flex items-center gap-4 mb-6'>
                            <h2 className='font-black text-xl tracking-tight flex items-center gap-2'>
                                <LayoutDashboard className='h-5 w-5 text-emerald-500' />
                                Recent Transactions
                            </h2>
                            <div className='h-[1px] flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent' />
                        </div>
                        <ExpenseListTable
                            expensesList={expensesList}
                            refreshData={() => getBudgetList()}
                        />
                    </div>
                </div>

                {/* 4. Side Ledger Column */}
                <aside className='space-y-6'>
                    <div className='flex items-center justify-between px-2'>
                        <h2 className='font-black text-xs uppercase tracking-[0.2em] text-white/30'>Active Budgets</h2>
                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse' />
                    </div>

                    <div className='grid gap-6'>
                        {budgetList.length > 0 ? budgetList.map((budget, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BudgetItem budget={budget} />
                            </motion.div>
                        )) : (
                            [1, 2, 3].map((i) => (
                                <div key={i} className='h-[180px] w-full bg-white/[0.03] border border-white/5 rounded-[2rem] animate-pulse' />
                            ))
                        )}
                    </div>
                </aside>
            </div>
        </motion.div>
    )
}

export default Dashboard