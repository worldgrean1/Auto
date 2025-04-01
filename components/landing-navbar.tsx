import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingNavbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SocialAuto</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href="/sign-in">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

