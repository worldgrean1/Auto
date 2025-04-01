"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share2, Calendar, Bell, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

interface Activity {
  id: string
  type: "post" | "schedule" | "engagement" | "notification"
  description: string
  timestamp: string
  platform?: "linkedin" | "instagram" | "twitter" | "facebook"
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
          type: "post",
          description: "Your post on LinkedIn received 45 likes",
          timestamp: "2 minutes ago",
          platform: "linkedin",
        },
        {
          id: "2",
          type: "schedule",
          description: "New post scheduled for Instagram tomorrow at 9:00 AM",
          timestamp: "1 hour ago",
          platform: "instagram",
        },
        {
          id: "3",
          type: "engagement",
          description: "Your Twitter post was retweeted 12 times",
          timestamp: "3 hours ago",
          platform: "twitter",
        },
        {
          id: "4",
          type: "notification",
          description: "Campaign 'Summer Sale' has completed",
          timestamp: "5 hours ago",
        },
        {
          id: "5",
          type: "post",
          description: "Your Facebook post reached 1,200 people",
          timestamp: "Yesterday",
          platform: "facebook",
        },
      ])
      setLoading(false)
    }

    fetchActivities()
  }, [userId])

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-[#0A66C2]" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-[#E1306C]" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-[#1877F2]" />
      default:
        return null
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Share2 className="h-4 w-4 text-primary" />
      case "schedule":
        return <Calendar className="h-4 w-4 text-primary" />
      case "engagement":
        return <MessageSquare className="h-4 w-4 text-primary" />
      case "notification":
        return <Bell className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Badge variant="outline" className="ml-2">
            New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-[250px] rounded bg-muted animate-pulse" />
                    <div className="h-3 w-[100px] rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{activity.description}</p>
                      {activity.platform && <div className="ml-2">{getPlatformIcon(activity.platform)}</div>}
                    </div>
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

