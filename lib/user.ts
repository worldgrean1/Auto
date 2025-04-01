import type { User } from "@/lib/types"

// Mock users for frontend-only demo
const MOCK_USERS = [
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: null,
  },
  {
    id: "user_3",
    name: "Alex Johnson",
    email: "alex@example.com",
    image: null,
  },
  {
    id: "user_4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    image: null,
  },
]

export async function getUsers(currentUserId: string): Promise<User[]> {
  // For frontend-only demo, return mock data
  return MOCK_USERS
}

export async function getUserStats(userId: string) {
  // For frontend-only demo, return mock data
  return {
    totalMessages: 24,
    totalContacts: 12,
    activeTime: "2h 15m",
    responseRate: "92%",
  }
}

