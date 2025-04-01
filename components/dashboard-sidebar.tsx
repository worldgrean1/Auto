"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Calendar,
  FileText,
  Image,
  LayoutDashboard,
  MessageSquare,
  PenTool,
  Settings,
  Share2,
  Users,
  HelpCircle,
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Posts",
    href: "/dashboard/posts",
    icon: <PenTool className="mr-2 h-4 w-4" />,
    submenu: [
      {
        title: "All Posts",
        href: "/dashboard/posts",
      },
      {
        title: "Create New",
        href: "/dashboard/posts/new",
      },
      {
        title: "Scheduled",
        href: "/dashboard/posts?tab=scheduled",
      },
      {
        title: "Published",
        href: "/dashboard/posts?tab=published",
      },
    ],
  },
  {
    title: "Content Library",
    href: "/dashboard/content-library",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Media Assets",
    href: "/dashboard/media-assets",
    icon: <Image className="mr-2 h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: <Share2 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Social Media Manager</h2>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {item.title}
                    </span>
                    {item.submenu && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn("h-4 w-4 transition-transform", isActive && "transform rotate-180")}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </Link>

                  {item.submenu && isActive && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subitem) => {
                        const isSubActive = pathname === subitem.href

                        return (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              isSubActive ? "bg-accent/50 text-accent-foreground" : "transparent",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

