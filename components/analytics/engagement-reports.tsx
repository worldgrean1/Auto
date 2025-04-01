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
import { getEngagementData } from "@/lib/analytics"

export function EngagementReports() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const engagementData = await getEngagementData()
        setData(engagementData)
      } catch (error) {
        console.error("Error fetching engagement data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
          <CardTitle>No Engagement Data</CardTitle>
          <CardDescription>
            There is no engagement data available yet. Publish some posts to see analytics.
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
          <CardTitle>Engagement Overview</CardTitle>
          <CardDescription>Track engagement metrics across all your social media platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overall">
            <TabsList>
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="by-platform">By Platform</TabsTrigger>
              <TabsTrigger value="by-content">By Content Type</TabsTrigger>
            </TabsList>
            <TabsContent value="overall" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.overallEngagement}
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
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="by-platform" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.engagementByPlatform}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#8884d8" />
                  <Bar dataKey="comments" fill="#82ca9d" />
                  <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="by-content" className="pt-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={data.engagementByContentType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.engagementByContentType.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <h3 className="text-lg font-medium mb-2">Content Type Distribution</h3>
                  <div className="space-y-2">
                    {data.engagementByContentType.map((content: any, index: number) => (
                      <div key={content.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>
                          {content.name}: {content.value} engagements
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
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPosts.map((post: any) => (
                <div key={post.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.platform} • {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{post.engagement} engagements</p>
                    <p className="text-sm text-muted-foreground">{post.engagementRate}% rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement by Time of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data.engagementByTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

