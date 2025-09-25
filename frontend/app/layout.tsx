import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { ConditionalTubelightNav } from '@/components/navigation/conditional-tubelight-nav'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aethon AI - Strategic Intelligence Platform',
  description: 'Revolutionary AI-powered strategic intelligence platform with multi-agent orchestration, quantum optimization, and autonomous execution capabilities.',
  keywords: [
    'Aethon AI',
    'Strategic Intelligence',
    'Business Intelligence',
    'Strategic Planning',
    'Multi-Agent Systems',
    'Quantum Computing',
    'Competitive Intelligence',
    'Market Analysis',
    'Predictive Analytics',
    'WebRTC',
    'Real-time Collaboration',
    'PWA'
  ],
  authors: [{ name: 'Aethon AI Team' }],
  creator: 'Aethon AI',
  publisher: 'Aethon AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Aethon AI - Strategic Intelligence Platform',
    description: 'Revolutionary AI-powered strategic intelligence platform',
    siteName: 'Aethon AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aethon AI - Strategic Intelligence Platform',
    description: 'Revolutionary AI-powered strategic intelligence platform',
    creator: '@aethonai',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Strategic AI Platform',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
            <ConditionalTubelightNav />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
