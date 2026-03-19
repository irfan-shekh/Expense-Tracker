import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import EditExpense from './EditExpense'

function ExpenseListTable({ expensesList, refreshData }) {

    /**
     * Used to Delete individual expense
     * @param {*} expense 
     */
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast('Expense Deleted!');
            refreshData();
        }
    }

    /**
     * Helper to format Date objects safely
     */
    const formatDate = (dateValue) => {
        if (!dateValue) return 'N/A';
        // If it's already a string, return it. If it's an object, convert to string.
        const date = new Date(dateValue);
        return date.toLocaleDateString();
    }

    return (
        <div className='mt-3'>
            <div className='grid grid-cols-4 bg-slate-200 p-2 font-bold'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            
            {expensesList && expensesList.length > 0 ? expensesList.map((expenses, index) => (
                <div className='grid grid-cols-4 bg-slate-50 p-2 border-b' key={index}>
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    
                    {/* FIXED: Using a helper to ensure we render a String, not an Object */}
                    <h2>{formatDate(expenses.createdAt)}</h2>
                    
                    <div className='flex gap-3 items-center'>
                        {/* Edit Expense Component */}
                        <EditExpense
                            expense={expenses}
                            refreshData={refreshData}
                        />

                        {/* Delete Action */}
                        <Trash
                            className='text-red-600 cursor-pointer hover:scale-110 transition-all h-5 w-5'
                            onClick={() => deleteExpense(expenses)}
                        />
                    </div>
                </div>
            )) :
                /* Loading Skeleton */
                [1, 2, 3].map((item, index) => (
                    <div key={index} className='h-12.5 w-full bg-slate-100 animate-pulse mt-2 rounded-lg'>
                    </div>
                ))
            }
        </div>
    )
}

export default ExpenseListTable