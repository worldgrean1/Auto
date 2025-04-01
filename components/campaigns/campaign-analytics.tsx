"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { getCampaignAnalytics } from "@/lib/campaigns"

export function CampaignAnalytics() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await getCampaignAnalytics()
        setData(analyticsData)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Analytics Data</CardTitle>
          <CardDescription>
            There is no analytics data available yet. Publish some posts to see analytics.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Overview of your campaign performance across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement">
            <TabsList>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.engagementByDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#8884d8" />
                  <Bar dataKey="comments" fill="#82ca9d" />
                  <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="reach" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.reachByDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="reach" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="platforms" className="pt-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={data.engagementByPlatform}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.engagementByPlatform.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <h3 className="text-lg font-medium mb-2">Platform Distribution</h3>
                  <div className="space-y-2">
                    {data.engagementByPlatform.map((platform: any, index: number) => (
                      <div key={platform.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>
                          {platform.name}: {platform.value} engagements
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topCampaigns.map((campaign: any) => (
                <div key={campaign.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{new Date(campaign.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{campaign.engagement} engagements</p>
                    <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data.demographics}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="age" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" fill="#8884d8" />
                <Bar dataKey="female" fill="#82ca9d" />
                <Bar dataKey="other" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

