// Mock functions for analytics data
export async function getEngagementData(): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    overallEngagement: [
      { date: "Jan", likes: 120, comments: 45, shares: 20 },
      { date: "Feb", likes: 150, comments: 55, shares: 30 },
      { date: "Mar", likes: 180, comments: 60, shares: 35 },
      { date: "Apr", likes: 200, comments: 70, shares: 40 },
      { date: "May", likes: 250, comments: 85, shares: 50 },
      { date: "Jun", likes: 300, comments: 100, shares: 65 },
    ],
    engagementByPlatform: [
      { platform: "Facebook", likes: 450, comments: 180, shares: 120 },
      { platform: "Instagram", likes: 680, comments: 320, shares: 90 },
      { platform: "Twitter", likes: 320, comments: 150, shares: 210 },
      { platform: "LinkedIn", likes: 250, comments: 80, shares: 60 },
    ],
    engagementByContentType: [
      { name: "Images", value: 45 },
      { name: "Videos", value: 30 },
      { name: "Text", value: 15 },
      { name: "Links", value: 10 },
    ],
    topPosts: [
      {
        id: "1",
        title: "Product Launch Announcement",
        date: "2023-06-15",
        engagement: 450,
        engagementRate: 4.5,
        platform: "Instagram",
      },
      {
        id: "2",
        title: "Customer Testimonial Video",
        date: "2023-05-10",
        engagement: 380,
        engagementRate: 3.8,
        platform: "Facebook",
      },
      {
        id: "3",
        title: "Industry Tips Thread",
        date: "2023-04-01",
        engagement: 320,
        engagementRate: 3.2,
        platform: "Twitter",
      },
      {
        id: "4",
        title: "Company Milestone",
        date: "2023-03-15",
        engagement: 280,
        engagementRate: 2.8,
        platform: "LinkedIn",
      },
    ],
    engagementByTime: [
      { hour: "6am", engagement: 50 },
      { hour: "9am", engagement: 120 },
      { hour: "12pm", engagement: 180 },
      { hour: "3pm", engagement: 220 },
      { hour: "6pm", engagement: 280 },
      { hour: "9pm", engagement: 150 },
      { hour: "12am", engagement: 80 },
    ],
  }
}

export async function getReachData(): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    reachTrend: [
      { date: "Jan", reach: 5000, impressions: 8000 },
      { date: "Feb", reach: 6500, impressions: 10000 },
      { date: "Mar", reach: 8000, impressions: 12000 },
      { date: "Apr", reach: 9500, impressions: 14000 },
      { date: "May", reach: 11000, impressions: 16000 },
      { date: "Jun", reach: 12500, impressions: 18000 },
    ],
    reachByPlatform: [
      { platform: "Facebook", reach: 4500, impressions: 7000 },
      { platform: "Instagram", reach: 6800, impressions: 9500 },
      { platform: "Twitter", reach: 3200, impressions: 5000 },
      { platform: "LinkedIn", reach: 2500, impressions: 3500 },
    ],
    reachVsImpressions: [
      { date: "Week 1", reach: 2000, impressions: 3000 },
      { date: "Week 2", reach: 2500, impressions: 3800 },
      { date: "Week 3", reach: 3000, impressions: 4500 },
      { date: "Week 4", reach: 3500, impressions: 5200 },
    ],
    audienceGrowth: [
      { date: "Jan", followers: 1000 },
      { date: "Feb", followers: 1200 },
      { date: "Mar", followers: 1500 },
      { date: "Apr", followers: 1800 },
      { date: "May", followers: 2200 },
      { date: "Jun", followers: 2600 },
    ],
    reachByDemographics: [
      { age: "18-24", male: 1200, female: 1500, other: 300 },
      { age: "25-34", male: 1800, female: 2200, other: 400 },
      { age: "35-44", male: 1500, female: 1800, other: 300 },
      { age: "45-54", male: 900, female: 1100, other: 200 },
      { age: "55+", male: 600, female: 800, other: 100 },
    ],
  }
}

export async function getConversionData(): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    overallConversion: [
      { date: "Jan", clicks: 500, leads: 50, sales: 10 },
      { date: "Feb", clicks: 650, leads: 65, sales: 13 },
      { date: "Mar", clicks: 800, leads: 80, sales: 16 },
      { date: "Apr", clicks: 950, leads: 95, sales: 19 },
      { date: "May", clicks: 1100, leads: 110, sales: 22 },
      { date: "Jun", clicks: 1250, leads: 125, sales: 25 },
    ],
    conversionByPlatform: [
      { platform: "Facebook", clicks: 450, leads: 45, sales: 9 },
      { platform: "Instagram", clicks: 680, leads: 68, sales: 14 },
      { platform: "Twitter", clicks: 320, leads: 32, sales: 6 },
      { platform: "LinkedIn", clicks: 250, leads: 25, sales: 5 },
    ],
    conversionByCampaign: [
      { name: "Summer Sale", value: 35 },
      { name: "Product Launch", value: 25 },
      { name: "Holiday Special", value: 20 },
      { name: "Brand Awareness", value: 20 },
    ],
    conversionRates: {
      clickRate: 3.2,
      leadRate: 10.5,
      saleRate: 2.1,
    },
    roiByPlatform: [
      { platform: "Facebook", roi: 320 },
      { platform: "Instagram", roi: 450 },
      { platform: "Twitter", roi: 280 },
      { platform: "LinkedIn", roi: 380 },
    ],
  }
}

