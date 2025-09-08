import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryProvider } from '@/providers/react-query'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Innovation Brindes',
  description: 'E-commerce de brindes personalizados',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
