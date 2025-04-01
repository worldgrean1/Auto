import { MessageSquare, Users, Clock, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsData {
  totalMessages: number
  totalContacts: number
  activeTime: string
  responseRate: string
}

interface DashboardStatsProps {
  stats: StatsData
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const items = [
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      change: "+12% from last month",
      changeType: "positive",
      iconColor: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Contacts",
      value: stats.totalContacts,
      icon: Users,
      change: "+5% from last month",
      changeType: "positive",
      iconColor: "text-violet-500 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
    },
    {
      title: "Active Time",
      value: stats.activeTime,
      icon: Clock,
      change: "+8% from last month",
      changeType: "positive",
      iconColor: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Response Rate",
      value: stats.responseRate,
      icon: Activity,
      change: "-2% from last month",
      changeType: "negative",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${item.bgColor}`}>
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`rounded-full p-2 ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{item.value}</div>
            <p
              className={`mt-1 text-xs ${item.changeType === "positive" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
            >
              {item.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

