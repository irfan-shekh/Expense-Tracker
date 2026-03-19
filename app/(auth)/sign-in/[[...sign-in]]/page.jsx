import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        
        <div className="flex min-h-screen w-full font-sans">
            {/* ===========================================================
        1. Left Side: The Expense Tracker Illustration (Graphic)
        ===========================================================
        - flex-1: The graphic takes up half the width on large screens.
        - hidden lg:flex: Hidden on mobile/tablet, visible only on large screens and up.
        - bg-emerald-50: A light green background for context (you can make this a dark gradient for your theme).
      */}
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center p-12 bg-emerald-50">
                <div className="flex flex-col gap-10 max-w-lg">

                    {/* Main Illustration Title */}
                    <div className="text-center space-y-2">
                        <h1 className="text-5xl font-extrabold text-emerald-950 tracking-tighter">
                            Track Smart
                        </h1>
                        <p className="text-xl text-emerald-700/80">
                            Effortlessly monitor your cash flow and optimize your spending with powerful insights.
                        </p>
                    </div>

                    {/* Simple Visual Graphic */}
                    <div className="relative aspect-10/7 bg-white rounded-3xl shadow-xl border border-neutral-100 p-8">
                        <div className="absolute top-6 left-6 text-2xl font-bold text-neutral-800">Overview</div>
                        <div className="absolute top-6 right-6 text-sm text-neutral-500">Jan 2024</div>

                        {/* Visualizing Data Bars */}
                        <div className="flex h-full items-end gap-3 mt-10">
                            <div className="w-10 h-32 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-48 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-24 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-56 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-36 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-64 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-40 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-52 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-28 bg-emerald-500 rounded-t-lg"></div>
                            <div className="w-10 h-60 bg-emerald-500 rounded-t-lg"></div>
                        </div>

                        {/* Context Floating Icons */}
                        <div className="absolute -top-12 -right-12 text-6xl opacity-20">📈</div>
                        <div className="absolute -bottom-10 -left-10 text-6xl opacity-20">💰</div>
                    </div>

                    {/* Key Features List */}
                    <div className="grid grid-cols-2 gap-6 text-emerald-900 font-medium text-lg">
                        <p className="flex items-center gap-3">✅ Automated Categorization</p>
                        <p className="flex items-center gap-3">✅ Real-time Analytics</p>
                        <p className="flex items-center gap-3">✅ Smart Budgeting</p>
                        <p className="flex items-center gap-3">✅ Detailed Reports</p>
                    </div>
                </div>
            </div>

            {/* ===========================================================
        2. Right Side: Centered Clerk Sign-In Form
        ===========================================================
        - lg:w-[480px]: On large screens, the form container has a fixed width.
        - flex-1: On mobile, this container takes the full width.
        - justify-center items-center: Keeps the form vertically and horizontally centered.
      */}
            <div className="flex-1 lg:w-480px lg:flex-none flex flex-col items-center justify-center p-8 bg-neutral-50 border-l border-neutral-100">
                {/*
        OPTIONAL: If your RootLayout doesn't have min-h-screen,
        you may need min-h-screen here as well to center it.
        */}
                <div className="w-full flex justify-center py-10">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}