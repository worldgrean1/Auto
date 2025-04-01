// Mock function for dashboard metrics
export async function getMetrics(userId: string): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    totalPosts: 24,
    scheduledPosts: 8,
    engagementRate: "3.5%",
    reachGrowth: "+12%",
  }
}

