"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostPreviewProps {
  content: string
  media: any[]
  platforms: string[]
}

export function PostPreview({ content, media, platforms }: PostPreviewProps) {
  const [activePlatform, setActivePlatform] = useState(platforms[0] || "facebook")

  // Format content based on platform
  const formatContent = (text: string, platform: string) => {
    // Replace markdown with HTML
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/\n- (.*?)(?=\n|$)/g, "<li>$1</li>")
      .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>")
      .replace(/\n1\. (.*?)(?=\n|$)/g, "<li>$1</li>")
      .replace(/<li>(.*?)<\/li>/g, "<ol><li>$1</li></ol>")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2">$1</a>')
      .replace(/\n/g, "<br />")

    return formatted
  }

  // Get platform-specific UI elements
  const getPlatformUI = (platform: string) => {
    switch (platform) {
      case "facebook":
        return {
          name: "Facebook",
          avatar: "F",
          username: "Your Page",
          maxChars: 500,
          bgColor: "bg-[#f0f2f5]",
          textColor: "text-[#050505]",
          iconColor: "text-[#1877f2]",
        }
      case "twitter":
        return {
          name: "Twitter",
          avatar: "T",
          username: "@youraccount",
          maxChars: 280,
          bgColor: "bg-white",
          textColor: "text-[#0f1419]",
          iconColor: "text-[#1da1f2]",
        }
      case "instagram":
        return {
          name: "Instagram",
          avatar: "I",
          username: "youraccount",
          maxChars: 2200,
          bgColor: "bg-white",
          textColor: "text-[#262626]",
          iconColor: "text-[#c13584]",
        }
      case "linkedin":
        return {
          name: "LinkedIn",
          avatar: "L",
          username: "Your Name",
          maxChars: 3000,
          bgColor: "bg-white",
          textColor: "text-[#000000]",
          iconColor: "text-[#0a66c2]",
        }
      default:
        return {
          name: "Social Media",
          avatar: "S",
          username: "youraccount",
          maxChars: 500,
          bgColor: "bg-white",
          textColor: "text-black",
          iconColor: "text-blue-500",
        }
    }
  }

  const platformUI = getPlatformUI(activePlatform)
  const formattedContent = formatContent(content, activePlatform)
  const isOverCharLimit = content.length > platformUI.maxChars

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Post Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select at least one platform to see preview</p>
          </div>
        ) : (
          <>
            <Tabs value={activePlatform} onValueChange={setActivePlatform}>
              <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${platforms.length}, 1fr)` }}>
                {platforms.map((platform) => (
                  <TabsTrigger key={platform} value={platform} className="capitalize">
                    {platform}
                  </TabsTrigger>
                ))}
              </TabsList>

              {platforms.map((platform) => (
                <TabsContent key={platform} value={platform}>
                  <div className={`rounded-md overflow-hidden ${getPlatformUI(platform).bgColor}`}>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback
                            className={`bg-${platform === "facebook" ? "blue" : platform === "twitter" ? "sky" : platform === "instagram" ? "pink" : "blue"}-500 text-white`}
                          >
                            {getPlatformUI(platform).avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{getPlatformUI(platform).name}</p>
                          <p className="text-xs text-muted-foreground">{getPlatformUI(platform).username}</p>
                        </div>
                      </div>

                      <div className={`text-sm ${getPlatformUI(platform).textColor}`}>
                        <div dangerouslySetInnerHTML={{ __html: formatContent(content, platform) }} />
                      </div>

                      {media.length > 0 && (
                        <div
                          className={`mt-3 grid gap-2 ${
                            media.length === 1
                              ? "grid-cols-1"
                              : media.length === 2
                                ? "grid-cols-2"
                                : media.length === 3
                                  ? "grid-cols-2"
                                  : "grid-cols-2"
                          }`}
                        >
                          {media.slice(0, 4).map((item, index) => (
                            <div
                              key={item.id}
                              className={`bg-muted rounded-md overflow-hidden ${
                                media.length === 3 && index === 0
                                  ? "col-span-2"
                                  : media.length === 4 && index >= 2
                                    ? ""
                                    : ""
                              }`}
                            >
                              {item.type === "image" ? (
                                <img
                                  src={item.url || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover aspect-square"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center aspect-square">
                                  <span className="text-muted-foreground">Video</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <span>
                          {content.length} / {platformUI.maxChars} characters
                        </span>
                        {isOverCharLimit && (
                          <span className="text-destructive font-medium">Character limit exceeded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}

