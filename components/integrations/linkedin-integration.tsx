"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Linkedin, Check, X } from "lucide-react"

export function LinkedInIntegration() {
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
            <Linkedin className="h-6 w-6 text-[#0A66C2]" />
            <CardTitle>LinkedIn Integration</CardTitle>
          </div>
          <CardDescription>Connect your LinkedIn account to post updates directly from the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="h-5 w-5" />
                <span className="font-medium">Connected to LinkedIn</span>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
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
                    <Label htmlFor="auto-post">Auto-post to LinkedIn</Label>
                    <Switch id="auto-post" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-images">Include images in posts</Label>
                    <Switch id="include-images" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-links">Include links in posts</Label>
                    <Switch id="include-links" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-page">Post to Company Page</Label>
                  <Input id="company-page" placeholder="Select a company page" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-yellow-500">
                <X className="h-5 w-5" />
                <span className="font-medium">Not connected to LinkedIn</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Connect your LinkedIn account to post updates, articles, and media directly from the platform.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!connected && (
            <Button onClick={handleConnect} disabled={loading} className="bg-[#0A66C2] hover:bg-[#0A66C2]/90">
              {loading ? "Connecting..." : "Connect LinkedIn Account"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Analytics</CardTitle>
            <CardDescription>View your LinkedIn post performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Post Impressions</p>
                <p className="text-2xl font-bold">5,678</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">892</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

