"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, Facebook, Instagram, Linkedin, Twitter, ThumbsUp, MessageSquare, Repeat } from "lucide-react"
import type { Campaign } from "@/lib/types"
import { getHistoricalCampaigns } from "@/lib/campaigns"

export function CampaignHistory() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getHistoricalCampaigns()
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
      <div className="space-y-4">
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
          </Card>
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-xl mb-2">No post history</CardTitle>
        <CardDescription>You haven't published any posts yet. Create a new campaign to get started.</CardDescription>
        <Button className="mt-4" onClick={() => router.push("/dashboard/campaigns/new")}>
          Create Campaign
        </Button>
      </Card>
    )
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{campaign.name}</CardTitle>
              <Badge variant={campaign.status === "published" ? "default" : "secondary"}>{campaign.status}</Badge>
            </div>
            <CardDescription>
              {campaign.description.length > 100
                ? `${campaign.description.substring(0, 100)}...`
                : campaign.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Calendar className="mr-1 h-4 w-4" />
              <span>
                Published on {new Date(campaign.publishedDate || campaign.scheduledDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <div className="flex space-x-1">
                {campaign.platforms.map((platform) => (
                  <div key={platform} className="rounded-full bg-muted p-1">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
              </div>

              <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/campaigns/${campaign.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{campaign.performance?.likes || 0} likes</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{campaign.performance?.comments || 0} comments</span>
              </div>
              <div className="flex items-center">
                <Repeat className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{campaign.performance?.shares || 0} shares</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

