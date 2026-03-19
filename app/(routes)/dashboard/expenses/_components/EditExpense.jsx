"use client"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditExpense({ expense, refreshData }) {
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);

    const onUpdateExpense = async () => {
        const result = await db.update(Expenses).set({
            name: name,
            amount: amount,
        }).where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast('Expense Updated!');
            refreshData();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit className='text-blue-600 cursor-pointer h-5 w-5 hover:scale-110 transition-all' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                </DialogHeader>
                <div className='mt-5'>
                    <div className='mt-2'>
                        <h2 className='text-black font-medium my-1'>Expense Name</h2>
                        <Input
                            defaultValue={expense.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                        <Input
                            type="number"
                            defaultValue={expense.amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => onUpdateExpense()} className="mt-4 w-full p-5 bg-[#4845d2] hover:bg-[#3b38c0]  text-white">
                            Update Expense
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditExpense