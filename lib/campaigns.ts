import type { Campaign, Post } from "@/lib/types"

// Mock data for campaigns
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "campaign_1",
    name: "Summer Sale Promotion",
    description: "Promote our summer sale across all social media platforms",
    status: "scheduled",
    createdAt: "2023-06-15T10:00:00Z",
    scheduledDate: "2023-06-20T09:00:00Z",
    platforms: ["facebook", "instagram", "twitter", "linkedin"],
  },
  {
    id: "campaign_2",
    name: "Product Launch",
    description: "Launch our new product line with teasers and announcements",
    status: "published",
    createdAt: "2023-05-10T08:30:00Z",
    scheduledDate: "2023-05-15T10:00:00Z",
    publishedDate: "2023-05-15T10:00:00Z",
    platforms: ["instagram", "facebook"],
    performance: {
      likes: 245,
      comments: 87,
      shares: 56,
      impressions: 3456,
      reach: 2789,
    },
  },
  {
    id: "campaign_3",
    name: "Holiday Special",
    description: "Special holiday promotions and greetings",
    status: "published",
    createdAt: "2023-04-01T14:20:00Z",
    scheduledDate: "2023-04-10T08:00:00Z",
    publishedDate: "2023-04-10T08:00:00Z",
    platforms: ["twitter", "linkedin", "facebook"],
    performance: {
      likes: 189,
      comments: 45,
      shares: 78,
      impressions: 2567,
      reach: 1987,
    },
  },
]

// Mock data for posts
const MOCK_POSTS: Post[] = [
  {
    id: "post_1",
    campaignId: "campaign_1",
    platform: "facebook",
    content: "Don't miss our summer sale! Up to 50% off on all products. Limited time only! #summersale #discount",
    scheduledDate: "2023-06-20T09:00:00Z",
    status: "scheduled",
    media: {
      type: "image",
      url: "/placeholder.svg?height=500&width=500",
      name: "summer_sale_banner.jpg",
    },
  },
  {
    id: "post_2",
    campaignId: "campaign_1",
    platform: "instagram",
    content: "Summer vibes and amazing deals! 🌞 Shop now and get up to 50% off! #summersale #shopnow",
    scheduledDate: "2023-06-20T12:00:00Z",
    status: "scheduled",
    media: {
      type: "image",
      url: "/placeholder.svg?height=500&width=500",
      name: "instagram_summer_post.jpg",
    },
  },
  {
    id: "post_3",
    campaignId: "campaign_2",
    platform: "instagram",
    content: "Introducing our new product line! Check it out now! #newproduct #launch",
    scheduledDate: "2023-05-15T10:00:00Z",
    publishedDate: "2023-05-15T10:00:00Z",
    status: "published",
    media: {
      type: "video",
      url: "/placeholder.svg?height=500&width=500",
      name: "product_launch_video.mp4",
    },
  },
  {
    id: "post_4",
    campaignId: "campaign_3",
    platform: "twitter",
    content: "Happy holidays from our team to yours! Enjoy special discounts this season. #holidays #specialoffer",
    scheduledDate: "2023-04-10T08:00:00Z",
    publishedDate: "2023-04-10T08:00:00Z",
    status: "published",
    media: {
      type: "image",
      url: "/placeholder.svg?height=500&width=500",
      name: "holiday_greeting.jpg",
    },
  },
]

// Mock functions for campaigns
export async function getScheduledCampaigns(): Promise<Campaign[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_CAMPAIGNS.filter((campaign) => campaign.status === "scheduled")
}

export async function getHistoricalCampaigns(): Promise<Campaign[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_CAMPAIGNS.filter((campaign) => campaign.status === "published" || campaign.status === "completed")
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === id)
  return campaign || null
}

export async function getCampaignPosts(campaignId: string): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_POSTS.filter((post) => post.campaignId === campaignId)
}

export async function createCampaign(data: any): Promise<Campaign> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const newCampaign: Campaign = {
    id: `campaign_${Date.now()}`,
    name: data.name,
    description: data.description || "",
    status: "scheduled",
    createdAt: new Date().toISOString(),
    scheduledDate: data.scheduledDate.toISOString(),
    platforms: data.platforms || [data.platform],
  }

  // In a real app, we would save this to a database
  // For demo, we'll just return the new campaign
  MOCK_CAMPAIGNS.push(newCampaign)

  return newCampaign
}

