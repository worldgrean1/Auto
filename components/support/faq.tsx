import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Faq() {
  const faqItems = [
    {
      question: "How do I schedule a post?",
      answer:
        "To schedule a post, go to the Campaigns section and click on 'Create Campaign'. Fill in the details of your post, select the platforms you want to publish to, and choose a date and time for publishing. Once you're done, click 'Schedule' and your post will be published automatically at the specified time.",
    },
    {
      question: "Which social media platforms are supported?",
      answer:
        "We currently support Facebook, Instagram, Twitter/X, and LinkedIn. We're constantly working on adding more platforms to our service.",
    },
    {
      question: "Can I edit a scheduled post?",
      answer:
        "Yes, you can edit a scheduled post at any time before it's published. Simply go to the Campaigns section, find the post you want to edit, and click on the Edit button. Make your changes and save them.",
    },
    {
      question: "How do I connect my social media accounts?",
      answer:
        "Go to the Integrations section in the dashboard. Click on the platform you want to connect and follow the authentication process. You'll need to grant our application permission to post on your behalf.",
    },
    {
      question: "What types of media can I upload?",
      answer:
        "You can upload images (JPG, PNG, GIF), videos (MP4, MOV), and audio files (MP3, WAV) to include in your posts. There are size limits depending on the platform you're posting to.",
    },
    {
      question: "How do I view analytics for my posts?",
      answer:
        "Go to the Analytics section in the dashboard. You can view engagement metrics, reach, impressions, and conversion data for all your posts. You can filter by date range, platform, or campaign.",
    },
    {
      question: "Can I schedule the same post for multiple platforms?",
      answer:
        "Yes, when creating a campaign, you can select multiple platforms to publish your post to. You can also customize the content for each platform if needed.",
    },
    {
      question: "What happens if there's an error when posting?",
      answer:
        "If there's an error when posting, you'll receive a notification with details about what went wrong. You can then fix the issue and reschedule the post.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from the Settings > Billing section. Your subscription will remain active until the end of the current billing period.",
    },
    {
      question: "Is there a limit to how many posts I can schedule?",
      answer:
        "The number of posts you can schedule depends on your subscription plan. The Basic plan allows for 10 scheduled posts per month, while the Pro and Enterprise plans offer unlimited scheduled posts.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find answers to common questions about using our platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

