"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SavedDrafts } from "@/components/content-library/saved-drafts"
import { PostTemplates } from "@/components/content-library/post-templates"
import { AdvancedMediaManager } from "@/components/content-library/advanced-media-manager"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"

export default function ContentLibraryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Content Library" description="Manage your content assets, drafts, and templates" />

      <Tabs defaultValue="drafts">
        <TabsList>
          <TabsTrigger value="drafts">Saved Drafts</TabsTrigger>
          <TabsTrigger value="media">Media Assets</TabsTrigger>
          <TabsTrigger value="templates">Post Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="drafts" className="mt-6">
          <SavedDrafts />
        </TabsContent>
        <TabsContent value="media" className="mt-6">
          <AdvancedMediaManager />
        </TabsContent>
        <TabsContent value="templates" className="mt-6">
          <PostTemplates />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

