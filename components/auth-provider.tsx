"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"
import { getSession, clearSession } from "@/lib/auth"

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    setUser(session?.user || null)
    setLoading(false)
  }, [])

  const signOut = () => {
    clearSession()
    setUser(null)
    router.push("/sign-in")
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

