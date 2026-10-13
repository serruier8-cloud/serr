import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Serrurier Marrakech - Dépannage Serrurerie 7j/7",
    template: "%s | Serrurier Marrakech",
  },
  description: "Serrurier professionnel à Marrakech. Intervention rapide 30 min. Ouverture de porte, changement serrure, blindage. Devis gratuit 7j/7.",
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  verification: { google: "ttXOTzYPpnVN2Y6VsnailRyDtR1rr47u2hk8KD3pnzI" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
