import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Python Code Editor',
  description: 'A Next.js app with a Python code editor using react-py',
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