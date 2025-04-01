"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTeamMembers } from "@/lib/team"
import { AddTeamMemberDialog } from "@/components/team/add-team-member-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { TeamRoleDialog } from "@/components/team/team-role-dialog"

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamMembers()
        setTeamMembers(data)
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [])

  const handleAddTeamMember = (member) => {
    setTeamMembers((prev) => [...prev, { ...member, id: `member_${Date.now()}` }])
  }

  const handleDeleteMember = () => {
    if (selectedMember) {
      setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id))
      setDeleteDialogOpen(false)
      setSelectedMember(null)
    }
  }

  const handleUpdateRole = (role) => {
    if (selectedMember) {
      setTeamMembers(teamMembers.map((member) => (member.id === selectedMember.id ? { ...member, role } : member)))
      setEditRoleDialogOpen(false)
      setSelectedMember(null)
    }
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInvites = () => teamMembers.filter((member) => member.status === "pending")
  const getActiveMembers = () => teamMembers.filter((member) => member.status === "active")

  const getRoleBadgeVariant = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "default"
      case "editor":
        return "outline"
      case "viewer":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Team Management" description="Manage your team members and their permissions">
        <Button onClick={() => setAddTeamMemberOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </DashboardHeader>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
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

      <Tabs defaultValue="all-members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-members">All Members ({teamMembers.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({getActiveMembers().length})</TabsTrigger>
          <TabsTrigger value="pending">Invitations ({getInvites().length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all-members">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-[250px] rounded bg-muted animate-pulse" />
                          <div className="h-3 w-[150px] rounded bg-muted animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium">No team members found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term or add new team members.</p>
                  <Button className="mt-4" onClick={() => setAddTeamMemberOpen(true)}>
                    Add Team Member
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                        </div>
                        <div className="col-span-3">
                          <Badge variant={member.status === "active" ? "outline" : "secondary"} className="capitalize">
                            {member.status}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedMember(member)
                                  setEditRoleDialogOpen(true)
                                }}
                              >
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Activity</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  setSelectedMember(member)
                                  setDeleteDialogOpen(true)
                                }}
                              >
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-[250px] rounded bg-muted animate-pulse" />
                          <div className="h-3 w-[150px] rounded bg-muted animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {getActiveMembers().map((member) => (
                      <div key={member.id} className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                        </div>
                        <div className="col-span-3">
                          <Badge variant="outline" className="capitalize">
                            {member.status}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Role</DropdownMenuItem>
                              <DropdownMenuItem>View Activity</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-[250px] rounded bg-muted animate-pulse" />
                          <div className="h-3 w-[150px] rounded bg-muted animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : getInvites().length === 0 ? (
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium">No pending invitations</h3>
                  <p className="text-muted-foreground mt-2">Invite team members to collaborate with you.</p>
                  <Button className="mt-4" onClick={() => setAddTeamMemberOpen(true)}>
                    Invite Team Member
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-5">Email</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {getInvites().map((member) => (
                      <div key={member.id} className="grid grid-cols-12 items-center p-3">
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.email.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="font-medium">{member.name || "Invited User"}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                        </div>
                        <div className="col-span-3">
                          <Badge variant="secondary" className="capitalize">
                            {member.status}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Cancel Invitation
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddTeamMemberDialog open={addTeamMemberOpen} onOpenChange={setAddTeamMemberOpen} onAdd={handleAddTeamMember} />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Remove team member"
        description={`Are you sure you want to remove ${selectedMember?.name || "this team member"}? This action cannot be undone.`}
        onConfirm={handleDeleteMember}
      />

      <TeamRoleDialog
        open={editRoleDialogOpen}
        onOpenChange={setEditRoleDialogOpen}
        currentRole={selectedMember?.role}
        onUpdateRole={handleUpdateRole}
        member={selectedMember}
      />
    </DashboardShell>
  )
}

