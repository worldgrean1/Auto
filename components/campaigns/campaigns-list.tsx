"use client"

import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Eye, Facebook, Instagram, Linkedin, Twitter, MoreHorizontal } from "lucide-react"
import type { Campaign } from "@/lib/types"
import { getScheduledCampaigns } from "@/lib/campaigns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CampaignsList() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getScheduledCampaigns()
        setCampaigns(data)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-1/2 bg-muted rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 w-full bg-muted rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-xl mb-2">No scheduled posts</CardTitle>
        <CardDescription>You don't have any posts scheduled. Create a new campaign to get started.</CardDescription>
        <Button className="mt-4" onClick={() => router.push("/dashboard/campaigns/new")}>
          Create Campaign
        </Button>
      </Card>
    )
  }

  const getPlatformIcon = (platform: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden light-card-hover dark-card-hover">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/campaigns/${campaign.id}`)}>
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/campaigns/${campaign.id}/edit`)}>
                    Edit campaign
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete campaign</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Scheduled for {new Date(campaign.scheduledDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>
                {new Date(campaign.scheduledDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {campaign.platforms.map((platform) => (
                  <div key={platform} className="rounded-full bg-muted p-1">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
              </div>

              <Badge className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getStatusColor(campaign.status))}>
                {campaign.status}
              </Badge>
            </div>

            {campaign.assignedTo && (
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={campaign.assignedTo.image} alt={campaign.assignedTo.name} />
                  <AvatarFallback>{campaign.assignedTo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>Assigned to {campaign.assignedTo.name}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/campaigns/${campaign.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/campaigns/${campaign.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

