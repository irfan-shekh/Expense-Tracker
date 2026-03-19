"use client"
import Link from 'next/link'
import React from 'react'

function BudgetItem({ budget }) {

    // Logic to calculate progress percentage
    const calculateProgressPerc = () => {
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc > 100 ? 100 : perc.toFixed(2);
    }

    return (
        <Link href={'/dashboard/expenses/' + budget?.id} >
            <div className='p-5 border rounded-lg
        hover:shadow-md cursor-pointer h-[170px ] flex flex-col justify-between'>

                {/* TOP SECTION: Icon, Name, and Total Budget Amount */}
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
                            {budget?.icon}
                        </h2>
                        <div>
                            <h2 className='font-bold'>{budget.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                        </div>
                    </div>
                    {/* Ensure this stays on the far right */}
                    <h2 className='font-bold text-purple-700 text-lg'>${budget.amount}</h2>
                </div>

                {/* BOTTOM SECTION: Spend vs Remaining and Progress Bar */}
                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        <h2 className='textz text-slate-400'>
                            ${budget.totalSpend ? budget.totalSpend : 0} Spent
                        </h2>
                        <h2 className='text-xs text-slate-400'>
                            ${budget.amount - (budget.totalSpend || 0)} Remaining
                        </h2>
                    </div>

                    {/* Progress Bar Container */}
                    <div className='w-full bg-slate-200 h-2 rounded-full overflow-hidden'>
                        <div
                            className='bg-purple-700 h-2 rounded-full transition-all duration-500'
                            style={{
                                width: `${calculateProgressPerc()}%`
                            }}
                        >
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default BudgetItem