import { BarChart2, Calendar, Share2, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsData {
  totalPosts: number
  scheduledPosts: number
  engagementRate: string
  reachGrowth: string
  totalPostsChange?: number
  scheduledPostsChange?: number
  engagementRateChange?: number
  reachGrowthChange?: number
}

interface DashboardMetricsProps {
  metrics: MetricsData
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const items = [
    {
      title: "Total Posts",
      value: metrics.totalPosts,
      icon: Share2,
      change: metrics.totalPostsChange,
      unit: "",
      bgClass: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Scheduled Posts",
      value: metrics.scheduledPosts,
      icon: Calendar,
      change: metrics.scheduledPostsChange,
      unit: "",
      bgClass: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "Engagement Rate",
      value: metrics.engagementRate,
      icon: BarChart2,
      change: metrics.engagementRateChange,
      unit: "%",
      bgClass: "bg-amber-50 dark:bg-amber-950/50",
    },
    {
      title: "Reach Growth",
      value: metrics.reachGrowth,
      icon: TrendingUp,
      change: metrics.reachGrowthChange,
      unit: "%",
      bgClass: "bg-green-50 dark:bg-green-950/50",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title} className="overflow-hidden light-card-hover dark-card-hover">
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${item.bgClass}`}>
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{item.value}</div>
            {item.change !== undefined && (
              <div className="flex items-center text-xs mt-1">
                {item.change > 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={item.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(item.change)}
                  {item.unit} from last period
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

