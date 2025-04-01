"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { createCampaign } from "@/lib/campaigns"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  scheduledDate: z.date({
    required_error: "Please select a date",
  }),
  platform: z.enum(["linkedin", "instagram", "twitter", "facebook"], {
    required_error: "Please select a platform",
  }),
})

interface CreateCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCampaignModal({ open, onOpenChange }: CreateCampaignModalProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // Convert to the format expected by createCampaign
      const campaignData = {
        ...values,
        platforms: [values.platform],
      }

      const campaign = await createCampaign(campaignData)

      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      })

      onOpenChange(false)
      form.reset()
      router.push(`/dashboard/campaigns/${campaign.id}`)
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create campaign. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>Create a new campaign to schedule posts across multiple platforms.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Sale Campaign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your campaign and its goals..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Schedule Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Platforms</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="linkedin" id="linkedin" />
                          </FormControl>
                          <FormLabel htmlFor="linkedin" className="font-normal flex items-center cursor-pointer">
                            <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
                            LinkedIn
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="instagram" id="instagram" />
                          </FormControl>
                          <FormLabel htmlFor="instagram" className="font-normal flex items-center cursor-pointer">
                            <Instagram className="mr-2 h-4 w-4 text-[#E1306C]" />
                            Instagram
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="twitter" id="twitter" />
                          </FormControl>
                          <FormLabel htmlFor="twitter" className="font-normal flex items-center cursor-pointer">
                            <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
                            Twitter/X
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="facebook" id="facebook" />
                          </FormControl>
                          <FormLabel htmlFor="facebook" className="font-normal flex items-center cursor-pointer">
                            <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                            Facebook
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Campaign"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

