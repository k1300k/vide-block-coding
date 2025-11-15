import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Vibe Workflow - 워크플로우 자동화 플랫폼',
  description: 'AI 개발자를 위한 3단계 워크플로우 자동화 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}

