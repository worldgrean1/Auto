import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Campaign } from "@/lib/types"
import { Calendar, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

interface CampaignDetailsProps {
  campaign: Campaign
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge className="mt-1" variant={campaign.status === "published" ? "default" : "outline"}>
                {campaign.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{campaign.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Schedule</h3>
              <div className="flex items-center mt-1">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{new Date(campaign.scheduledDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mt-1">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{new Date(campaign.scheduledDate).toLocaleTimeString()}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Platforms</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {campaign.platforms.map((platform) => (
                  <div key={platform} className="flex items-center rounded-full bg-muted px-2.5 py-1 text-xs">
                    {getPlatformIcon(platform)}
                    <span className="ml-1 capitalize">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {campaign.status === "published" && campaign.performance && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Likes</p>
                <p className="text-2xl font-bold">{campaign.performance.likes}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">{campaign.performance.comments}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Shares</p>
                <p className="text-2xl font-bold">{campaign.performance.shares}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

