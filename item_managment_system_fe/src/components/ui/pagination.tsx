"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  children: React.ReactNode
  className?: string
}

interface PaginationContentProps {
  children: React.ReactNode
  className?: string
}

interface PaginationItemProps {
  children: React.ReactNode
  className?: string
}

interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

interface PaginationPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface PaginationEllipsisProps {
  className?: string
}

function Pagination({ children, className }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      {children}
    </nav>
  )
}

function PaginationContent({ children, className }: PaginationContentProps) {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)}>
      {children}
    </ul>
  )
}

function PaginationItem({ children, className }: PaginationItemProps) {
  return <li className={cn("", className)}>{children}</li>
}

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground",
        "h-9 w-9",
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label="Go to previous page"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-9 px-2.5",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous</span>
    </button>
  )
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label="Go to next page"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-9 px-2.5",
        className
      )}
      {...props}
    >
      <span className="sr-only">Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  )
)
PaginationNext.displayName = "PaginationNext"

function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
    >
      <span className="sr-only">More pages</span>
      ...
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}