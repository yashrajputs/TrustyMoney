import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center ml-4">
          <Image src="/trusty-money-logo.png" alt="Trusty Money" width={150} height={40} className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#company"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Company
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm font-medium">
            Login
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
