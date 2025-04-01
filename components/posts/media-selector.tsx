"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Image, X } from "lucide-react"
import { getMediaAssets } from "@/lib/content"
import { useToast } from "@/hooks/use-toast"

interface MediaSelectorProps {
  selectedMedia: any[]
  onMediaChange: (media: any[]) => void
}

export function MediaSelector({ selectedMedia, onMediaChange }: MediaSelectorProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [libraryMedia, setLibraryMedia] = useState([])
  const [activeTab, setActiveTab] = useState("upload")

  // Load media library
  const loadMediaLibrary = async () => {
    if (libraryMedia.length > 0) return

    setIsLoading(true)
    try {
      // Simulate API call
      const media = await getMediaAssets()
      setLibraryMedia(media)
    } catch (error) {
      toast({
        title: "Failed to load media",
        description: "Could not load your media library. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "library") {
      loadMediaLibrary()
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if we already have 4 media items
    if (selectedMedia.length + files.length > 4) {
      toast({
        title: "Maximum media limit reached",
        description: "You can only add up to 4 media items per post.",
        variant: "destructive",
      })
      return
    }

    // Process each file
    const newMedia = Array.from(files).map((file) => ({
      id: `temp_${Date.now()}_${file.name}`,
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "video",
      url: URL.createObjectURL(file),
      size: file.size,
      file: file, // Keep reference to the file
    }))

    onMediaChange([...selectedMedia, ...newMedia])

    // Reset the input
    e.target.value = ""
  }

  // Handle library selection
  const handleLibrarySelect = (media: any) => {
    // Check if already selected
    if (selectedMedia.some((m) => m.id === media.id)) {
      onMediaChange(selectedMedia.filter((m) => m.id !== media.id))
      return
    }

    // Check if we already have 4 media items
    if (selectedMedia.length >= 4) {
      toast({
        title: "Maximum media limit reached",
        description: "You can only add up to 4 media items per post.",
        variant: "destructive",
      })
      return
    }

    onMediaChange([...selectedMedia, media])
  }

  // Remove media item
  const removeMedia = (id: string) => {
    onMediaChange(selectedMedia.filter((media) => media.id !== id))
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload New</TabsTrigger>
          <TabsTrigger value="library">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4 space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="media-upload">Upload Media</Label>
            <Input id="media-upload" type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} />
            <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF, MP4. Maximum 4 files.</p>
          </div>
        </TabsContent>

        <TabsContent value="library" className="mt-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {libraryMedia.map((media: any) => (
                  <Card
                    key={media.id}
                    className={`overflow-hidden cursor-pointer ${
                      selectedMedia.some((m) => m.id === media.id) ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleLibrarySelect(media)}
                  >
                    <CardContent className="p-0 aspect-square relative">
                      {media.type === "image" ? (
                        <img
                          src={media.url || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-xs truncate">
                        {media.name}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>

      {selectedMedia.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Selected Media ({selectedMedia.length}/4)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {selectedMedia.map((media) => (
              <div key={media.id} className="relative group">
                <div className="aspect-square bg-muted rounded-md overflow-hidden">
                  {media.type === "image" ? (
                    <img
                      src={media.url || "/placeholder.svg"}
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeMedia(media.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-xs truncate mt-1">{media.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

