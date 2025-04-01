"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Facebook, Check, X } from "lucide-react"

export function FacebookIntegration() {
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
            <Facebook className="h-6 w-6 text-[#1877F2]" />
            <CardTitle>Facebook Integration</CardTitle>
          </div>
          <CardDescription>Connect your Facebook account to post updates directly from the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="h-5 w-5" />
                <span className="font-medium">Connected to Facebook</span>
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
                    <Label htmlFor="auto-post-fb">Auto-post to Facebook</Label>
                    <Switch id="auto-post-fb" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-link-preview">Include link previews</Label>
                    <Switch id="include-link-preview" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-to-groups">Post to Groups</Label>
                    <Switch id="post-to-groups" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page-selection">Post to Page</Label>
                  <Input id="page-selection" placeholder="Select a page" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-yellow-500">
                <X className="h-5 w-5" />
                <span className="font-medium">Not connected to Facebook</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Connect your Facebook account to post updates, photos, and videos directly from the platform.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!connected && (
            <Button onClick={handleConnect} disabled={loading} className="bg-[#1877F2] hover:bg-[#1877F2]/90">
              {loading ? "Connecting..." : "Connect Facebook Account"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>Facebook Analytics</CardTitle>
            <CardDescription>View your Facebook post performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Page Likes</p>
                <p className="text-2xl font-bold">5,678</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">3.5%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Reach</p>
                <p className="text-2xl font-bold">15,432</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Post Shares</p>
                <p className="text-2xl font-bold">789</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

