"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Facebook, Twitter, Instagram, Linkedin, Tag } from "lucide-react"
import { format } from "date-fns"

interface CampaignPreviewProps {
  campaignData: {
    title: string
    description: string
    content: string
    platforms: string[]
    tags: string[]
    scheduledDate: Date | null
    mediaItems: any[]
  }
  onPublish: () => void
  isSubmitting: boolean
}

export function CampaignPreview({ campaignData, onPublish, isSubmitting }: CampaignPreviewProps) {
  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-[#0A66C2]" />
      case "twitter":
        return <Twitter className="h-5 w-5 text-[#1DA1F2]" />
      case "instagram":
        return <Instagram className="h-5 w-5 text-[#E1306C]" />
      case "facebook":
        return <Facebook className="h-5 w-5 text-[#1877F2]" />
      default:
        return null
    }
  }

  const getPlatformName = (platformId: string) => {
    switch (platformId) {
      case "linkedin":
        return "LinkedIn"
      case "twitter":
        return "Twitter"
      case "instagram":
        return "Instagram"
      case "facebook":
        return "Facebook"
      default:
        return platformId
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Campaign Preview</CardTitle>
              <CardDescription>Review your campaign before publishing</CardDescription>
            </div>
            <Badge variant="outline">{campaignData.scheduledDate ? "Scheduled" : "Draft"}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Campaign Title</h3>
            <p className="text-lg font-semibold">{campaignData.title || "Untitled Campaign"}</p>
          </div>

          {campaignData.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p>{campaignData.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {campaignData.platforms.length === 0 ? (
                <p className="text-sm text-muted-foreground">No platforms selected</p>
              ) : (
                campaignData.platforms.map((platform) => (
                  <div key={platform} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                    {getPlatformIcon(platform)}
                    <span>{getPlatformName(platform)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {campaignData.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {campaignData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Schedule</h3>
            {campaignData.scheduledDate ? (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(campaignData.scheduledDate, "PPP")}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{format(campaignData.scheduledDate, "p")}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No schedule set</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              {campaignData.platforms.map((platform) => (
                <TabsTrigger key={platform} value={platform}>
                  {getPlatformName(platform)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-lg border overflow-hidden">
                <div className="bg-muted p-4 flex items-center justify-between">
                  <h3 className="font-medium">Content Preview</h3>
                </div>
                <div className="p-4">
                  {campaignData.content ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">{campaignData.content}</div>
                  ) : (
                    <p className="text-muted-foreground">No content added yet</p>
                  )}
                </div>
              </div>

              {campaignData.mediaItems.length > 0 && (
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-medium">Media Preview</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {campaignData.mediaItems.map((item, index) => (
                      <div key={index} className="rounded-md border overflow-hidden">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name || `Media ${index + 1}`}
                          className="aspect-square object-cover w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {campaignData.platforms.map((platform) => (
              <TabsContent key={platform} value={platform} className="space-y-4">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted p-4 flex items-center gap-2">
                    {getPlatformIcon(platform)}
                    <h3 className="font-medium">{getPlatformName(platform)} Preview</h3>
                  </div>
                  <div className="p-4">
                    {campaignData.content ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">{campaignData.content}</div>
                    ) : (
                      <p className="text-muted-foreground">No content added yet</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            Export as PDF
          </Button>
          <Button onClick={onPublish} disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Campaign"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

