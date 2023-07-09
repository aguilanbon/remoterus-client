import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remote R Us',
  description: 'Developers searching for a place remotely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
