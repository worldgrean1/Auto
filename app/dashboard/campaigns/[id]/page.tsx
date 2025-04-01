"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignDetails } from "@/components/campaigns/campaign-details"
import { CampaignPosts } from "@/components/campaigns/campaign-posts"
import { CampaignPerformance } from "@/components/campaigns/campaign-performance"
import { getCampaign } from "@/lib/campaigns"
import type { Campaign } from "@/lib/types"

export default function CampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaign(params.id)
        setCampaign(data)
      } catch (error) {
        console.error("Error fetching campaign:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold">Campaign not found</h2>
        <p className="text-muted-foreground mt-2">The campaign you're looking for doesn't exist.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard/campaigns")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaigns
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/campaigns")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-1 h-4 w-4" />
        <span>Created on {new Date(campaign.createdAt).toLocaleDateString()}</span>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <CampaignDetails campaign={campaign} />
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
          <CampaignPosts campaign={campaign} />
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <CampaignPerformance campaign={campaign} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

