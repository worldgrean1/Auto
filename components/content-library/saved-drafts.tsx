"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Facebook, Instagram, Linkedin, Twitter, Trash } from "lucide-react"
import type { Draft } from "@/lib/types"
import { getDrafts } from "@/lib/content"

export function SavedDrafts() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const data = await getDrafts()
        setDrafts(data)
      } catch (error) {
        console.error("Error fetching drafts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDrafts()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <CardFooter>
              <div className="h-9 w-full bg-muted rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (drafts.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardTitle className="text-xl mb-2">No saved drafts</CardTitle>
        <p className="text-muted-foreground">You don't have any saved drafts. Create a new draft to get started.</p>
        <Button className="mt-4">Create Draft</Button>
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {drafts.map((draft) => (
        <Card key={draft.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{draft.title}</CardTitle>
              <Badge variant="outline">Draft</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {draft.content.length > 100 ? `${draft.content.substring(0, 100)}...` : draft.content}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Last edited on {new Date(draft.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex mt-2 space-x-1">
              {draft.platforms.map((platform) => (
                <div key={platform} className="rounded-full bg-muted p-1">
                  {getPlatformIcon(platform)}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/dashboard/content-library/drafts/${draft.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

