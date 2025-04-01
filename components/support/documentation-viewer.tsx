"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Video, ArrowRight, Clock, ThumbsUp, Eye, BookOpen } from "lucide-react"

interface DocSection {
  id: string
  title: string
  content: string
  type: "text" | "video" | "guide"
  views?: number
  rating?: number
  timeToRead?: string
  tags: string[]
}

interface DocCategory {
  id: string
  name: string
  description: string
  icon: any
  sections: DocSection[]
}

const documentationData: DocCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Essential guides to help you get up and running quickly",
    icon: BookOpen,
    sections: [
      {
        id: "welcome",
        title: "Welcome to SocialPro",
        content: `
# Welcome to SocialPro

Thank you for choosing SocialPro for your social media management needs. This guide will help you get started with the platform and make the most of its features.

## What is SocialPro?

SocialPro is an all-in-one social media management platform that allows you to:

- Schedule and publish content across multiple social media platforms
- Monitor engagement and track performance
- Collaborate with team members
- Analyze social media performance with detailed reports

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Stable internet connection
- Social media account(s) you want to manage

## Next Steps

We recommend starting with the following guides:

1. Setting up your account
2. Connecting your social media profiles
3. Creating your first campaign
4. Inviting team members

If you have any questions, our support team is always here to help.
        `,
        type: "text",
        views: 2450,
        rating: 4.8,
        timeToRead: "5 min",
        tags: ["introduction", "overview"],
      },
      {
        id: "quick-start",
        title: "Quick Start Guide",
        content: "Step-by-step instructions to set up your account and create your first campaign.",
        type: "guide",
        views: 1975,
        rating: 4.6,
        timeToRead: "10 min",
        tags: ["setup", "guide", "beginners"],
      },
      {
        id: "platform-tour",
        title: "Platform Tour",
        content: "A video walkthrough of the SocialPro platform and its key features.",
        type: "video",
        views: 3210,
        rating: 4.9,
        timeToRead: "8 min",
        tags: ["video", "tour", "features"],
      },
    ],
  },
  {
    id: "campaigns",
    name: "Campaign Management",
    description: "Learn how to create and manage effective social media campaigns",
    icon: FileText,
    sections: [
      {
        id: "create-campaign",
        title: "Creating Your First Campaign",
        content: "Learn how to create, schedule, and publish a social media campaign.",
        type: "guide",
        views: 1850,
        rating: 4.7,
        timeToRead: "12 min",
        tags: ["campaigns", "tutorial"],
      },
      {
        id: "scheduling",
        title: "Advanced Scheduling Techniques",
        content: "Master the art of optimal post scheduling for maximum engagement.",
        type: "text",
        views: 1340,
        rating: 4.5,
        timeToRead: "15 min",
        tags: ["scheduling", "advanced", "optimization"],
      },
      {
        id: "analytics",
        title: "Understanding Campaign Analytics",
        content: "A video tutorial on how to interpret your campaign performance data.",
        type: "video",
        views: 2180,
        rating: 4.8,
        timeToRead: "18 min",
        tags: ["analytics", "performance", "video"],
      },
    ],
  },
  {
    id: "team",
    name: "Team Collaboration",
    description: "Guides on managing team members and collaboration workflows",
    icon: FileText,
    sections: [
      {
        id: "invite-team",
        title: "Inviting Team Members",
        content: "Step-by-step guide to adding team members and setting permissions.",
        type: "guide",
        views: 980,
        rating: 4.6,
        timeToRead: "8 min",
        tags: ["team", "permissions", "collaboration"],
      },
      {
        id: "workflow",
        title: "Setting Up Approval Workflows",
        content: "How to create and manage content approval workflows for your team.",
        type: "text",
        views: 875,
        rating: 4.4,
        timeToRead: "14 min",
        tags: ["workflow", "approvals", "process"],
      },
    ],
  },
]

export function DocumentationViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<DocSection | null>(null)
  const [filteredCategories, setFilteredCategories] = useState<DocCategory[]>(documentationData)

  useEffect(() => {
    if (!searchQuery && !selectedCategory) {
      setFilteredCategories(documentationData)
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter categories and sections based on search query
    const filtered = documentationData
      .map((category) => {
        // If a category is selected, only include that one
        if (selectedCategory && category.id !== selectedCategory) {
          return null
        }

        // Filter sections by search query
        const filteredSections = category.sections.filter(
          (section) =>
            section.title.toLowerCase().includes(query) ||
            section.tags.some((tag) => tag.toLowerCase().includes(query)),
        )

        // Only include category if it has matching sections
        return filteredSections.length > 0 ? { ...category, sections: filteredSections } : null
      })
      .filter(Boolean) as DocCategory[]

    setFilteredCategories(filtered)
  }, [searchQuery, selectedCategory])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    setSelectedSection(null)
  }

  const handleSectionSelect = (category: DocCategory, section: DocSection) => {
    setSelectedSection(section)
  }

  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "guide":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-7">
      {/* Sidebar */}
      <div className="md:col-span-2 space-y-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1 py-2">
                {documentationData.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="md:col-span-5">
        {selectedSection ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="mr-2" onClick={() => setSelectedSection(null)}>
                    <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                    Back
                  </Button>
                  <CardTitle>{selectedSection.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedSection.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {selectedSection.timeToRead && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {selectedSection.timeToRead}
                  </div>
                )}
                {selectedSection.views && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="mr-1 h-4 w-4" />
                    {selectedSection.views.toLocaleString()}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedSection.type === "video" ? (
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2">Video content would play here</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert">{selectedSection.content}</div>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {filteredCategories.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground mt-1">Try a different search term</p>
                </CardContent>
              </Card>
            ) : (
              filteredCategories.map((category) => (
                <Card key={category.id} className="mb-6">
                  <CardHeader>
                    <div className="flex items-center">
                      <category.icon className="mr-2 h-5 w-5 text-primary" />
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {category.sections.map((section) => (
                        <div
                          key={section.id}
                          className="py-4 first:pt-0 last:pb-0 hover:bg-muted/50 cursor-pointer rounded-md px-2"
                          onClick={() => handleSectionSelect(category, section)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getDocTypeIcon(section.type)}
                              <h3 className="ml-2 font-medium">{section.title}</h3>
                              <Badge variant="outline" className="ml-2 capitalize">
                                {section.type}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4">
                              {section.timeToRead && (
                                <div className="hidden sm:flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {section.timeToRead}
                                </div>
                              )}
                              {section.rating && (
                                <div className="hidden sm:flex items-center text-sm text-muted-foreground">
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                  {section.rating}
                                </div>
                              )}
                              <Button size="sm">
                                View
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {section.content.substring(0, 120)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}

