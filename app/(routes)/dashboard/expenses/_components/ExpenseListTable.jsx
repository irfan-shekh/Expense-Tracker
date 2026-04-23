"use client"
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash2, Calendar, CreditCard, Tag } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import EditExpense from './EditExpense'
import { motion, AnimatePresence } from 'framer-motion'

function ExpenseListTable({ expensesList, refreshData }) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast.error('Transaction Terminated');
            refreshData();
        }
    }

    const formatDate = (dateValue) => {
        if (!dateValue) return 'N/A';
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <div className='mt-6 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md'>
            {/* Table Header */}
            <div className='grid grid-cols-4 bg-white/5 p-4 border-b border-white/5'>
                <h2 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2'>
                    <Tag className="h-3 w-3" /> Description
                </h2>
                <h2 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2'>
                    <CreditCard className="h-3 w-3" /> Amount
                </h2>
                <h2 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2'>
                    <Calendar className="h-3 w-3" /> Date
                </h2>
                <h2 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right pr-4'>
                    Manage
                </h2>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                    {expensesList && expensesList.length > 0 ? expensesList.map((expenses, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: index * 0.05 }}
                            className='grid grid-cols-4 p-4 items-center border-b border-white/5 hover:bg-white/[0.03] transition-colors group'
                            key={expenses.id || index}
                        >
                            <h2 className='text-sm font-semibold text-white/80 group-hover:text-white transition-colors'>
                                {expenses.name}
                            </h2>
                            <h2 className='text-sm font-mono font-bold text-emerald-400'>
                                ${expenses.amount.toLocaleString()}
                            </h2>
                            <h2 className='text-xs font-medium text-white/40'>
                                {formatDate(expenses.createdAt)}
                            </h2>

                            <div className='flex gap-4 items-center justify-end pr-2'>
                                <EditExpense
                                    expense={expenses}
                                    refreshData={refreshData}
                                />

                                <motion.button
                                    whileHover={{ scale: 1.2, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteExpense(expenses)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group/btn"
                                >
                                    <Trash2 className='text-white/20 group-hover/btn:text-red-500 h-4 w-4 transition-colors' />
                                </motion.button>
                            </div>
                        </motion.div>
                    )) :
                        /* Tactical Loading State */
                        [1, 2, 3, 4].map((item, index) => (
                            <div key={index} className='p-6 w-full border-b border-white/5 relative overflow-hidden'>
                                <div className="flex justify-between items-center opacity-20">
                                    <div className="h-4 w-1/4 bg-white/10 rounded animate-pulse" />
                                    <div className="h-4 w-1/6 bg-white/10 rounded animate-pulse" />
                                    <div className="h-4 w-1/6 bg-white/10 rounded animate-pulse" />
                                    <div className="h-4 w-1/12 bg-white/10 rounded animate-pulse" />
                                </div>
                            </div>
                        ))
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ExpenseListTable