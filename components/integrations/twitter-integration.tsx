"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Twitter, Check, X } from "lucide-react"

export function TwitterIntegration() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConnect = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setConnected(true)
      setLoading(false)
    }, 1500)
  }

  const handleDisconnect = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setConnected(false)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Twitter className="h-6 w-6 text-[#1DA1F2]" />
            <CardTitle>Twitter/X Integration</CardTitle>
          </div>
          <CardDescription>Connect your Twitter/X account to post tweets directly from the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="h-5 w-5" />
                <span className="font-medium">Connected to Twitter/X</span>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">@johndoe</h3>
                    <p className="text-sm text-muted-foreground">John Doe</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDisconnect} disabled={loading}>
                    {loading ? "Disconnecting..." : "Disconnect"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Posting Preferences</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-post-tw">Auto-post to Twitter/X</Label>
                    <Switch id="auto-post-tw" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-hashtags">Include hashtags</Label>
                    <Switch id="include-hashtags" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="thread-posts">Thread long posts</Label>
                    <Switch id="thread-posts" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-hashtags">Default Hashtags</Label>
                  <Input id="default-hashtags" placeholder="#marketing #socialmedia" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-yellow-500">
                <X className="h-5 w-5" />
                <span className="font-medium">Not connected to Twitter/X</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Connect your Twitter/X account to post tweets, threads, and media directly from the platform.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!connected && (
            <Button onClick={handleConnect} disabled={loading} className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90">
              {loading ? "Connecting..." : "Connect Twitter/X Account"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>Twitter/X Analytics</CardTitle>
            <CardDescription>View your Twitter/X post performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">3,456</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">2.8%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Impressions</p>
                <p className="text-2xl font-bold">12,345</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Retweets</p>
                <p className="text-2xl font-bold">567</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

