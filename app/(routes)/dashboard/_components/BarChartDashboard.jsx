"use client"
import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg'>Activity</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart
                    data={budgetList}
                    margin={{ top: 7 }}
                >
                    {/* Define the gradients here */}
                    <defs>
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4845d2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4845d2" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c3c2ff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#c3c2ff" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />

                    {/* Use the gradients in the fill */}
                    <Bar dataKey='totalSpend' stackId="a" fill="url(#colorSpend)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey='amount' stackId="a" fill="url(#colorAmount)" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartDashboard