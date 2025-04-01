"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/lib/types"
import { getTemplates } from "@/lib/content"
import { Copy, Facebook, Instagram, Linkedin, Plus, Twitter } from "lucide-react"

export function PostTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates()
        setTemplates(data)
      } catch (error) {
        console.error("Error fetching templates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
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

  if (templates.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardTitle className="text-xl mb-2">No templates found</CardTitle>
        <p className="text-muted-foreground">Create templates to save time when creating posts.</p>
        <Button className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
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
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{template.name}</CardTitle>
                <Badge variant="outline">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                {template.content.length > 100 ? `${template.content.substring(0, 100)}...` : template.content}
              </p>
              <div className="flex mt-2 space-x-1">
                {template.platforms.map((platform) => (
                  <div key={platform} className="rounded-full bg-muted p-1">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

