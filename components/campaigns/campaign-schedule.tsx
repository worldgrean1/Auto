"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CampaignScheduleProps {
  scheduledDate: Date | null
  platforms: string[]
  onScheduleChange: (date: Date | null) => void
  onNext: () => void
}

export function CampaignSchedule({ scheduledDate, platforms, onScheduleChange, onNext }: CampaignScheduleProps) {
  const [selectedHour, setSelectedHour] = useState("12")
  const [selectedMinute, setSelectedMinute] = useState("00")
  const [selectedAmPm, setSelectedAmPm] = useState("PM")
  const [optimizeTime, setOptimizeTime] = useState(true)

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    // Create a new date with the selected time
    const newDate = new Date(date)
    const hour = Number.parseInt(selectedHour)
    const minute = Number.parseInt(selectedMinute)

    newDate.setHours(
      selectedAmPm === "PM" && hour !== 12 ? hour + 12 : selectedAmPm === "AM" && hour === 12 ? 0 : hour,
      minute,
    )

    onScheduleChange(newDate)
  }

  const handleTimeChange = () => {
    if (!scheduledDate) return

    const newDate = new Date(scheduledDate)
    const hour = Number.parseInt(selectedHour)
    const minute = Number.parseInt(selectedMinute)

    newDate.setHours(
      selectedAmPm === "PM" && hour !== 12 ? hour + 12 : selectedAmPm === "AM" && hour === 12 ? 0 : hour,
      minute,
    )

    onScheduleChange(newDate)
  }

  // Set initial time values when scheduledDate changes
  useState(() => {
    if (scheduledDate) {
      const hours = scheduledDate.getHours()
      const minutes = scheduledDate.getMinutes()

      setSelectedHour(String(hours % 12 || 12).padStart(2, "0"))
      setSelectedMinute(String(minutes).padStart(2, "0"))
      setSelectedAmPm(hours >= 12 ? "PM" : "AM")
    }
  })

  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-[#0A66C2]" />
      case "twitter":
        return <Twitter className="h-5 w-5 text-[#1DA1F2]" />
      case "instagram":
        return <Instagram className="h-5 w-5 text-[#E1306C]" />
      case "facebook":
        return <Facebook className="h-5 w-5 text-[#1877F2]" />
      default:
        return null
    }
  }

  const getPlatformName = (platformId: string) => {
    switch (platformId) {
      case "linkedin":
        return "LinkedIn"
      case "twitter":
        return "Twitter"
      case "instagram":
        return "Instagram"
      case "facebook":
        return "Facebook"
      default:
        return platformId
    }
  }

  const getBestTimeForPlatform = (platformId: string) => {
    switch (platformId) {
      case "linkedin":
        return "1:00 PM - 3:00 PM"
      case "twitter":
        return "9:00 AM - 11:00 AM"
      case "instagram":
        return "5:00 PM - 7:00 PM"
      case "facebook":
        return "8:00 AM - 10:00 AM"
      default:
        return "12:00 PM"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Your Campaign</CardTitle>
          <CardDescription>Choose when to publish your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Publication Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate || undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Publication Time</Label>
              <div className="flex gap-2">
                <Select
                  value={selectedHour}
                  onValueChange={(value) => {
                    setSelectedHour(value)
                    handleTimeChange()
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="flex items-center">:</span>

                <Select
                  value={selectedMinute}
                  onValueChange={(value) => {
                    setSelectedMinute(value)
                    handleTimeChange()
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedAmPm}
                  onValueChange={(value) => {
                    setSelectedAmPm(value)
                    handleTimeChange()
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch id="optimize-time" checked={optimizeTime} onCheckedChange={setOptimizeTime} />
            <Label htmlFor="optimize-time">Optimize posting time for best engagement</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform-Specific Scheduling</CardTitle>
          <CardDescription>Customize scheduling for each platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.length === 0 ? (
              <p className="text-muted-foreground">No platforms selected. Go back to settings to select platforms.</p>
            ) : (
              platforms.map((platform) => (
                <div key={platform} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(platform)}
                    <div>
                      <p className="font-medium">{getPlatformName(platform)}</p>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Best time: {getBestTimeForPlatform(platform)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id={`use-${platform}`} defaultChecked={true} />
                    <Label htmlFor={`use-${platform}`} className="text-sm">
                      Use global schedule
                    </Label>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onNext} className="ml-auto">
            Next: Preview
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

