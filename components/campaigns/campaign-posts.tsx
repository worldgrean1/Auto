"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Campaign, Post } from "@/lib/types"
import { getCampaignPosts } from "@/lib/campaigns"
import { Facebook, Instagram, Linkedin, Twitter, Image, Video, FileAudio, Edit, Trash } from "lucide-react"

interface CampaignPostsProps {
  campaign: Campaign
}

export function CampaignPosts({ campaign }: CampaignPostsProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getCampaignPosts(campaign.id)
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [campaign.id])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-1/3 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardTitle className="text-xl mb-2">No posts in this campaign</CardTitle>
        <p className="text-muted-foreground">This campaign doesn't have any posts yet. Add a post to get started.</p>
        <Button className="mt-4">Add Post</Button>
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

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "image":
        return <Image className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <FileAudio className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Post for {post.platform}</CardTitle>
              <div className="flex items-center space-x-1">
                {getPlatformIcon(post.platform)}
                {post.media && getMediaIcon(post.media.type)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>

            {post.media && (
              <div className="mt-4">
                <div className="rounded-md overflow-hidden border">
                  {post.media.type === "image" && (
                    <img
                      src={post.media.url || "/placeholder.svg"}
                      alt="Post media"
                      className="w-full h-auto max-h-[200px] object-cover"
                    />
                  )}
                  {post.media.type === "video" && (
                    <div className="bg-muted aspect-video flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  {post.media.type === "audio" && (
                    <div className="bg-muted p-4 flex items-center justify-center">
                      <FileAudio className="h-8 w-8 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">{post.media.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Scheduled for {new Date(post.scheduledDate).toLocaleString()}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

