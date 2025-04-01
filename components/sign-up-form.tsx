"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { signUp } from "@/lib/auth"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof formSchema>

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const result = signUp(values)

      if (result.success) {
        toast({
          title: "Account created",
          description: "You can now sign in with your credentials",
        })
        router.push("/sign-in")
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...form.register("name")} disabled={isLoading} className="mt-1" />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} disabled={isLoading} className="mt-1" />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...form.register("password")} disabled={isLoading} className="mt-1" />
        {form.formState.errors.password && (
          <p className="mt-1 text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  )
}