export async function getCampaignAnalytics(): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    engagementByDay: [
      { date: "Mon", likes: 120, comments: 45, shares: 20 },
      { date: "Tue", likes: 150, comments: 55, shares: 30 },
      { date: "Wed", likes: 180, comments: 60, shares: 35 },
      { date: "Thu", likes: 200, comments: 70, shares: 40 },
      { date: "Fri", likes: 250, comments: 85, shares: 50 },
      { date: "Sat", likes: 300, comments: 100, shares: 65 },
      { date: "Sun", likes: 280, comments: 90, shares: 55 },
    ],
    reachByDay: [
      { date: "Mon", impressions: 1200, reach: 900 },
      { date: "Tue", impressions: 1500, reach: 1100 },
      { date: "Wed", impressions: 1800, reach: 1300 },
      { date: "Thu", impressions: 2000, reach: 1500 },
      { date: "Fri", impressions: 2500, reach: 1800 },
      { date: "Sat", impressions: 3000, reach: 2200 },
      { date: "Sun", impressions: 2800, reach: 2000 },
    ],
    engagementByPlatform: [
      { name: "Facebook", value: 35 },
      { name: "Instagram", value: 40 },
      { name: "Twitter", value: 15 },
      { name: "LinkedIn", value: 10 },
    ],
    topCampaigns: [
      { id: "1", name: "Summer Sale", date: "2023-06-15", engagement: 450, platform: "Instagram" },
      { id: "2", name: "Product Launch", date: "2023-05-10", engagement: 380, platform: "Facebook" },
      { id: "3", name: "Holiday Special", date: "2023-04-01", engagement: 320, platform: "Twitter" },
      { id: "4", name: "Brand Awareness", date: "2023-03-15", engagement: 280, platform: "LinkedIn" },
    ],
    demographics: [
      { age: "18-24", male: 20, female: 25, other: 5 },
      { age: "25-34", male: 35, female: 40, other: 8 },
      { age: "35-44", male: 25, female: 30, other: 5 },
      { age: "45-54", male: 15, female: 18, other: 3 },
      { age: "55+", male: 10, female: 12, other: 2 },
    ],
  }
}

export async function getCampaignPerformance(campaignId: string): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    engagementByDay: [
      { date: "Day 1", likes: 45, comments: 15, shares: 8 },
      { date: "Day 2", likes: 60, comments: 22, shares: 12 },
      { date: "Day 3", likes: 75, comments: 30, shares: 18 },
      { date: "Day 4", likes: 90, comments: 35, shares: 22 },
      { date: "Day 5", likes: 105, comments: 40, shares: 25 },
      { date: "Day 6", likes: 120, comments: 45, shares: 30 },
      { date: "Day 7", likes: 135, comments: 50, shares: 35 },
    ],
    reachByDay: [
      { date: "Day 1", impressions: 500, reach: 350 },
      { date: "Day 2", impressions: 650, reach: 450 },
      { date: "Day 3", impressions: 800, reach: 550 },
      { date: "Day 4", impressions: 950, reach: 650 },
      { date: "Day 5", impressions: 1100, reach: 750 },
      { date: "Day 6", impressions: 1250, reach: 850 },
      { date: "Day 7", impressions: 1400, reach: 950 },
    ],
    demographics: [
      { name: "Male", value: 45 },
      { name: "Female", value: 50 },
      { name: "Other", value: 5 },
    ],
    platformBreakdown: [
      { name: "Facebook", engagement: 120, reach: 800 },
      { name: "Instagram", engagement: 180, reach: 1200 },
      { name: "Twitter", engagement: 90, reach: 600 },
      { name: "LinkedIn", engagement: 60, reach: 400 },
    ],
    engagementByTime: [
      { time: "6am", engagement: 10 },
      { time: "9am", engagement: 25 },
      { time: "12pm", engagement: 40 },
      { time: "3pm", engagement: 55 },
      { time: "6pm", engagement: 70 },
      { time: "9pm", engagement: 45 },
      { time: "12am", engagement: 20 },
    ],
  }
}

