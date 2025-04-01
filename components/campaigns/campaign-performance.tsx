"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Campaign } from "@/lib/types"
import { getCampaignPerformance } from "@/lib/campaigns"
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

interface CampaignPerformanceProps {
  campaign: Campaign
}

export function CampaignPerformance({ campaign }: CampaignPerformanceProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const performanceData = await getCampaignPerformance(campaign.id)
        setData(performanceData)
      } catch (error) {
        console.error("Error fetching performance:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [campaign.id])

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
          <CardTitle>No Performance Data</CardTitle>
          <CardDescription>There is no performance data available for this campaign yet.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Detailed performance metrics for this campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement">
            <TabsList>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
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
            <TabsContent value="demographics" className="pt-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={data.demographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.demographics.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <h3 className="text-lg font-medium mb-2">Audience Breakdown</h3>
                  <div className="space-y-2">
                    {data.demographics.map((demo: any, index: number) => (
                      <div key={demo.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>
                          {demo.name}: {demo.value}%
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
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data.platformBreakdown}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" />
                <Bar dataKey="reach" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement by Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data.engagementByTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

