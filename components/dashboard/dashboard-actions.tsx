"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Image, Calendar, BarChart2, Plus, Sparkles } from "lucide-react"

export function DashboardActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Create New Post",
      description: "Draft and schedule a new social media post",
      icon: FileText,
      href: "/dashboard/campaigns/new",
      variant: "default" as const,
    },
    {
      title: "Upload Media",
      description: "Add images, videos, or audio to your library",
      icon: Image,
      href: "/dashboard/content-library?tab=media",
      variant: "outline" as const,
    },
    {
      title: "View Schedule",
      description: "See your upcoming scheduled posts",
      icon: Calendar,
      href: "/dashboard/campaigns",
      variant: "outline" as const,
    },
    {
      title: "Analytics Overview",
      description: "Check your social media performance",
      icon: BarChart2,
      href: "/dashboard/analytics",
      variant: "outline" as const,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          Quick Actions
          <Button size="sm" variant="ghost" className="ml-auto h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add action</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="justify-start h-auto py-3 px-4"
              onClick={() => router.push(action.href)}
            >
              <action.icon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
              </div>
            </Button>
          ))}

          <Button variant="ghost" className="justify-start h-auto py-3 border border-dashed">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-medium">AI Content Generator</div>
              <div className="text-xs text-muted-foreground mt-1">Create engaging content with AI assistance</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

