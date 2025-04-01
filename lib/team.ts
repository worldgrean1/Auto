// Mock team members for frontend-only demo
const MOCK_TEAM_MEMBERS = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    avatar: null,
    lastActive: "2 hours ago",
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    avatar: null,
    lastActive: "5 hours ago",
  },
  {
    id: "user_3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Editor",
    status: "active",
    avatar: null,
    lastActive: "1 day ago",
  },
  {
    id: "user_4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Viewer",
    status: "active",
    avatar: null,
    lastActive: "Just now",
  },
  {
    id: "invite_1",
    name: "",
    email: "taylor@example.com",
    role: "Editor",
    status: "pending",
    avatar: null,
    lastActive: null,
  },
  {
    id: "invite_2",
    name: "",
    email: "morgan@example.com",
    role: "Viewer",
    status: "pending",
    avatar: null,
    lastActive: null,
  },
]

export async function getTeamMembers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return MOCK_TEAM_MEMBERS
}

export async function inviteTeamMember(data: { email: string; role: string }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, this would send an invitation and add to database
  // For demo, we'll just return success
  return {
    success: true,
    id: `invite_${Date.now()}`,
    email: data.email,
    role: data.role,
    status: "pending",
  }
}

export async function updateTeamMemberRole(id: string, role: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would update the role in database
  // For demo, we'll just return success
  return { success: true }
}

export async function removeTeamMember(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would remove the member from database
  // For demo, we'll just return success
  return { success: true }
}

