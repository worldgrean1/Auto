import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="py-24 md:py-32">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Automate Your Social Media Presence
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
          Schedule, publish, and analyze your social media content across multiple platforms from one centralized
          dashboard.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/sign-up">
            <Button size="lg">Get started</Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

