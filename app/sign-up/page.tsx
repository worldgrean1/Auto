"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignUpForm } from "@/components/sign-up-form"
import { getSession } from "@/lib/auth"

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (session) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Create your account</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

