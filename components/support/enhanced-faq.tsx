"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Search, ThumbsUp, ThumbsDown, Mail } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful?: {
    yes: number
    no: number
  }
}

interface FAQCategory {
  id: string
  name: string
}

const faqCategories: FAQCategory[] = [
  { id: "all", name: "All Questions" },
  { id: "account", name: "Account & Billing" },
  { id: "campaigns", name: "Campaigns & Scheduling" },
  { id: "integrations", name: "Integrations" },
  { id: "analytics", name: "Analytics & Reports" },
  { id: "team", name: "Team Management" },
]

const faqItems: FAQItem[] = [
  {
    id: "faq_1",
    question: "How do I schedule a post?",
    answer:
      "To schedule a post, go to the Campaigns section and click on 'Create Campaign'. Fill in the details of your post, select the platforms you want to publish to, and choose a date and time for publishing. Once you're done, click 'Schedule' and your post will be published automatically at the specified time.",
    category: "campaigns",
    helpful: { yes: 124, no: 8 },
  },
  {
    id: "faq_2",
    question: "Which social media platforms are supported?",
    answer:
      "We currently support Facebook, Instagram, Twitter/X, and LinkedIn. We're constantly working on adding more platforms to our service.",
    category: "integrations",
    helpful: { yes: 98, no: 5 },
  },
  {
    id: "faq_3",
    question: "Can I edit a scheduled post?",
    answer:
      "Yes, you can edit a scheduled post at any time before it's published. Simply go to the Campaigns section, find the post you want to edit, and click on the Edit button. Make your changes and save them.",
    category: "campaigns",
    helpful: { yes: 105, no: 3 },
  },
  {
    id: "faq_4",
    question: "How do I connect my social media accounts?",
    answer:
      "Go to the Integrations section in the dashboard. Click on the platform you want to connect and follow the authentication process. You'll need to grant our application permission to post on your behalf.",
    category: "integrations",
    helpful: { yes: 87, no: 6 },
  },
  {
    id: "faq_5",
    question: "What types of media can I upload?",
    answer:
      "You can upload images (JPG, PNG, GIF), videos (MP4, MOV), and audio files (MP3, WAV) to include in your posts. There are size limits depending on the platform you're posting to.",
    category: "campaigns",
    helpful: { yes: 76, no: 4 },
  },
  {
    id: "faq_6",
    question: "How do I view analytics for my posts?",
    answer:
      "Go to the Analytics section in the dashboard. You can view engagement metrics, reach, impressions, and conversion data for all your posts. You can filter by date range, platform, or campaign.",
    category: "analytics",
    helpful: { yes: 112, no: 7 },
  },
  {
    id: "faq_7",
    question: "Can I schedule the same post for multiple platforms?",
    answer:
      "Yes, when creating a campaign, you can select multiple platforms to publish your post to. You can also customize the content for each platform if needed.",
    category: "campaigns",
    helpful: { yes: 94, no: 2 },
  },
  {
    id: "faq_8",
    question: "What happens if there's an error when posting?",
    answer:
      "If there's an error when posting, you'll receive a notification with details about what went wrong. You can then fix the issue and reschedule the post.",
    category: "campaigns",
    helpful: { yes: 67, no: 5 },
  },
  {
    id: "faq_9",
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from the Settings > Billing section. Your subscription will remain active until the end of the current billing period.",
    category: "account",
    helpful: { yes: 83, no: 4 },
  },
  {
    id: "faq_10",
    question: "How do I invite team members?",
    answer:
      "To invite team members, go to the Team section and click on 'Add Team Member'. Enter their email address, assign a role, and click 'Send Invitation'. They'll receive an email with instructions to join your team.",
    category: "team",
    helpful: { yes: 91, no: 3 },
  },
  {
    id: "faq_11",
    question: "What roles can I assign to team members?",
    answer:
      "There are three roles available: Admin (full access to all settings), Editor (can create and edit content), and Viewer (can only view content and analytics).",
    category: "team",
    helpful: { yes: 74, no: 2 },
  },
  {
    id: "faq_12",
    question: "Is there a limit to how many posts I can schedule?",
    answer:
      "The number of posts you can schedule depends on your subscription plan. The Basic plan allows for 10 scheduled posts per month, while the Pro and Enterprise plans offer unlimited scheduled posts.",
    category: "account",
    helpful: { yes: 103, no: 6 },
  },
]

export function EnhancedFAQ() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [helpfulResponses, setHelpfulResponses] = useState<Record<string, boolean | null>>({})

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleHelpfulResponse = (faqId: string, isHelpful: boolean | null) => {
    setHelpfulResponses((prev) => ({
      ...prev,
      [faqId]: isHelpful,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to commonly asked questions about our platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <RadioGroup
              defaultValue="all"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="flex flex-wrap gap-2"
            >
              {faqCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.id} id={`category-${category.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="rounded-md border px-3 py-1.5 text-sm font-medium peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* FAQ items */}
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground mt-1">Try a different search term or category</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b last:border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center text-left">
                      <span>{faq.question}</span>
                      <Badge variant="outline" className="ml-2 hidden sm:inline-flex">
                        {faqCategories.find((cat) => cat.id === faq.category)?.name || faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          Was this helpful?
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant={helpfulResponses[faq.id] === true ? "secondary" : "outline"}
                              size="sm"
                              onClick={() =>
                                handleHelpfulResponse(faq.id, helpfulResponses[faq.id] === true ? null : true)
                              }
                            >
                              <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                              Yes {faq.helpful?.yes && `(${faq.helpful.yes})`}
                            </Button>
                            <Button
                              variant={helpfulResponses[faq.id] === false ? "secondary" : "outline"}
                              size="sm"
                              onClick={() =>
                                handleHelpfulResponse(faq.id, helpfulResponses[faq.id] === false ? null : false)
                              }
                            >
                              <ThumbsDown className="mr-1 h-3.5 w-3.5" />
                              No {faq.helpful?.no && `(${faq.helpful.no})`}
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <Button variant="link" size="sm" className="h-auto p-0">
                            <Mail className="mr-1 h-3.5 w-3.5" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Can't find what you're looking for?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <p className="text-muted-foreground mb-4">
              If you couldn't find the answer to your question, you can browse our documentation or contact our support
              team.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Browse Documentation</Button>
              <Button>Contact Support</Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Mail className="h-24 w-24 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

