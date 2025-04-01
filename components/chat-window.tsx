"use client"

import { useEffect, useRef, useState } from "react"
import type { User } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Image, Paperclip, Smile } from "lucide-react"
import { usePusher, triggerMockPusherEvent } from "@/lib/hooks/use-pusher"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  sender: {
    id: string
    name: string
    image: string | null
  }
}

interface ChatWindowProps {
  currentUser: User
  selectedUser: User | null
}

export function ChatWindow({ currentUser, selectedUser }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const pusher = usePusher()

  useEffect(() => {
    if (!selectedUser) return

    setMessages([])
    setLoading(true)

    // Mock fetching messages
    const fetchMessages = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockMessages: Message[] = [
          {
            id: "1",
            content: `Hi ${currentUser.name}, how are you?`,
            senderId: selectedUser.id,
            receiverId: currentUser.id,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: selectedUser.id,
              name: selectedUser.name,
              image: selectedUser.image,
            },
          },
          {
            id: "2",
            content: "I'm doing well, thanks for asking!",
            senderId: currentUser.id,
            receiverId: selectedUser.id,
            createdAt: new Date(Date.now() - 3000000).toISOString(),
            sender: {
              id: currentUser.id,
              name: currentUser.name,
              image: currentUser.image,
            },
          },
        ]

        setMessages(mockMessages)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    // Set up mock real-time updates
    if (pusher) {
      const channelName = [currentUser.id, selectedUser.id].sort().join("-")
      const channel = pusher.subscribe(channelName)

      channel.bind("new-message", (message: Message) => {
        setMessages((prev) => [...prev, message])
      })
    }
  }, [currentUser, selectedUser, pusher])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedUser) return

    try {
      // Create a new message
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        content: input,
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        createdAt: new Date().toISOString(),
        sender: {
          id: currentUser.id,
          name: currentUser.name,
          image: currentUser.image,
        },
      }

      // Add message to state
      setMessages((prev) => [...prev, newMessage])

      // Clear input
      setInput("")

      // Simulate receiving a response after a delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          content: `Thanks for your message: "${input}"`,
          senderId: selectedUser.id,
          receiverId: currentUser.id,
          createdAt: new Date().toISOString(),
          sender: {
            id: selectedUser.id,
            name: selectedUser.name,
            image: selectedUser.image,
          },
        }

        // Trigger mock Pusher event
        const channelName = [currentUser.id, selectedUser.id].sort().join("-")
        triggerMockPusherEvent(channelName, "new-message", responseMessage)
      }, 2000)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Select a contact</h3>
          <p className="text-sm text-muted-foreground">Choose a contact to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-4 border-b p-4">
        <Avatar>
          <AvatarImage src={selectedUser.image || ""} alt={selectedUser.name} />
          <AvatarFallback>{selectedUser.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{selectedUser.name}</h3>
          <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 animate-pulse h-12",
                    i % 2 === 0 ? "bg-muted" : "bg-primary text-primary-foreground",
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-end gap-2">
                    {!isCurrentUser && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.sender.image || ""} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-md rounded-lg p-3",
                        isCurrentUser ? "bg-primary text-primary-foreground" : "bg-accent",
                      )}
                    >
                      <p>{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
            <Image className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" disabled={!input.trim()} className="flex-shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

