"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EngagementReports } from "@/components/analytics/engagement-reports"
import { ReachImpressions } from "@/components/analytics/reach-impressions"
import { ConversionMetrics } from "@/components/analytics/conversion-metrics"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-2">
          Track performance and gain insights from your social media activities
        </p>
      </div>

      <Tabs defaultValue="engagement">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="reach">Reach & Impressions</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="mt-6">
          <EngagementReports />
        </TabsContent>
        <TabsContent value="reach" className="mt-6">
          <ReachImpressions />
        </TabsContent>
        <TabsContent value="conversion" className="mt-6">
          <ConversionMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

