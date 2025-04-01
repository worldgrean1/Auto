"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Instagram, Check, X } from "lucide-react"

export function InstagramIntegration() {
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
            <Instagram className="h-6 w-6 text-[#E1306C]" />
            <CardTitle>Instagram Integration</CardTitle>
          </div>
          <CardDescription>
            Connect your Instagram account to post photos and videos directly from the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="h-5 w-5" />
                <span className="font-medium">Connected to Instagram</span>
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
                    <Label htmlFor="auto-post-ig">Auto-post to Instagram</Label>
                    <Switch id="auto-post-ig" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-to-story">Post to Story</Label>
                    <Switch id="post-to-story" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-to-feed">Post to Feed</Label>
                    <Switch id="post-to-feed" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-caption">Default Caption</Label>
                  <Input id="default-caption" placeholder="Enter a default caption" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-yellow-500">
                <X className="h-5 w-5" />
                <span className="font-medium">Not connected to Instagram</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Connect your Instagram account to post photos, videos, and stories directly from the platform.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!connected && (
            <Button
              onClick={handleConnect}
              disabled={loading}
              className="bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FFDC80] hover:opacity-90"
            >
              {loading ? "Connecting..." : "Connect Instagram Account"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>Instagram Analytics</CardTitle>
            <CardDescription>View your Instagram post performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">2,345</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">4.7%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Reach</p>
                <p className="text-2xl font-bold">8,912</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Profile Visits</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

