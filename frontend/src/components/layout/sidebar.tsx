'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/sidebar-context'
import { 
  LayoutDashboard,
  Brain,
  Users,
  BarChart3,
  Zap,
  Play,
  Shield,
  Atom,
  Crown,
  ChevronRight,
  Activity,
  Network,
  AlertTriangle,
  Target,
  TrendingUp,
  Globe,
  GraduationCap,
  Building,
  Leaf,
  DollarSign,
  CheckCircle,
  ChevronDown,
  Cpu,
  Database,
  Lock,
  Settings,
  Layers,
  Sparkles,
  Video,
  TestTube
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: 'Intelligence',
    href: '/intelligence',
    icon: Brain,
    current: false,
    badge: 'Live',
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: Users,
    current: false,
    badge: '6 Active',
  },
  {
    name: 'Simulations',
    href: '/simulations',
    icon: Play,
    current: false,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    current: false,
  },
  {
    name: 'Chess BI',
    href: '/chess-bi',
    icon: Target,
    current: false,
    badge: 'Minimax',
  },
  {
    name: 'QEMASI',
    href: '/qemasi',
    icon: Atom,
    current: false,
    badge: 'Quantum',
  },
  {
    name: 'Revolutionary Features',
    href: '/revolutionary-features',
    icon: Zap,
    current: false,
    badge: 'Patent',
  },
  {
    name: 'Collaboration',
    href: '/collaboration',
    icon: Video,
    current: false,
    badge: 'WebRTC',
  },
  {
    name: 'Performance',
    href: '/performance',
    icon: Activity,
    current: false,
    badge: 'Live',
  },
  {
    name: 'Testing',
    href: '/testing',
    icon: TestTube,
    current: false,
    badge: 'QA',
  },
  {
    name: 'Status',
    href: '/status',
    icon: Activity,
    current: false,
    badge: 'Live',
  },
]

