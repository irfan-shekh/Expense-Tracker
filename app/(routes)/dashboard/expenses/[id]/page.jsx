"use client"
import { db } from '@/utils/dbConfig';
import { Expenses, Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState, use } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';
import { motion } from 'framer-motion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function ExpensesScreen({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { id } = params;

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();

    useEffect(() => {
        user && getBudgetInfo();
    }, [user]);

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, id))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();
    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, id))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
    }

    const deleteBudget = async () => {
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, id))
            .returning();

        if (deleteExpenseResult) {
            await db.delete(Budgets)
                .where(eq(Budgets.id, id))
                .returning();
        }
        toast.error('Budget Vault Purged');
        route.replace('/dashboard/budgets');
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='p-10 min-h-screen bg-[#050505] text-white'
        >
            {/* Header Section */}
            <div className='flex justify-between items-center mb-10'>
                <div className='flex gap-4 items-center'>
                    <motion.div
                        whileHover={{ x: -5 }}
                        className='p-2 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all'
                        onClick={() => route.back()}
                    >
                        <ArrowLeft className='h-5 w-5 text-emerald-400' />
                    </motion.div>
                    <div>
                        <h2 className='text-3xl font-black tracking-tight'>Expenses</h2>
                        <p className='text-xs font-bold uppercase tracking-widest text-white/30'>Transaction Log / {budgetInfo?.name}</p>
                    </div>
                </div>

                <div className='flex gap-3 items-center'>
                    <EditBudget
                        budgetInfo={budgetInfo}
                        refreshData={() => getBudgetInfo()}
                    />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="flex gap-2 bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all rounded-xl">
                                <Trash2 className="h-4 w-4" /> Purge
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#0f0f0f] border-white/10 rounded-[2rem] text-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-2xl font-black flex items-center gap-3">
                                    <ShieldAlert className="text-red-500 h-6 w-6" /> Confirm Purge
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-white/40">
                                    This protocol will permanently delete the <strong>{budgetInfo?.name}</strong> vault and all associated transaction history. This action is irreversible.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-6">
                                <AlertDialogCancel className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget()} className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
                                    Purge Data
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Content Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {budgetInfo ? (
                        <BudgetItem budget={budgetInfo} />
                    ) : (
                        <div className='h-[180px] w-full bg-white/[0.03] border border-white/5 animate-pulse rounded-[2rem]'></div>
                    )}
                </motion.div>

                <AddExpense
                    budgetId={id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
            </div>

            {/* Table Section */}
            <div className='mt-12'>
                <div className="flex items-center gap-4 mb-6">
                    <h2 className='font-black text-xl tracking-tight'>Latest Expenses</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
                </div>

                <ExpenseListTable
                    expensesList={expensesList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </motion.div>
    )
}

export default ExpensesScreen;