"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"

export function ApiSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const { toast } = useToast()

  const apiKey = "sk_live_51Abcdefghijklmnopqrstuvwxyz1234567890"
  const maskedApiKey = `sk_live_${apiKey.substring(8, 12)}...${apiKey.substring(apiKey.length - 4)}`

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
    })
  }

  const handleRegenerateApiKey = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "API key regenerated",
        description: "Your new API key has been generated. Make sure to update it in your applications.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys to access the platform programmatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input id="api-key" value={showApiKey ? apiKey : maskedApiKey} readOnly className="pr-10" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showApiKey ? "Hide API key" : "Show API key"}</span>
                </Button>
              </div>
              <Button type="button" variant="outline" size="icon" onClick={handleCopyApiKey}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy API key</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your API key grants full access to your account. Do not share it with others.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleRegenerateApiKey} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate API Key
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure webhooks to receive real-time updates about events in your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://example.com/webhook" />
            <p className="text-sm text-muted-foreground">
              We'll send POST requests to this URL when events occur in your account.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Events to Subscribe</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="event-post-published" className="rounded border-gray-300" />
                <Label htmlFor="event-post-published" className="text-sm font-normal">
                  Post Published
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="event-post-engagement" className="rounded border-gray-300" />
                <Label htmlFor="event-post-engagement" className="text-sm font-normal">
                  Post Engagement
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="event-campaign-completed" className="rounded border-gray-300" />
                <Label htmlFor="event-campaign-completed" className="text-sm font-normal">
                  Campaign Completed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="event-account-changes" className="rounded border-gray-300" />
                <Label htmlFor="event-account-changes" className="text-sm font-normal">
                  Account Changes
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Webhook Configuration</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

