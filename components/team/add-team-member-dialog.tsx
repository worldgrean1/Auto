"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["Admin", "Editor", "Viewer"], {
    required_error: "Please select a role",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function AddTeamMemberDialog({ open, onOpenChange, onAdd }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "Editor",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newMember = {
        email: values.email,
        role: values.role,
        status: "pending",
        name: "", // In a real app, this would be filled when the user accepts the invitation
      }

      onAdd(newMember)

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${values.email}`,
      })

      form.reset()
      onOpenChange(false)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>Invite a team member to collaborate with you on this project.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="Admin" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <div className="font-medium">Admin</div>
                          <p className="text-xs text-muted-foreground">Full access to all settings</p>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="Editor" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <div className="font-medium">Editor</div>
                          <p className="text-xs text-muted-foreground">Can create and edit content</p>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="Viewer" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <div className="font-medium">Viewer</div>
                          <p className="text-xs text-muted-foreground">Can view content only</p>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

