import type { Metadata } from "next"
import { PostCreationForm } from "@/components/posts/post-creation-form"

export const metadata: Metadata = {
  title: "Create New Post",
  description: "Create and schedule new social media posts",
}

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
          <p className="text-muted-foreground">Create, customize, and schedule your social media content</p>
        </div>
      </div>

      <PostCreationForm />
    </div>
  )
}

