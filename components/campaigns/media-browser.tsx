"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, ImageIcon, FileVideo, FileAudio, File, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface MediaItem {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document"
  url: string
  size: string
  createdAt: string
}

interface MediaBrowserProps {
  onSelect: (media: MediaItem) => void
}

export function MediaBrowser({ onSelect }: MediaBrowserProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])

  // Mock media items
  useEffect(() => {
    // Generate mock media items
    const mockMediaItems: MediaItem[] = [
      {
        id: "1",
        name: "Product Image 1",
        type: "image",
        url: "/placeholder.svg?height=500&width=500",
        size: "1.2 MB",
        createdAt: "2023-06-15",
      },
      {
        id: "2",
        name: "Product Video",
        type: "video",
        url: "/placeholder.svg?height=500&width=500",
        size: "5.4 MB",
        createdAt: "2023-06-10",
      },
      {
        id: "3",
        name: "Company Logo",
        type: "image",
        url: "/placeholder.svg?height=500&width=500",
        size: "0.8 MB",
        createdAt: "2023-05-20",
      },
      {
        id: "4",
        name: "Podcast Episode",
        type: "audio",
        url: "/placeholder.svg?height=500&width=500",
        size: "12.5 MB",
        createdAt: "2023-05-15",
      },
    ]

    setMediaItems(mockMediaItems)
  }, [])

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeTab === "all" || item.type === activeTab
    return matchesSearch && matchesType
  })

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add a new mock item
          const newItem: MediaItem = {
            id: `new-${Date.now()}`,
            name: "Newly Uploaded Item",
            type: "image",
            url: "/placeholder.svg?height=500&width=500",
            size: "1.8 MB",
            createdAt: new Date().toISOString().split("T")[0],
          }

          setMediaItems((prev) => [newItem, ...prev])

          toast({
            title: "Upload complete",
            description: "Your media has been uploaded successfully.",
          })

          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "video":
        return <FileVideo className="h-6 w-6 text-purple-500" />
      case "audio":
        return <FileAudio className="h-6 w-6 text-amber-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleUpload} disabled={isUploading}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="h-[400px]">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No media found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Upload some media to get started"}
            </p>
            <Button onClick={handleUpload}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative cursor-pointer rounded-md border bg-card overflow-hidden transition-all hover:border-primary"
                onClick={() => onSelect(item)}
              >
                <div className="aspect-square relative">
                  {item.type === "image" ? (
                    <img src={item.url || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">{getMediaIcon(item.type)}</div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

