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
import { getConversionData } from "@/lib/analytics"

export function ConversionMetrics() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversionData = await getConversionData()
        setData(conversionData)
      } catch (error) {
        console.error("Error fetching conversion data:", error)
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
          <CardTitle>No Conversion Data</CardTitle>
          <CardDescription>
            There is no conversion data available yet. Set up conversion tracking to see analytics.
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
          <CardTitle>Conversion Overview</CardTitle>
          <CardDescription>
            Track how your social media posts convert to website visits, leads, and sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overall">
            <TabsList>
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="by-platform">By Platform</TabsTrigger>
              <TabsTrigger value="by-campaign">By Campaign</TabsTrigger>
            </TabsList>
            <TabsContent value="overall" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.overallConversion}
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
                  <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="leads" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="sales" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="by-platform" className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.conversionByPlatform}
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
                  <Bar dataKey="clicks" fill="#8884d8" />
                  <Bar dataKey="leads" fill="#82ca9d" />
                  <Bar dataKey="sales" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="by-campaign" className="pt-4">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={data.conversionByCampaign}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.conversionByCampaign.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 md:mt-0 md:ml-8">
                  <h3 className="text-lg font-medium mb-2">Campaign Conversion Distribution</h3>
                  <div className="space-y-2">
                    {data.conversionByCampaign.map((campaign: any, index: number) => (
                      <div key={campaign.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>
                          {campaign.name}: {campaign.value} conversions
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
            <CardTitle>Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">{data.conversionRates.clickRate}%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Lead Rate</p>
                <p className="text-2xl font-bold">{data.conversionRates.leadRate}%</p>
              </div>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Sale Rate</p>
                <p className="text-2xl font-bold">{data.conversionRates.saleRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data.roiByPlatform}
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
                <Bar dataKey="roi" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

