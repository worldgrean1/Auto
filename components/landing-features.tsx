import { Calendar, BarChart4, Share2, Zap } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: Calendar,
      title: "Scheduled Posting",
      description: "Plan and schedule your content across multiple platforms in advance.",
    },
    {
      icon: Share2,
      title: "Multi-Platform Support",
      description: "Publish to LinkedIn, Instagram, Twitter/X, and Facebook from one dashboard.",
    },
    {
      icon: BarChart4,
      title: "Advanced Analytics",
      description: "Track performance metrics and gain insights to optimize your strategy.",
    },
    {
      icon: Zap,
      title: "Content Library",
      description: "Organize your media assets and templates for quick access.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Key Features</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

