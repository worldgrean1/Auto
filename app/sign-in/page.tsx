"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SignInForm } from "@/components/sign-in-form"
import { isAuthenticated } from "@/lib/auth"

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      router.push("/dashboard")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-10">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

