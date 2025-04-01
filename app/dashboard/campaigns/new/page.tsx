"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MediaBrowser } from "@/components/campaigns/media-browser"
import { SimpleEditor } from "@/components/campaigns/simple-editor"

export default function CreateCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("editor")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMediaBrowser, setShowMediaBrowser] = useState(false)
  const [editorError, setEditorError] = useState(false)

  // Campaign state
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    content: "",
    platforms: [] as string[],
    scheduledDate: null as Date | null,
    mediaItems: [] as any[],
  })

  const handleSaveDraft = () => {
    if (!campaignData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your campaign.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Draft saved",
        description: "Your campaign draft has been saved successfully.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const handlePublish = () => {
    if (!campaignData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your campaign.",
        variant: "destructive",
      })
      return
    }

    if (campaignData.platforms.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select at least one platform for your campaign.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Campaign scheduled",
        description: "Your campaign has been scheduled successfully.",
      })
      setIsSubmitting(false)
      router.push("/dashboard/campaigns")
    }, 1500)
  }

  const updateCampaignData = (data: Partial<typeof campaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...data }))
  }

  const togglePlatform = (platformId: string) => {
    if (campaignData.platforms.includes(platformId)) {
      updateCampaignData({
        platforms: campaignData.platforms.filter((p) => p !== platformId),
      })
    } else {
      updateCampaignData({
        platforms: [...campaignData.platforms, platformId],
      })
    }
  }

  const handleMediaSelect = (media: any) => {
    updateCampaignData({
      mediaItems: [...campaignData.mediaItems, media],
    })
    setShowMediaBrowser(false)
  }

  const platforms = [
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-[#1DA1F2]" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
  ]

  // Fallback editor component if the rich text editor fails to load
  const FallbackEditor = () => (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <Label htmlFor="content">Campaign Content</Label>
        <Textarea
          id="content"
          placeholder="Enter your campaign content here..."
          rows={10}
          value={campaignData.content}
          onChange={(e) => updateCampaignData({ content: e.target.value })}
          className="mt-2"
        />
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setShowMediaBrowser(true)}>
          Add Media
        </Button>
      </div>
    </div>
  )

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Campaign" description="Create and schedule a new social media campaign">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
            Save as Draft
          </Button>
          <Button onClick={handlePublish} disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Campaign"}
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/campaigns")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p className="text-sm text-muted-foreground">Use the tabs below to create your campaign content</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Content Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Editor</CardTitle>
                  <CardDescription>Create and format your campaign content</CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleEditor
                    content={campaignData.content}
                    onContentChange={(content) => updateCampaignData({ content })}
                    onAddMedia={() => setShowMediaBrowser(true)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Preview</CardTitle>
                  <CardDescription>Review your campaign before publishing</CardDescription>
                </CardHeader>
                <CardContent>
                  {campaignData.content ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert border rounded-md p-4">
                      {campaignData.content}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No content added yet. Switch to the editor tab to create content.</p>
                    </div>
                  )}

                  {campaignData.mediaItems.length > 0 && (
                    <div className="mt-4 border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-2">Media</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {campaignData.mediaItems.map((item, index) => (
                          <div key={index} className="border rounded-md overflow-hidden">
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.name}
                              className="aspect-square object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePublish} disabled={isSubmitting} className="ml-auto">
                    {isSubmitting ? "Publishing..." : "Publish Campaign"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  value={campaignData.title}
                  onChange={(e) => updateCampaignData({ title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter campaign description"
                  rows={3}
                  value={campaignData.description}
                  onChange={(e) => updateCampaignData({ description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`flex items-center space-x-3 rounded-lg border p-3 transition-colors ${
                      campaignData.platforms.includes(platform.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <Checkbox
                      id={`platform-${platform.id}`}
                      checked={campaignData.platforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <Label
                      htmlFor={`platform-${platform.id}`}
                      className="flex items-center gap-2 cursor-pointer font-medium flex-1"
                    >
                      <platform.icon className={`h-5 w-5 ${platform.color}`} />
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full" onClick={() => setShowMediaBrowser(true)}>
                  Browse Media Library
                </Button>

                {campaignData.mediaItems.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {campaignData.mediaItems.map((item, index) => (
                      <div key={index} className="border rounded-md overflow-hidden">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="aspect-square object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No media selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showMediaBrowser} onOpenChange={setShowMediaBrowser}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Media Browser</DialogTitle>
          </DialogHeader>
          <MediaBrowser onSelect={handleMediaSelect} />
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}

