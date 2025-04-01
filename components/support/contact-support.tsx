"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone } from "lucide-react"

const supportFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type SupportFormValues = z.infer<typeof supportFormSchema>

export function ContactSupport() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  })

  function onSubmit(data: SupportFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible.",
      })
      form.reset()
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <a href="mailto:support@example.com" className="text-sm hover:underline">
                support@example.com
              </a>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Response time: 24-48 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">Available 9am-5pm EST</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Response time: Immediate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Phone Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+18001234567" className="text-sm hover:underline">
                +1 (800) 123-4567
              </a>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Available for Pro and Enterprise plans</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Fill out the form below to get in touch with our support team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} disabled={isLoading} />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} disabled={isLoading} />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...form.register("subject")} disabled={isLoading} />
                {form.formState.errors.subject && (
                  <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => form.setValue("category", value)}
                  defaultValue={form.getValues("category")}
                  disabled={isLoading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} {...form.register("message")} disabled={isLoading} />
              {form.formState.errors.message && (
                <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

