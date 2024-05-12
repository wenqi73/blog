import { type Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import { Layout } from '../components/Layout'

import '../styles/tailwind.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Wenqi Chen',
    default: 'Wenqi Chen - Prompt engineer',
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`flex h-full bg-zinc-50 dark:bg-black ${outfit.className}`}
      >
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
