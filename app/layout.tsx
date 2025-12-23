import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/trusty/header"
import { Footer } from "@/components/trusty/footer"
import { TransitionProvider } from "@/components/transition-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Trusty Money - The Operating System for Cross-Border Business",
  description:
    "Financial infrastructure purpose-built for cross-border business. Accept international payments, automate billing and tax compliance, with zero FX markup.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <TransitionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  )
}
