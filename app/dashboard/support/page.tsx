"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedFAQ } from "@/components/support/enhanced-faq"
import { DocumentationViewer } from "@/components/support/documentation-viewer"
import { ContactSupport } from "@/components/support/contact-support"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"

export default function SupportPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Support Center" description="Get help and learn how to use the platform" />

      <Tabs defaultValue="docs">
        <TabsList>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        <TabsContent value="docs" className="mt-6">
          <DocumentationViewer />
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <EnhancedFAQ />
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <ContactSupport />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

