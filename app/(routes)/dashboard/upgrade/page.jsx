import React from 'react'

function Upgrade() {
    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl'>Upgrade to Pro</h2>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='p-8 border rounded-2xl shadow-sm bg-white'>
                    <h3 className='text-xl font-semibold'>Free Plan</h3>
                    <p className='text-4xl font-bold mt-4'>$0</p>
                    <ul className='mt-5 space-y-2 text-gray-600'>
                        <li>✅ Up to 5 Budgets</li>
                        <li>✅ Basic Expense Tracking</li>
                    </ul>
                </div>
                <div className='p-8 border-2 border-primary rounded-2xl shadow-md bg-white'>
                    <h3 className='text-xl font-semibold'>Pro Plan</h3>
                    <p className='text-4xl font-bold mt-4'>$4.99<span className='text-sm font-normal'>/mo</span></p>
                    <ul className='mt-5 space-y-2 text-gray-600'>
                        <li>✅ Unlimited Budgets</li>
                        <li>✅ Advanced Analytics</li>
                        <li>✅ Export to CSV</li>
                    </ul>
                    <button className='mt-8 w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-700'>
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Upgrade