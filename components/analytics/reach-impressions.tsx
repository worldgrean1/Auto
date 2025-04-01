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
  AreaChart,
  Area,
} from "recharts"
import { getReachData } from "@/lib/analytics"

export function ReachImpressions() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reachData = await getReachData()
        setData(reachData)
      } catch (error) {
        console.error("Error fetching reach data:", error)
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
          <CardTitle>No Reach & Impressions Data</CardTitle>
          <CardDescription>
            There is no reach and impressions data available yet. Publish some posts to see analytics.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reach & Impressions Overview</CardTitle>
          <CardDescription>Track how many people see your content across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trend">
            <TabsList>
              <TabsTrigger value="trend">Trend</TabsTrigger>
              <TabsTrigger value="by-platform">By Platform</TabsTrigger>
              <TabsTrigger value="comparison">Reach vs Impressions</TabsTrigger>
            </TabsList>
            <TabsContent value="trend" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={data.reachTrend}
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
                  <Area type="monotone" dataKey="reach" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="impressions" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="by-platform" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.reachByPlatform}
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
                  <Bar dataKey="reach" fill="#8884d8" />
                  <Bar dataKey="impressions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="comparison" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.reachVsImpressions}
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
                  <Line type="monotone" dataKey="reach" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audience Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data.audienceGrowth}
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
                <Line type="monotone" dataKey="followers" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reach by Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data.reachByDemographics}
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

