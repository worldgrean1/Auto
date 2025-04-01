"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkedInIntegration } from "@/components/integrations/linkedin-integration"
import { InstagramIntegration } from "@/components/integrations/instagram-integration"
import { TwitterIntegration } from "@/components/integrations/twitter-integration"
import { FacebookIntegration } from "@/components/integrations/facebook-integration"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Integrations</h1>
        <p className="text-muted-foreground mt-2">Connect and manage your social media accounts</p>
      </div>

      <Tabs defaultValue="linkedin">
        <TabsList>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">Twitter/X</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
        </TabsList>
        <TabsContent value="linkedin" className="mt-6">
          <LinkedInIntegration />
        </TabsContent>
        <TabsContent value="instagram" className="mt-6">
          <InstagramIntegration />
        </TabsContent>
        <TabsContent value="twitter" className="mt-6">
          <TwitterIntegration />
        </TabsContent>
        <TabsContent value="facebook" className="mt-6">
          <FacebookIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

