"use client"

import { useState } from "react"
import { PlusCircle, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignsList } from "@/components/campaigns/campaigns-list"
import { CampaignHistory } from "@/components/campaigns/campaign-history"
import { CampaignAnalytics } from "@/components/campaigns/campaign-analytics"
import { CreateCampaignModal } from "@/components/campaigns/create-campaign-modal"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CampaignsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardShell>
      <DashboardHeader heading="Campaigns" description="Create, schedule, and manage your social media campaigns.">
        <Button onClick={() => setCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </DashboardHeader>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Platform</DropdownMenuItem>
                <DropdownMenuItem>Date Range</DropdownMenuItem>
                <DropdownMenuItem>Team Member</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Date (Newest first)</DropdownMenuItem>
              <DropdownMenuItem>Date (Oldest first)</DropdownMenuItem>
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="scheduled" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="scheduled" className="mt-6">
          <CampaignsList />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <CampaignHistory />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <CampaignAnalytics />
        </TabsContent>
      </Tabs>

      <CreateCampaignModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </DashboardShell>
  )
}

