"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Download } from "lucide-react"

export function BillingSettings() {
  const [currentPlan, setCurrentPlan] = useState("pro")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan.</CardDescription>
            </div>
            <Badge className="bg-primary">Pro</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$29/month</p>
              </div>
              <Badge variant="outline" className="text-green-500 bg-green-50">
                Active
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Unlimited scheduled posts</p>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Advanced analytics</p>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">All social media platforms</p>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Priority support</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Your next billing date is <strong>July 1, 2023</strong>
            </p>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <Button variant="outline">Cancel Subscription</Button>
          <Button>Change Plan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment method and billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                </div>
              </div>
              <Badge variant="outline">Default</Badge>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Compare plans and choose the one that fits your needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For individuals and small teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $9<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>10 scheduled posts per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>2 social media platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled={currentPlan === "basic"}>
                  {currentPlan === "basic" ? "Current Plan" : "Downgrade"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited scheduled posts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>All social media platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={currentPlan === "pro"}>
                  {currentPlan === "pro" ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>24/7 phone support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled={currentPlan === "enterprise"}>
                  {currentPlan === "enterprise" ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

