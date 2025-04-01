"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Edit, Eye, Filter, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { getPosts } from "@/lib/posts"

export function PostsList() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "published":
        return "success"
      case "scheduled":
        return "outline"
      case "draft":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "facebook":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case "twitter":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        )
      case "instagram":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
          </svg>
        )
      case "linkedin":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 w-1/3 bg-muted rounded mb-4"></div>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-muted rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px] pl-8"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{post.title}</h3>
                    <Badge variant={getStatusBadgeVariant(post.status)} className="capitalize">
                      {post.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {post.platforms.map((platform) => (
                          <span key={platform} className="text-muted-foreground">
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                      </div>

                      {post.status === "scheduled" && post.scheduledFor && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{format(new Date(post.scheduledFor), "MMM d, yyyy")}</span>
                          <Clock className="h-3 w-3 mx-1" />
                          <span>{format(new Date(post.scheduledFor), "h:mm a")}</span>
                        </div>
                      )}

                      {post.status === "published" && post.publishedAt && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Published {format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                        </div>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="published" className="mt-6 space-y-4">
          {filteredPosts.filter((post) => post.status === "published").length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No published posts found</p>
            </div>
          ) : (
            filteredPosts
              .filter((post) => post.status === "published")
              .map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    {/* Same content as above */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <Badge variant="success" className="capitalize">
                        {post.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>

                        {post.publishedAt && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Published {format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6 space-y-4">
          {/* Similar content for scheduled posts */}
          {filteredPosts.filter((post) => post.status === "scheduled").length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No scheduled posts found</p>
            </div>
          ) : (
            filteredPosts
              .filter((post) => post.status === "scheduled")
              .map((post) => (
                <Card key={post.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {post.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>

                        {post.scheduledFor && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{format(new Date(post.scheduledFor), "MMM d, yyyy")}</span>
                            <Clock className="h-3 w-3 mx-1" />
                            <span>{format(new Date(post.scheduledFor), "h:mm a")}</span>
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="draft" className="mt-6 space-y-4">
          {/* Similar content for draft posts */}
          {filteredPosts.filter((post) => post.status === "draft").length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No draft posts found</p>
            </div>
          ) : (
            filteredPosts
              .filter((post) => post.status === "draft")
              .map((post) => (
                <Card key={post.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <Badge variant="secondary" className="capitalize">
                        {post.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {post.platforms.map((platform) => (
                            <span key={platform} className="text-muted-foreground">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>

                        {post.updatedAt && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Updated {format(new Date(post.updatedAt), "MMM d, yyyy")}</span>
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

