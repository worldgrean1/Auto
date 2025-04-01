"use client"

import type { User } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  users: User[]
  selectedUser: User | null
  onSelectUser: (user: User) => void
}

export function ChatSidebar({ users, selectedUser, onSelectUser }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-full max-w-xs border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-73px)]">
        <div className="p-2">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">No contacts found</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                  selectedUser?.id === user.id ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                )}
                onClick={() => onSelectUser(user)}
              >
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

