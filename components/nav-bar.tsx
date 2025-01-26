"use client"

import { useState } from "react"
import { Zap, Moon, Sun, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/contexts/theme-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const NavItems = () => (
    <>
      <Link href="/about">
        <Button variant="ghost">About us</Button>
      </Link>

      <Link href="/learn-more">
        <Button variant="ghost">Learn More</Button>
      </Link>

      <Link href="/privacy-policy">
        <Button variant="ghost">Privacy Policy</Button>
      </Link>
    </>
  )

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <Zap className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-semibold">Assessment</span>
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">PRO</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavItems />
        </div>

        <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

