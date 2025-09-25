"use client"

import React from "react"
import { 
  Brain, 
  Target, 
  BarChart3, 
  Users, 
  FileText,
  BookOpen,
  Settings,
  Zap,
  Video
} from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function TubelightNavigation() {
  const navItems = [
    { name: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { name: 'QEMASI', url: '/qemasi', icon: Brain },
    { name: 'Chess BI', url: '/chess-bi', icon: Target },
    { name: 'Analytics', url: '/analytics', icon: BarChart3 },
    { name: 'Agents', url: '/agents', icon: Users },
    { name: 'Collaboration', url: '/collaboration', icon: Video },
    { name: 'Resources', url: '/resources', icon: BookOpen },
    { name: 'Features', url: '/revolutionary-features', icon: Zap },
    { name: 'Settings', url: '/settings', icon: Settings }
  ]

  return <NavBar items={navItems} />
}
