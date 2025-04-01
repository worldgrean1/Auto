import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/lib/types"

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "image" | "name">
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ user, size = "md", className, ...props }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  }

  return (
    <Avatar className={sizeClasses[size]} {...props}>
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name || "User avatar"} />
      ) : (
        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
      )}
    </Avatar>
  )
}

