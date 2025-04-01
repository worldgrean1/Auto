"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingHero } from "@/components/landing-hero"
import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFeatures } from "@/components/landing-features"
import { LandingFooter } from "@/components/landing-footer"
import { getSession } from "@/lib/auth"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (session) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
      </main>
      <LandingFooter />
    </div>
  )
}

