import type { Draft, MediaAsset, Template } from "@/lib/types"

// Mock data for drafts
const MOCK_DRAFTS: Draft[] = [
  {
    id: "draft_1",
    title: "Product Announcement Draft",
    content:
      "We're excited to announce our newest product! Stay tuned for more details coming soon. #newproduct #announcement",
    platforms: ["facebook", "twitter", "linkedin"],
    createdAt: "2023-06-10T14:30:00Z",
    updatedAt: "2023-06-12T09:15:00Z",
  },
  {
    id: "draft_2",
    title: "Customer Testimonial",
    content:
      '"This product changed my life!" - Jane D. Read more customer testimonials on our website. #testimonial #customerreview',
    platforms: ["instagram", "facebook"],
    createdAt: "2023-06-05T11:20:00Z",
    updatedAt: "2023-06-05T16:45:00Z",
  },
  {
    id: "draft_3",
    title: "Weekly Tips Series",
    content:
      "Tip #5: How to maximize your productivity with our tools. Check out our blog for the full article! #productivity #tips",
    platforms: ["linkedin", "twitter"],
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-06-02T10:30:00Z",
  },
]

// Mock data for media assets
const MOCK_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "media_1",
    name: "product_banner.jpg",
    type: "image",
    url: "/placeholder.svg?height=500&width=500",
    size: 1024000,
    createdAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "media_2",
    name: "testimonial_video.mp4",
    type: "video",
    url: "/placeholder.svg?height=500&width=500",
    size: 5120000,
    createdAt: "2023-06-05T11:20:00Z",
  },
  {
    id: "media_3",
    name: "podcast_episode.mp3",
    type: "audio",
    url: "/placeholder.svg?height=500&width=500",
    size: 3072000,
    createdAt: "2023-06-01T08:00:00Z",
  },
  {
    id: "media_4",
    name: "infographic.png",
    type: "image",
    url: "/placeholder.svg?height=500&width=500",
    size: 2048000,
    createdAt: "2023-05-28T09:45:00Z",
  },
  {
    id: "media_5",
    name: "tutorial_video.mp4",
    type: "video",
    url: "/placeholder.svg?height=500&width=500",
    size: 8192000,
    createdAt: "2023-05-20T13:15:00Z",
  },
  {
    id: "media_6",
    name: "company_logo.png",
    type: "image",
    url: "/placeholder.svg?height=500&width=500",
    size: 512000,
    createdAt: "2023-05-15T10:00:00Z",
  },
  {
    id: "media_7",
    name: "product_demo.mp4",
    type: "video",
    url: "/placeholder.svg?height=500&width=500",
    size: 10240000,
    createdAt: "2023-05-10T16:30:00Z",
  },
  {
    id: "media_8",
    name: "interview.mp3",
    type: "audio",
    url: "/placeholder.svg?height=500&width=500",
    size: 4096000,
    createdAt: "2023-05-05T11:45:00Z",
  },
]

// Mock data for templates
const MOCK_TEMPLATES: Template[] = [
  {
    id: "template_1",
    name: "Product Launch",
    content: "Introducing our newest product: [PRODUCT_NAME]! Check it out now at [LINK]. #newproduct #launch",
    platforms: ["facebook", "twitter", "linkedin"],
    category: "Marketing",
    createdAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "template_2",
    name: "Weekly Tip",
    content: "Tip of the Week: [TIP_CONTENT]. Learn more on our blog! #weeklytip #[INDUSTRY]",
    platforms: ["linkedin", "twitter"],
    category: "Educational",
    createdAt: "2023-06-05T11:20:00Z",
  },
  {
    id: "template_3",
    name: "Customer Testimonial",
    content:
      '"[TESTIMONIAL_TEXT]" - [CUSTOMER_NAME]. Read more success stories on our website! #testimonial #customerstory',
    platforms: ["instagram", "facebook"],
    category: "Social Proof",
    createdAt: "2023-06-01T08:00:00Z",
  },
  {
    id: "template_4",
    name: "Holiday Greeting",
    content: "Happy [HOLIDAY_NAME] from all of us at [COMPANY_NAME]! [HOLIDAY_MESSAGE] #[HOLIDAY_HASHTAG] #celebration",
    platforms: ["facebook", "instagram", "twitter", "linkedin"],
    category: "Seasonal",
    createdAt: "2023-05-28T09:45:00Z",
  },
  {
    id: "template_5",
    name: "Flash Sale",
    content:
      "FLASH SALE! [DISCOUNT_PERCENTAGE]% off all [PRODUCT_CATEGORY] for the next [HOURS] hours! Use code [DISCOUNT_CODE] at checkout. #flashsale #discount",
    platforms: ["facebook", "instagram", "twitter"],
    category: "Promotion",
    createdAt: "2023-05-20T13:15:00Z",
  },
]

// Mock functions for content
export async function getDrafts(): Promise<Draft[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_DRAFTS
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_MEDIA_ASSETS
}

export async function getTemplates(): Promise<Template[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_TEMPLATES
}

export async function createDraft(data: any): Promise<Draft> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const newDraft: Draft = {
    id: `draft_${Date.now()}`,
    title: data.title,
    content: data.content,
    platforms: data.platforms,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // In a real app, we would save this to a database
  // For demo, we'll just return the new draft

  return newDraft
}

export async function uploadMedia(file: File, name: string): Promise<MediaAsset> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  let type: "image" | "video" | "audio" = "image"
  if (file.type.startsWith("video/")) {
    type = "video"
  } else if (file.type.startsWith("audio/")) {
    type = "audio"
  }

  const newMedia: MediaAsset = {
    id: `media_${Date.now()}`,
    name: name || file.name,
    type,
    url: URL.createObjectURL(file), // In a real app, this would be a server URL
    size: file.size,
    createdAt: new Date().toISOString(),
  }

  // In a real app, we would upload this to a storage service
  // For demo, we'll just return the new media asset

  return newMedia
}

export async function createTemplate(data: any): Promise<Template> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const newTemplate: Template = {
    id: `template_${Date.now()}`,
    name: data.name,
    content: data.content,
    platforms: data.platforms,
    category: data.category,
    createdAt: new Date().toISOString(),
  }

  // In a real app, we would save this to a database
  // For demo, we'll just return the new template

  return newTemplate
}

