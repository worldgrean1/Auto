export interface User {
  id: string
  name: string
  email: string
  image: string | null
}

export interface Session {
  user: User
  expires: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  status: "draft" | "scheduled" | "published" | "completed"
  createdAt: string
  scheduledDate: string
  publishedDate?: string
  platforms: string[]
  performance?: {
    likes: number
    comments: number
    shares: number
    impressions: number
    reach: number
  }
}

export interface Post {
  id: string
  campaignId: string
  platform: string
  content: string
  scheduledDate: string
  publishedDate?: string
  status: "draft" | "scheduled" | "published"
  media?: {
    type: "image" | "video" | "audio"
    url: string
    name: string
  }
}

export interface Draft {
  id: string
  title: string
  content: string
  platforms: string[]
  createdAt: string
  updatedAt: string
}

export interface MediaAsset {
  id: string
  name: string
  type: "image" | "video" | "audio"
  url: string
  size: number
  createdAt: string
}

export interface Template {
  id: string
  name: string
  content: string
  platforms: string[]
  category: string
  createdAt: string
}

