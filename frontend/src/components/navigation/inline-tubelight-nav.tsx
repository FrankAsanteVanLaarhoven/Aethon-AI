"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface InlineTubelightNavProps {
  items: NavItem[]
  className?: string
}

export function InlineTubelightNav({ items, className }: InlineTubelightNavProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.name

        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => setActiveTab(item.name)}
            className={cn(
              "relative cursor-pointer text-xs font-medium px-3 py-1.5 rounded-full transition-colors",
              "text-white/80 dark:text-white/80 text-black/80 hover:text-white dark:hover:text-white hover:text-black",
              isActive && "bg-white/10 dark:bg-white/10 bg-black/10 text-white dark:text-white text-black",
            )}
          >
            <span className="hidden lg:inline">{item.name}</span>
            <span className="lg:hidden">
              <Icon size={14} strokeWidth={2.5} />
            </span>
            {isActive && (
              <motion.div
                layoutId="inline-lamp"
                className="absolute inset-0 w-full bg-white/5 dark:bg-white/5 bg-black/5 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white dark:bg-white bg-black rounded-t-full">
                  <div className="absolute w-8 h-3 bg-white/20 dark:bg-white/20 bg-black/20 rounded-full blur-sm -top-1 -left-1" />
                  <div className="absolute w-6 h-3 bg-white/20 dark:bg-white/20 bg-black/20 rounded-full blur-sm -top-0.5" />
                  <div className="absolute w-3 h-3 bg-white/20 dark:bg-white/20 bg-black/20 rounded-full blur-xs top-0 left-1.5" />
                </div>
              </motion.div>
            )}
          </Link>
        )
      })}
    </div>
  )
}
