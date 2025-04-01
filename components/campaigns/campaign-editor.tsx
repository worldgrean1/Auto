"use client"

import { SimpleEditor } from "@/components/campaigns/simple-editor"

export function CampaignEditor({
  content,
  onContentChange,
  mediaItems = [],
  onMediaChange,
  simplified = false,
}: {
  content: string
  onContentChange: (content: string) => void
  mediaItems?: any[]
  onMediaChange?: (mediaItems: any[]) => void
  simplified?: boolean
}) {
  const handleAddMedia = () => {
    // This would normally open a media browser
    // For simplicity, we'll just add a placeholder
    if (onMediaChange) {
      onMediaChange([
        ...mediaItems,
        {
          id: `media_${Date.now()}`,
          name: "Sample Image",
          type: "image",
          url: "/placeholder.svg?height=500&width=500",
          size: "1.2 MB",
          createdAt: new Date().toISOString().split("T")[0],
        },
      ])
    }
  }

  return <SimpleEditor content={content} onContentChange={onContentChange} onAddMedia={handleAddMedia} />
}

