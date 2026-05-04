import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
// Removed the 'dark' theme import for Clerk to use the default light theme
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexa Ledger | Premium Expense Intelligence',
  description: 'Master your finances with clean analytics and real-time budget tracking.',
  icons: {
    icon: '/logo.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        // Switched to default light theme, but customized to match your branding
        variables: {
          colorPrimary: '#059669', // Emerald 600 for better contrast on white
          colorBackground: '#ffffff',
          colorText: '#0f172a', // Slate 900
          colorInputBackground: '#f8fafc', // Slate 50
          colorInputText: '#0f172a',
          colorTextSecondary: '#64748b', // Slate 500
        },
        elements: {
          card: 'bg-white border border-slate-200 shadow-xl',
          navbar: 'bg-white',
          headerTitle: 'text-slate-900 font-black',
          headerSubtitle: 'text-slate-500',
          socialButtonsBlockButton: 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50',
          socialButtonsBlockButtonText: 'text-slate-900 font-bold',
          formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold',
          footerActionText: 'text-slate-500',
          footerActionLink: 'text-emerald-600 hover:text-emerald-700',
          formFieldLabel: 'text-slate-500 font-bold uppercase tracking-widest text-[10px]',
          formFieldInput: 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500 transition-all',
          userButtonPopoverCard: 'bg-white border border-slate-200 shadow-lg',
          userButtonPopoverActionButton: 'hover:bg-slate-50',
          userButtonPopoverActionButtonText: 'text-slate-900',
          userButtonPopoverActionButtonIcon: 'text-emerald-600',
        }
      }}
    >
      {/* Changed class to "light" and removed colorScheme style */}
      <html lang="en" className="light">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#ffffff] text-slate-900 selection:bg-emerald-100 min-h-screen`}
        >
          <main className="min-h-screen w-full bg-[#ffffff]">
            {children}
          </main>

          <Toaster
            theme="light" // Switched Toaster to light
            position="bottom-right"
            richColors
            closeButton
          />
        </body>
      </html>
    </ClerkProvider>
  );
}