import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

// Inter for body text, Space Grotesk for that "Tech/Fintech" heading feel
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
  description: 'Master your finances with cinematic analytics and real-time budget tracking.',
  icons: {
    icon: '/logo.svg', // Ensures your brand shows up in the browser tab
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
        baseTheme: dark,
        variables: {
          colorPrimary: '#10b981', // Emerald 500
          colorBackground: '#0a0a0a',
          colorText: '#ffffff',
          colorInputBackground: '#111111',
          colorInputText: '#ffffff',
          colorTextSecondary: '#a1a1aa', // gray-400
        },
        elements: {
          card: 'bg-[#0a0a0a] border border-white/10 shadow-2xl',
          navbar: 'bg-[#0a0a0a]',
          headerTitle: 'text-white font-black',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
          socialButtonsBlockButtonText: 'text-white font-bold',
          formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-black font-black',
          footerActionText: 'text-zinc-400',
          footerActionLink: 'text-emerald-500 hover:text-emerald-400',
          formFieldLabel: 'text-zinc-400 font-bold uppercase tracking-widest text-[10px]',
          formFieldInput: 'bg-white/5 border-white/10 text-white focus:border-emerald-500/50 transition-all',
          userButtonPopoverCard: 'bg-[#0a0a0a] border border-white/10',
          userButtonPopoverActionButton: 'hover:bg-white/5',
          userButtonPopoverActionButtonText: 'text-white',
          userButtonPopoverActionButtonIcon: 'text-emerald-500',
        }
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#050505] text-white selection:bg-emerald-500/30`}
        >
          {/* Modern Toaster configuration:
              - Theme set to dark
              - Positioned for desktop/mobile optimization
          */}
          <Toaster
            theme="dark"
            position="bottom-right"
            richColors
            closeButton
          />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}