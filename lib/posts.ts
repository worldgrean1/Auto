// Types for posts
export interface Post {
  id: string
  title: string
  content: string
  status: "draft" | "scheduled" | "published"
  platforms: string[]
  media?: any[]
  publishedAt?: Date
  scheduledFor?: Date
  updatedAt?: Date
  createdAt: Date
}

// Mock function to create a post
export async function createPost(postData: Partial<Post>): Promise<Post> {
  // This would normally be an API call to create a post
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: postData.title || "",
        content: postData.content || "",
        status: postData.schedulePost ? "scheduled" : "published",
        platforms: postData.platforms || [],
        media: postData.media || [],
        publishedAt: postData.schedulePost ? undefined : new Date(),
        scheduledFor: postData.schedulePost ? postData.scheduledDate : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      resolve(newPost)
    }, 1000)
  })
}

// Mock function to get posts
export async function getPosts(): Promise<Post[]> {
  // This would normally be an API call to fetch posts
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Summer Sale Announcement",
          content: "Don't miss our summer sale! Up to 50% off on all products. #summersale #discount",
          status: "published",
          platforms: ["facebook", "instagram", "twitter"],
          publishedAt: new Date(2023, 5, 15),
          createdAt: new Date(2023, 5, 15),
        },
        {
          id: "2",
          title: "New Product Launch",
          content: "Introducing our newest product line! Check it out now. #newproduct #launch",
          status: "scheduled",
          platforms: ["facebook", "instagram", "linkedin"],
          scheduledFor: new Date(2023, 6, 1),
          createdAt: new Date(2023, 5, 20),
        },
        {
          id: "3",
          title: "Customer Testimonial",
          content: "Hear what our customers are saying about us! #testimonial #customerlove",
          status: "draft",
          platforms: ["facebook", "linkedin"],
          updatedAt: new Date(2023, 5, 10),
          createdAt: new Date(2023, 5, 8),
        },
      ])
    }, 500)
  })
}

