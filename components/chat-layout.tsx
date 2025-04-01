"use client"

import { useState } from "react"
import type { User } from "@/lib/types"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatWindow } from "@/components/chat-window"

interface ChatLayoutProps {
  currentUser: User
  users: User[]
}

export function ChatLayout({ currentUser, users }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-lg border bg-card">
      <ChatSidebar users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow currentUser={currentUser} selectedUser={selectedUser} />
    </div>
  )
}

