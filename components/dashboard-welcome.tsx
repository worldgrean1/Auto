import type { User } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardWelcomeProps {
  user: User
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  // Get time of day for greeting
  const hour = new Date().getHours()
  let greeting = "Good evening"
  let timeOfDay = "tonight"

  if (hour < 12) {
    greeting = "Good morning"
    timeOfDay = "today"
  } else if (hour < 18) {
    greeting = "Good afternoon"
    timeOfDay = "today"
  }

  return (
    <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-background shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-background">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {greeting}, {user.name}
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your social media {timeOfDay}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Pro Plan</div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
              All systems operational
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

