"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

export function CustomButton({
  children,
  onClick,
  disabled,
  className = "",
  variant = "default",
  size = "md",
}: ButtonProps) {
  const baseStyles = "rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}