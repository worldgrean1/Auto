"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function TeamRoleDialog({ open, onOpenChange, currentRole = "Editor", onUpdateRole, member }) {
  const { toast } = useToast()
  const [role, setRole] = useState(currentRole)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (role === currentRole) {
      onOpenChange(false)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onUpdateRole(role)

      toast({
        title: "Role updated",
        description: `${member?.name || "User"}'s role has been updated to ${role}`,
      })

      setIsSubmitting(false)
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (newOpen) {
          setRole(currentRole)
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Team Member Role</DialogTitle>
          <DialogDescription>
            {member?.name ? `Change ${member.name}'s role and permissions` : "Update team member role and permissions"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={role} onValueChange={setRole} className="grid gap-4 sm:grid-cols-3">
            <div
              className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 ${role === "Admin" ? "border-primary" : ""}`}
            >
              <RadioGroupItem value="Admin" id="admin" />
              <Label htmlFor="admin" className="flex flex-col">
                <span className="font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">Full access to all settings</span>
              </Label>
            </div>
            <div
              className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 ${role === "Editor" ? "border-primary" : ""}`}
            >
              <RadioGroupItem value="Editor" id="editor" />
              <Label htmlFor="editor" className="flex flex-col">
                <span className="font-medium">Editor</span>
                <span className="text-xs text-muted-foreground">Can create and edit content</span>
              </Label>
            </div>
            <div
              className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 ${role === "Viewer" ? "border-primary" : ""}`}
            >
              <RadioGroupItem value="Viewer" id="viewer" />
              <Label htmlFor="viewer" className="flex flex-col">
                <span className="font-medium">Viewer</span>
                <span className="text-xs text-muted-foreground">Can view content only</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || role === currentRole}>
            {isSubmitting ? "Updating..." : "Update Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

