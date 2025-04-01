"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { RichTextEditor } from "@/components/posts/rich-text-editor"
import { MediaSelector } from "@/components/posts/media-selector"
import { PostPreview } from "@/components/posts/post-preview"
import { useToast } from "@/hooks/use-toast"

export function PostCreationForm() {
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedMedia, setSelectedMedia] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    { id: "facebook", name: "Facebook", checked: true },
    { id: "twitter", name: "Twitter", checked: true },
    { id: "instagram", name: "Instagram", checked: false },
    { id: "linkedin", name: "LinkedIn", checked: false },
  ])
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle platform selection
  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setSelectedPlatforms(
      selectedPlatforms.map((platform) => (platform.id === platformId ? { ...platform, checked } : platform)),
    )
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post.",
        variant: "destructive",
      })
      return
    }

    if (!selectedPlatforms.some((p) => p.checked)) {
      toast({
        title: "Platform required",
        description: "Please select at least one platform.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: schedulePost ? "Post scheduled" : "Post published",
        description: schedulePost
          ? `Your post has been scheduled for ${format(scheduledDate!, "PPP")}`
          : "Your post has been published successfully.",
      })

      // Navigate back to posts list
      router.push("/dashboard/posts")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your post could not be published. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title (internal reference only)</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Tabs defaultValue="compose" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="compose">Compose</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="compose" className="mt-4 space-y-4">
                    <RichTextEditor value={content} onChange={setContent} />
                  </TabsContent>

                  <TabsContent value="media" className="mt-4 space-y-4">
                    <MediaSelector selectedMedia={selectedMedia} onMediaChange={setSelectedMedia} />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Platforms</h3>
                      <div className="space-y-3">
                        {selectedPlatforms.map((platform) => (
                          <div key={platform.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={platform.id}
                              checked={platform.checked}
                              onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                            />
                            <Label htmlFor={platform.id} className="cursor-pointer">
                              {platform.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Scheduling</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="schedule-post"
                            checked={schedulePost}
                            onCheckedChange={(checked) => setSchedulePost(checked as boolean)}
                          />
                          <Label htmlFor="schedule-post" className="cursor-pointer">
                            Schedule for later
                          </Label>
                        </div>

                        {schedulePost && (
                          <div className="pt-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !scheduledDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={scheduledDate}
                                  onSelect={setScheduledDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {schedulePost ? "Schedule Post" : "Publish Now"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="lg:col-span-1">
        <PostPreview
          content={content}
          media={selectedMedia}
          platforms={selectedPlatforms.filter((p) => p.checked).map((p) => p.id)}
        />
      </div>
    </div>
  )
}