// Organized Revolutionary Features by Categories
const revolutionaryFeatureCategories = [
  {
    id: 'ai-algorithms',
    name: 'AI Algorithms',
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    items: [
      {
        name: 'ARPE',
        href: '/arpe',
        icon: Brain,
        badge: 'Patent',
        description: 'Advanced Reasoning & Pattern Engine'
      },
      {
        name: 'QESO',
        href: '/qeso',
        icon: Atom,
        badge: 'Quantum',
        description: 'Quantum-Enhanced Strategic Optimization'
      },
      {
        name: 'ABME',
        href: '/abme',
        icon: Zap,
        badge: 'Auto',
        description: 'Autonomous Business Model Engine'
      }
    ]
  },
  {
    id: 'security-intelligence',
    name: 'Security & Intelligence',
    icon: Shield,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    items: [
      {
        name: 'SNSE',
        href: '/snse',
        icon: Shield,
        badge: 'Sovereign',
        description: 'Sovereign Network Security Engine'
      },
      {
        name: 'SCI',
        href: '/sci',
        icon: Users,
        badge: 'AI vs AI',
        description: 'Strategic Counter-Intelligence'
      },
      {
        name: 'PSCDO',
        href: '/pscdo',
        icon: AlertTriangle,
        badge: 'Oracle',
        description: 'Predictive Security & Crisis Detection Oracle'
      }
    ]
  },
  {
    id: 'network-systems',
    name: 'Network & Systems',
    icon: Network,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    items: [
      {
        name: 'CEIS',
        href: '/ceis',
        icon: Network,
        badge: 'Network',
        description: 'Corporate Enterprise Intelligence System'
      },
      {
        name: 'RCRE',
        href: '/rcre',
        icon: Target,
        badge: 'Real-time',
        description: 'Real-time Competitive Response Engine'
      },
      {
        name: 'DRAD',
        href: '/drad',
        icon: TrendingUp,
        badge: 'Arbitrage',
        description: 'Dynamic Risk & Arbitrage Detection'
      }
    ]
  },
  {
    id: 'global-domains',
    name: 'Global Domains',
    icon: Globe,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    items: [
      {
        name: 'Geopolitical',
        href: '/geopolitical-prophecy',
        icon: Globe,
        badge: 'Global',
        description: 'Geopolitical Prophecy Engine'
      },
      {
        name: 'Military',
        href: '/military-integration',
        icon: Shield,
        badge: 'NATO',
        description: 'Military Integration System'
      },
      {
        name: 'Education',
        href: '/educational-network',
        icon: GraduationCap,
        badge: 'Global',
        description: 'Educational Network Intelligence'
      }
    ]
  },
  {
    id: 'business-sectors',
    name: 'Business Sectors',
    icon: Building,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    items: [
      {
        name: 'Corporate',
        href: '/corporate-transformation',
        icon: Building,
        badge: 'McKinsey+',
        description: 'Corporate Transformation Engine'
      },
      {
        name: 'Resources',
        href: '/resource-optimization',
        icon: Leaf,
        badge: 'Planetary',
        description: 'Resource Optimization System'
      },
      {
        name: 'Economic',
        href: '/economic-policy',
        icon: DollarSign,
        badge: 'Policy',
        description: 'Economic Policy Intelligence'
      },
      {
        name: 'Compliance',
        href: '/compliance-automation',
        icon: CheckCircle,
        badge: 'Universal',
        description: 'Compliance Automation Engine'
      }
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  
  // Fallback state in case context is not available
  const [fallbackCollapsed, setFallbackCollapsed] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['ai-algorithms', 'security-intelligence']))
  
  let isCollapsed = fallbackCollapsed
  let toggleSidebar = () => setFallbackCollapsed(!fallbackCollapsed)
  
  try {
    const sidebarContext = useSidebar()
    isCollapsed = sidebarContext.isCollapsed
    toggleSidebar = sidebarContext.toggleSidebar
  } catch (error) {
    console.warn('Sidebar context not available, using fallback state')
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-[60] w-64 bg-slate-900/95 dark:bg-slate-900/95 bg-white border-r border-slate-700/50 dark:border-slate-700/50 border-slate-200 transition-all duration-300 ease-in-out shadow-2xl sidebar",
        isCollapsed && "-translate-x-full lg:translate-x-0 lg:w-16"
      )}>
        <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border dark:border-slate-700/50 border-slate-200 bg-gradient-to-r from-slate-900/50 to-slate-800/50 dark:from-slate-900/50 dark:to-slate-800/50 from-slate-100 to-slate-200 backdrop-blur-sm">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border border-emerald-400/20">
                <Shield className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-white dark:text-white text-slate-900 tesla-heading">Strategic AI</span>
                <span className="text-xs text-emerald-300 dark:text-emerald-300 text-emerald-600 font-medium">Platform</span>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-accent transition-colors border border-border hover:border-accent-foreground/20"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg border border-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent hover:border-slate-700/50",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white",
                    !isCollapsed && "mr-3"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-slate-200 font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"}
                          className="ml-2 text-xs px-2 py-0.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Revolutionary Features Section */}
          <div className="pt-4">
            {!isCollapsed ? (
              <>
                <div className="flex items-center px-2 py-2 mb-3">
                  <Crown className="mr-2 h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                    Revolutionary Features
                  </span>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-xs border-emerald-500/50 text-emerald-400">
                      {revolutionaryFeatureCategories.reduce((total, category) => total + category.items.length, 0)} Systems
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {revolutionaryFeatureCategories.map((category) => {
                    const isExpanded = expandedCategories.has(category.id)
                    const hasActiveItem = category.items.some(item => pathname === item.href)
                    
                    return (
                      <div key={category.id} className="space-y-1">
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                            "hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50",
                            hasActiveItem && "bg-slate-800/40 border-slate-700/50",
                            category.bgColor
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={cn("p-1.5 rounded-md", category.bgColor, category.borderColor, "border")}>
                              <category.icon className={cn("h-4 w-4", category.color)} />
                            </div>
                            <div className="text-left">
                              <div className={cn("font-semibold", category.color)}>
                                {category.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {category.items.length} systems
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs border-current", category.color)}
                            >
                              {category.items.filter(item => pathname === item.href).length > 0 ? 'Active' : 'Ready'}
                            </Badge>
                            <ChevronDown 
                              className={cn(
                                "h-4 w-4 text-slate-400 transition-transform duration-200",
                                isExpanded && "rotate-180"
                              )} 
                            />
                          </div>
                        </button>
                        
                        {/* Category Items */}
                        <div className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          <div className="ml-4 space-y-1 border-l border-slate-700/50 pl-4">
                            {category.items.map((item) => {
                              const isActive = pathname === item.href
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={cn(
                                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                                    "hover:bg-slate-800/40 border border-transparent hover:border-slate-700/30",
                                    isActive
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-sm"
                                      : "text-slate-400 hover:text-slate-200"
                                  )}
                                >
                                  <div className="flex items-center space-x-3 flex-1">
                                    <item.icon className="h-4 w-4 flex-shrink-0 text-slate-500 group-hover:text-slate-300" />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium">{item.name}</div>
                                      <div className="text-xs text-slate-500 truncate">
                                        {item.description}
                                      </div>
                                    </div>
                                  </div>
                                  {item.badge && (
                                    <Badge 
                                      variant="outline"
                                      className={cn(
                                        "ml-2 text-xs border-current",
                                        isActive ? "border-emerald-500/50 text-emerald-400" : "border-slate-600/50 text-slate-500"
                                      )}
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="space-y-1">
                {revolutionaryFeatureCategories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    <div className="flex justify-center">
                      <div className={cn("p-2 rounded-lg border", category.bgColor, category.borderColor)}>
                        <category.icon className={cn("h-4 w-4", category.color)} />
                      </div>
                    </div>
                    {expandedCategories.has(category.id) && (
                      <div className="space-y-1">
                        {category.items.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={cn(
                                "group flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                              )}
                              title={`${item.name} - ${item.description}`}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-700/50 p-4 bg-slate-800/30">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-emerald-300">
                  <Activity className="h-3 w-3 text-emerald-400" />
                  <span>All Systems Operational</span>
                </div>
                <Badge variant="outline" className="text-xs border-emerald-500/50 text-emerald-400">
                  Production
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-400">
                  <div className="font-medium text-slate-300">Active Features</div>
                  <div className="text-emerald-400">
                    {revolutionaryFeatureCategories.reduce((total, category) => 
                      total + category.items.filter(item => pathname === item.href).length, 0
                    )} / {revolutionaryFeatureCategories.reduce((total, category) => total + category.items.length, 0)}
                  </div>
                </div>
                <div className="text-slate-400">
                  <div className="font-medium text-slate-300">Categories</div>
                  <div className="text-blue-400">
                    {expandedCategories.size} / {revolutionaryFeatureCategories.length}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-500">
                Last updated: {new Date().toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <div className="text-xs text-emerald-400 font-medium">
                {revolutionaryFeatureCategories.reduce((total, category) => 
                  total + category.items.filter(item => pathname === item.href).length, 0
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
