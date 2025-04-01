"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface CampaignSettingsProps {
  campaignData: {
    title: string
    description: string
    platforms: string[]
    tags: string[]
  }
  updateCampaignData: (
    data: Partial<{
      title: string
      description: string
      platforms: string[]
      tags: string[]
    }>,
  ) => void
  onNext: () => void
}

export function CampaignSettings({ campaignData, updateCampaignData, onNext }: CampaignSettingsProps) {
  const [newTag, setNewTag] = useState("")

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-[#1DA1F2]" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
  ]

  const handleAddTag = () => {
    if (newTag && !campaignData.tags.includes(newTag)) {
      updateCampaignData({
        tags: [...campaignData.tags, newTag],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    updateCampaignData({
      tags: campaignData.tags.filter((t) => t !== tag),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const togglePlatform = (platformId: string) => {
    if (campaignData.platforms.includes(platformId)) {
      updateCampaignData({
        platforms: campaignData.platforms.filter((p) => p !== platformId),
      })
    } else {
      updateCampaignData({
        platforms: [...campaignData.platforms, platformId],
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Information</CardTitle>
          <CardDescription>Enter the basic information about your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              placeholder="Enter campaign title"
              value={campaignData.title}
              onChange={(e) => updateCampaignData({ title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              placeholder="Enter campaign description"
              rows={4}
              value={campaignData.description}
              onChange={(e) => updateCampaignData({ description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Platforms</CardTitle>
          <CardDescription>Select the platforms where you want to publish this campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                  campaignData.platforms.includes(platform.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => togglePlatform(platform.id)}
              >
                <Checkbox
                  id={`platform-${platform.id}`}
                  checked={campaignData.platforms.includes(platform.id)}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
                <Label
                  htmlFor={`platform-${platform.id}`}
                  className="flex items-center gap-2 cursor-pointer font-medium flex-1"
                >
                  <platform.icon className={`h-5 w-5 ${platform.color}`} />
                  {platform.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Add tags to help organize your campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button type="button" onClick={handleAddTag} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {campaignData.tags.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tags added yet</p>
            ) : (
              campaignData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onNext} className="ml-auto">
            Next: Content Editor
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

