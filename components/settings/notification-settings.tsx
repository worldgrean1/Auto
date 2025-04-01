"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    scheduledPosts: true,
    postPerformance: true,
    mentions: true,
    comments: true,
    newFollowers: false,
    productUpdates: true,
    marketingEmails: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Select which types of notifications you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="scheduled-posts">Scheduled Posts</Label>
              <p className="text-sm text-muted-foreground">Get notified when your scheduled posts are published.</p>
            </div>
            <Switch
              id="scheduled-posts"
              checked={settings.scheduledPosts}
              onCheckedChange={() => handleToggle("scheduledPosts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="post-performance">Post Performance</Label>
              <p className="text-sm text-muted-foreground">Get notified about your post performance and analytics.</p>
            </div>
            <Switch
              id="post-performance"
              checked={settings.postPerformance}
              onCheckedChange={() => handleToggle("postPerformance")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">Get notified when you are mentioned in a post.</p>
            </div>
            <Switch id="mentions" checked={settings.mentions} onCheckedChange={() => handleToggle("mentions")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments">Comments</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone comments on your posts.</p>
            </div>
            <Switch id="comments" checked={settings.comments} onCheckedChange={() => handleToggle("comments")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-followers">New Followers</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone follows your account.</p>
            </div>
            <Switch
              id="new-followers"
              checked={settings.newFollowers}
              onCheckedChange={() => handleToggle("newFollowers")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Preferences</CardTitle>
          <CardDescription>Choose what marketing communications you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="product-updates">Product Updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features and improvements.</p>
            </div>
            <Switch
              id="product-updates"
              checked={settings.productUpdates}
              onCheckedChange={() => handleToggle("productUpdates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive promotional emails and special offers.</p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

