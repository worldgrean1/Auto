"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Calendar,
  FileText,
  Grid,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Share2,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Campaigns",
      icon: Calendar,
      href: "/dashboard/campaigns",
      variant: "ghost",
    },
    {
      title: "Content Library",
      icon: FileText,
      href: "/dashboard/content-library",
      variant: "ghost",
    },
    {
      title: "Media Assets",
      icon: Image,
      href: "/dashboard/content-library?tab=media",
      variant: "ghost",
    },
    {
      title: "Integrations",
      icon: Share2,
      href: "/dashboard/integrations",
      variant: "ghost",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      href: "/dashboard/analytics",
      variant: "ghost",
    },
    {
      title: "Team",
      icon: Users,
      href: "/dashboard/team",
      variant: "ghost",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      href: "/dashboard/chat",
      variant: "ghost",
    },
  ]

  return (
    <TooltipProvider>
      <div className={cn("pb-12", className)}>
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <div className="flex h-12 items-center justify-start rounded-md bg-primary px-4">
              <Grid className="h-6 w-6 text-primary-foreground" />
              <span className="ml-2 font-bold text-lg text-primary-foreground">SocialPro</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Navigation</h2>
              <ThemeToggle />
            </div>
          </div>
          <div className="px-3">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-1">
                {routes.map((route) => (
                  <Tooltip key={route.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={route.href}
                        className={cn(
                          "flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
                          pathname.includes(route.href) && route.href !== "/dashboard"
                            ? "bg-accent/50 text-accent-foreground"
                            : "",
                        )}
                      >
                        <route.icon className="mr-2 h-5 w-5" />
                        <span>{route.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {route.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Settings & Support</h3>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/settings"
                      className={cn(
                        "flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/support"
                      className={cn(
                        "flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === "/dashboard/support" ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <HelpCircle className="mr-2 h-5 w-5" />
                      <span>Support</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Support</TooltipContent>
                </Tooltip>
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

