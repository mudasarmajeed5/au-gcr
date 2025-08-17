"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, LogOut, Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

// ✅ import the shadcn theme switcher

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>AU <span className="text-primary">GCR</span></span>
        </Link>

        {/* Center: Search */}
        <div className="flex-1 max-w-lg mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search classes, assignments..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session?.user?.image ?? ""} alt="Profile" />
                  <AvatarFallback>
                    {session?.user?.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>
                {session?.user?.name ?? "Guest"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
