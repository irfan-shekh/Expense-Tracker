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
import { ArrowLeft, Trash } from 'lucide-react'; // Added ArrowLeft
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';
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
    // Next.js 16/15 Unwrap Params
    const params = use(paramsPromise);
    const { id } = params;

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();

    useEffect(() => {
        user && getBudgetInfo();
    }, [user]);

    /**
     * Used to get Budget Information
     */
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

    /**
     * Get Latest Expenses
     */
    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, id))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget = async () => {
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, id))
            .returning();

        if (deleteExpenseResult) {
            await db.delete(Budgets)
                .where(eq(Budgets.id, id))
                .returning();
        }
        toast('Budget Deleted!');
        route.replace('/dashboard/budgets');
    }

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>
                <span className='flex gap-2 items-center'>
                    <ArrowLeft 
                        onClick={() => route.back()} 
                        className='cursor-pointer hover:text-primary' 
                    />
                    My Expenses
                </span>
                <div className='flex gap-2 items-center'>
                    <EditBudget 
                        budgetInfo={budgetInfo} 
                        refreshData={() => getBudgetInfo()} 
                    />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="flex gap-2">
                                <Trash /> Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget 
                                    along with all expenses.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget()}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className='h-[150px ] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                )}
                <AddExpense 
                    budgetId={id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseListTable
                    expensesList={expensesList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen;