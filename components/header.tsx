"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, BookOpen, BarChart3, Home } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mood-tracker", label: "Mood Tracker", icon: Heart },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Heart className="w-6 h-6" />
            <span>MindfulHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-4">
            {links.slice(1).map(({ href, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}