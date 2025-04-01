import type { User } from "@/lib/types"
import { UserAvatar } from "@/components/ui/user-avatar"

interface DashboardWelcomeProps {
  user: User
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  // Get time of day for greeting
  const hour = new Date().getHours()
  let greeting = "Good evening"

  if (hour < 12) {
    greeting = "Good morning"
  } else if (hour < 18) {
    greeting = "Good afternoon"
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center space-x-4">
        <UserAvatar user={user} size="lg" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {greeting}, {user.name}
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your social media today</p>
        </div>
      </div>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Pro Plan</div>
        <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
          All systems operational
        </div>
      </div>
    </div>
  )
}

