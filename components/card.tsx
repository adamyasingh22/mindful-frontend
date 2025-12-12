import type React from "react"
interface CardProps {
  children: React.ReactNode
  className?: string
}

export function CustomCard({ children, className = "" }: CardProps) {
  return <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>{children}</div>
}