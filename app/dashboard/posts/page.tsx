import type { Metadata } from "next"
import { PostsList } from "@/components/posts/posts-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Posts",
  description: "Manage your social media posts",
}

export default function PostsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage and schedule your social media content</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <PostsList />
    </div>
  )
}

