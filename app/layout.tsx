import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DiscreetProvider } from '@/components/discreet-provider'
import { LanguageProvider } from '@/components/language-provider'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: 'JARYK - Support & Safety',
  description: 'Safety resources and support services',
  generator: 'Next.js',
  applicationName: 'JARYK',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'JARYK',
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#7C6CA8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            <DiscreetProvider>
              {children}
            </DiscreetProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
