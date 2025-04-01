"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { BillingSettings } from "@/components/settings/billing-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile & Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="api" className="mt-6">
          <ApiSettings />
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

