import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, BookOpen } from "lucide-react"

export function Documentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
          <CardDescription>Learn how to use our platform with comprehensive guides and tutorials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guides">
            <TabsList>
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
              <TabsTrigger value="api">API Documentation</TabsTrigger>
            </TabsList>
            <TabsContent value="guides" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Getting Started",
                    description: "Learn the basics of using the platform",
                    icon: BookOpen,
                  },
                  {
                    title: "Creating Campaigns",
                    description: "Learn how to create and schedule social media campaigns",
                    icon: FileText,
                  },
                  {
                    title: "Managing Content Library",
                    description: "Organize your media assets and templates",
                    icon: FileText,
                  },
                  {
                    title: "Social Media Integrations",
                    description: "Connect and manage your social media accounts",
                    icon: FileText,
                  },
                  {
                    title: "Analytics & Reporting",
                    description: "Understand your social media performance",
                    icon: FileText,
                  },
                  {
                    title: "Account Settings",
                    description: "Configure your account and preferences",
                    icon: FileText,
                  },
                ].map((guide, index) => (
                  <Card key={index} className="flex items-start p-4">
                    <guide.icon className="mr-4 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tutorials" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Platform Overview",
                    description: "A complete tour of the platform",
                    duration: "10:25",
                  },
                  {
                    title: "Scheduling Your First Post",
                    description: "Step-by-step guide to scheduling posts",
                    duration: "8:12",
                  },
                  {
                    title: "Working with Media",
                    description: "How to upload and manage media assets",
                    duration: "7:45",
                  },
                  {
                    title: "Using Templates",
                    description: "Save time with post templates",
                    duration: "6:30",
                  },
                  {
                    title: "Understanding Analytics",
                    description: "How to interpret your performance data",
                    duration: "12:18",
                  },
                  {
                    title: "Advanced Scheduling Techniques",
                    description: "Tips and tricks for power users",
                    duration: "15:42",
                  },
                ].map((tutorial, index) => (
                  <Card key={index} className="flex items-start p-4">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{tutorial.duration}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="api" className="space-y-4 pt-4">
              <Card className="p-4">
                <h3 className="font-medium">API Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Our RESTful API allows you to programmatically access and manage your social media content.
                </p>
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">API Endpoints</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Authentication</li>
                    <li>Campaigns</li>
                    <li>Posts</li>
                    <li>Media</li>
                    <li>Analytics</li>
                    <li>Webhooks</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-sm font-medium text-primary hover:underline">
                    View Full API Documentation →
                  </a>
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium">API Libraries</h3>
                <p className="text-sm text-muted-foreground">
                  We provide client libraries for popular programming languages to make integration easier.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <div className="rounded-md bg-muted p-2 text-center text-sm">JavaScript</div>
                  <div className="rounded-md bg-muted p-2 text-center text-sm">Python</div>
                  <div className="rounded-md bg-muted p-2 text-center text-sm">PHP</div>
                  <div className="rounded-md bg-muted p-2 text-center text-sm">Ruby</div>
                  <div className="rounded-md bg-muted p-2 text-center text-sm">Java</div>
                  <div className="rounded-md bg-muted p-2 text-center text-sm">Go</div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

