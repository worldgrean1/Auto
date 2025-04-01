"use client"

import type { User } from "@/lib/types"

// Mock users for frontend-only demo
const MOCK_USERS = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: null,
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    image: null,
  },
  {
    id: "user_3",
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    image: null,
  },
  {
    id: "user_4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    password: "password123",
    image: null,
  },
  {
    id: "demo_user",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
    image: null,
  },
]

// Session storage key
const SESSION_STORAGE_KEY = "user_session"

// Client-side session management using localStorage
export function getSession() {
  if (typeof window === "undefined") return null

  try {
    const sessionData = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!sessionData) return null

    const session = JSON.parse(sessionData)

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }

    return session
  } catch (error) {
    console.error("[GET_SESSION]", error)
    localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

export function createSession(user: User) {
  if (typeof window === "undefined") return null

  // Create session that expires in 7 days
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  const session = {
    user,
    expires: expires.toISOString(),
  }

  // Store session in localStorage
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))

  return session
}

export function clearSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

// Mock authentication functions
export function signIn({ email, password }: { email: string; password: string }) {
  // Find user with matching credentials
  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    return { success: false, error: "Invalid credentials" }
  }

  // Remove password from user object before storing in session
  const { password: _, ...userWithoutPassword } = user

  // Create and store session
  const session = createSession(userWithoutPassword)

  if (!session) {
    return { success: false, error: "Failed to create session" }
  }

  return { success: true, user: userWithoutPassword }
}

export function signUp(data: { name: string; email: string; password: string }) {
  // Check if user already exists
  const existingUser = MOCK_USERS.find((u) => u.email.toLowerCase() === data.email.toLowerCase())

  if (existingUser) {
    return { success: false, error: "User already exists" }
  }

  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password,
    image: null,
  }

  // In a real app, we would save this to a database
  // For demo, we'll just pretend it was saved

  return { success: true, userId: newUser.id }
}

// Helper function to check if user is authenticated
export function isAuthenticated() {
  return getSession() !== null
}

