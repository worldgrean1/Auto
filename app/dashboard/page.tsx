"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardWelcome } from "@/components/dashboard-welcome"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActivity } from "@/components/dashboard-activity"
import { getUserStats } from "@/lib/user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, FileText, BarChart2, Image, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SimpleEditor } from "@/components/campaigns/simple-editor"

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalContacts: 0,
    activeTime: "",
    responseRate: "",
  })
  const [loading, setLoading] = useState(true)
  const [quickPostContent, setQuickPostContent] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const [useRichEditor, setUseRichEditor] = useState(false)

  // Sample data for the performance chart
  const performanceData = [
    { name: "Mon", linkedin: 40, instagram: 24, twitter: 18, facebook: 28 },
    { name: "Tue", linkedin: 30, instagram: 28, twitter: 20, facebook: 22 },
    { name: "Wed", linkedin: 20, instagram: 40, twitter: 25, facebook: 18 },
    { name: "Thu", linkedin: 27, instagram: 39, twitter: 30, facebook: 35 },
    { name: "Fri", linkedin: 45, instagram: 48, twitter: 28, facebook: 40 },
    { name: "Sat", linkedin: 39, instagram: 38, twitter: 30, facebook: 30 },
    { name: "Sun", linkedin: 50, instagram: 43, twitter: 32, facebook: 25 },
  ]

  useEffect(() => {
    if (!user) return

    const fetchStats = async () => {
      try {
        const data = await getUserStats(user.id)
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  const handleQuickPost = () => {
    if (!quickPostContent.trim()) {
      toast({
        title: "Empty post",
        description: "Please add some content to your post.",
        variant: "destructive",
      })
      return
    }

    if (!selectedPlatform) {
      toast({
        title: "No platform selected",
        description: "Please select at least one platform for your post.",
        variant: "destructive",
      })
      return
    }

    setIsPosting(true)

    // Simulate posting
    setTimeout(() => {
      toast({
        title: "Post published!",
        description: `Your post has been published to ${selectedPlatform}.`,
      })
      setQuickPostContent("")
      setSelectedPlatform(null)
      setIsPosting(false)
    }, 1500)
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <DashboardWelcome user={user} />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DashboardStats stats={stats} />
      )}

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Engagement across your social media platforms this week</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="engagement">
              <TabsList className="mb-4">
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="reach">Reach</TabsTrigger>
                <TabsTrigger value="clicks">Clicks</TabsTrigger>
              </TabsList>
              <TabsContent value="engagement" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="linkedin" fill="#0A66C2" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="instagram" fill="#E1306C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="twitter" fill="#1DA1F2" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="facebook" fill="#1877F2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="reach" className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Reach data visualization
                </div>
              </TabsContent>
              <TabsContent value="clicks" className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Click data visualization
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="col-span-7 md:col-span-3 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Post</CardTitle>
              <CardDescription>Create and publish content quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Editor mode:</p>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="use-rich-editor" className="text-sm">
                      Rich Editor
                    </Label>
                    <Switch id="use-rich-editor" checked={useRichEditor} onCheckedChange={setUseRichEditor} />
                  </div>
                </div>
                {useRichEditor ? (
                  <SimpleEditor
                    content={quickPostContent}
                    onContentChange={setQuickPostContent}
                    onAddMedia={() => {
                      toast({
                        title: "Media Browser",
                        description: "Media browser would open here in a full implementation.",
                      })
                    }}
                  />
                ) : (
                  <Textarea
                    placeholder="Write your post here..."
                    value={quickPostContent}
                    onChange={(e) => setQuickPostContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant={selectedPlatform === "linkedin" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform("linkedin")}
                    className="gap-2"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Button>
                  <Button
                    variant={selectedPlatform === "twitter" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform("twitter")}
                    className="gap-2"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </Button>
                  <Button
                    variant={selectedPlatform === "instagram" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform("instagram")}
                    className="gap-2"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                    Instagram
                  </Button>
                  <Button
                    variant={selectedPlatform === "facebook" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform("facebook")}
                    className="gap-2"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto gap-2"
                onClick={handleQuickPost}
                disabled={isPosting || !quickPostContent.trim() || !selectedPlatform}
              >
                <Send className="h-4 w-4" />
                {isPosting ? "Posting..." : "Post Now"}
              </Button>
            </CardFooter>
          </Card>

          <DashboardActivity userId={user.id} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="justify-start h-auto py-3">
              <PlusCircle className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Create New Post</div>
                <div className="text-xs text-muted-foreground mt-1">Draft and schedule a new post</div>
              </div>
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto py-3">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Schedule</div>
                  <div className="text-xs text-muted-foreground mt-1">View calendar</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3">
                <Image className="mr-2 h-5 w-5 text-violet-500" />
                <div className="text-left">
                  <div className="font-medium">Media</div>
                  <div className="text-xs text-muted-foreground mt-1">Upload assets</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3">
                <FileText className="mr-2 h-5 w-5 text-amber-500" />
                <div className="text-left">
                  <div className="font-medium">Content</div>
                  <div className="text-xs text-muted-foreground mt-1">Manage library</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3">
                <BarChart2 className="mr-2 h-5 w-5 text-emerald-500" />
                <div className="text-left">
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-muted-foreground mt-1">View reports</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

