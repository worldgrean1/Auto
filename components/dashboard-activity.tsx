"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, LogIn, UserPlus } from "lucide-react"

interface Activity {
  id: string
  type: "message" | "login" | "contact"
  description: string
  timestamp: string
}

interface DashboardActivityProps {
  userId: string
}

export function DashboardActivity({ userId }: DashboardActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchActivities = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      setActivities([
        {
          id: "1",
          type: "message",
          description: "You sent a message to Jane Doe",
          timestamp: "2 minutes ago",
        },
        {
          id: "2",
          type: "login",
          description: "You logged in from a new device",
          timestamp: "1 hour ago",
        },
        {
          id: "3",
          type: "contact",
          description: "You added John Smith to your contacts",
          timestamp: "3 hours ago",
        },
        {
          id: "4",
          type: "message",
          description: "You received a message from Alex Johnson",
          timestamp: "5 hours ago",
        },
      ])
      setLoading(false)
    }

    fetchActivities()
  }, [userId])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-primary" />
      case "login":
        return <LogIn className="h-4 w-4 text-amber-500" />
      case "contact":
        return <UserPlus className="h-4 w-4 text-emerald-500" />
      default:
        return null
    }
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Badge variant="secondary" className="font-normal">
            Today
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          {loading ? (
            <div className="space-y-6 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-[250px] rounded bg-muted animate-pulse" />
                    <div className="h-3 w-[100px] rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

