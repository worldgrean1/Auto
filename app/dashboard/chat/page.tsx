"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getUsers } from "@/lib/user"
import { ChatLayout } from "@/components/chat-layout"

export default function ChatPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchUsers = async () => {
      try {
        const data = await getUsers(user.id)
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [user])

  if (!user || loading) {
    return (
      <div className="h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.16))]">
      <ChatLayout currentUser={user} users={users} />
    </div>
  )
}

