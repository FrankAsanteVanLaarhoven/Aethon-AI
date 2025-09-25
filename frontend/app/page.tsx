'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Shield, 
  Brain, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  ChevronDown,
  TrendingUp,
  Lock,
  Cpu,
  Network,
  Target,
  Award,
  Rocket,
  Sparkles,
  Eye,
  Layers,
  LogIn,
  UserPlus,
  Settings,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LampDemo } from '@/components/ui/lamp'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { InlineTubelightNav } from '@/components/navigation/inline-tubelight-nav'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "Quantum AI Intelligence",
      description: "Next-generation artificial intelligence powered by quantum computing principles",
      color: "from-blue-500 to-cyan-500",
      stats: "99.7% Accuracy"
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Zero-trust architecture with quantum-encrypted communications",
      color: "from-emerald-500 to-teal-500",
      stats: "256-bit Encryption"
    },
    {
      icon: Globe,
      title: "Global Intelligence Network",
      description: "Real-time monitoring across 195+ countries with instant threat detection",
      color: "from-purple-500 to-pink-500",
      stats: "195+ Countries"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Advanced machine learning models predict trends 6 months ahead",
      color: "from-orange-500 to-red-500",
      stats: "6-Month Forecast"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Access to 10,000+ intelligence analysts and strategic advisors worldwide",
      color: "from-indigo-500 to-blue-500",
      stats: "10K+ Experts"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Sub-second response times with 99.99% uptime guarantee",
      color: "from-yellow-500 to-orange-500",
      stats: "<1s Response"
    }
  ]

  const capabilities = [
    {
      icon: Target,
      title: "Threat Detection",
      description: "Real-time identification of emerging threats and vulnerabilities",
      metric: "2.3M threats detected daily"
    },
    {
      icon: Network,
      title: "Network Analysis",
      description: "Deep analysis of global networks and communication patterns",
      metric: "500TB data processed"
    },
    {
      icon: Eye,
      title: "Surveillance Intelligence",
      description: "Advanced surveillance capabilities with privacy protection",
      metric: "24/7 monitoring"
    },
    {
      icon: Layers,
      title: "Multi-Layer Security",
      description: "Comprehensive security across all system layers",
      metric: "Zero breaches"
    }
  ]

  const stats = [
    { number: "10M+", label: "Data Points Analyzed Daily", icon: TrendingUp },
    { number: "195+", label: "Countries Monitored", icon: Globe },
    { number: "99.99%", label: "Uptime Guarantee", icon: Lock },
    { number: "<1s", label: "Response Time", icon: Zap },
    { number: "10K+", label: "Expert Analysts", icon: Users },
    { number: "256-bit", label: "Encryption Standard", icon: Shield }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Intelligence Officer, Fortune 500",
      company: "Global Tech Corp",
      content: "Aethon AI has revolutionized our intelligence operations. The quantum-enhanced insights are unparalleled in the industry.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Government Intelligence Director",
      company: "National Security Agency",
      content: "The most sophisticated intelligence platform I've ever used. The predictive capabilities have saved us millions in threat prevention.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Director",
      company: "MIT Technology Lab",
      content: "Cutting-edge AI technology with real-world applications. The quantum computing integration is truly groundbreaking.",
      rating: 5,
      avatar: "EW"
    }
  ]

  const useInViewRef = (ref: React.RefObject<HTMLElement>) => {
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    return isInView
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-white via-slate-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-slate-900/95 dark:bg-slate-900/95 bg-white/95 backdrop-blur-md border-b border-slate-700/50 dark:border-slate-700/50 border-slate-200"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border border-emerald-400/20">
                <Shield className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white dark:text-white text-slate-900">
                Strategic AI
              </span>
            </div>
            

            {/* Tubelight Navigation - Only visible on medium screens and up */}
            <div className="hidden md:flex items-center">
              <InlineTubelightNav items={[
                { name: 'Dashboard', url: '/dashboard', icon: BarChart3 },
                { name: 'QEMASI', url: '/qemasi', icon: Brain },
                { name: 'Chess BI', url: '/chess-bi', icon: Target },
                { name: 'Analytics', url: '/analytics', icon: BarChart3 },
                { name: 'Agents', url: '/agents', icon: Users },
                { name: 'Resources', url: '/resources', icon: FileText },
                { name: 'Features', url: '/revolutionary-features', icon: Zap },
                { name: 'Settings', url: '/settings', icon: Settings }
              ]} />
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg">
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 text-emerald-600 border-emerald-500/30 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              World's Most Advanced Intelligence Platform
            </Badge>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 pb-12"
          >
            <GooeyText
              texts={["Aethon AI", "Strategic Intelligence"]}
              morphTime={2.5}
              cooldownTime={1.5}
              className="w-full"
              textClassName="bg-gradient-to-r from-white via-slate-100 to-white dark:from-white dark:via-slate-100 dark:to-white from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent"
            />
          </motion.div>

          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 dark:text-slate-300 text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Strategic Intelligence Platform
            <br />
            <span className="text-lg text-slate-400 dark:text-slate-400 text-slate-500">
              Revolutionary AI-powered intelligence with quantum optimization and real-time collaboration
            </span>
          </motion.p>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={() => {
                // Store that user has seen landing page
                localStorage.setItem('hasSeenLanding', 'true');
                // Navigate to dashboard
                window.location.href = '/dashboard';
              }}
            >
              <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 dark:border-slate-600 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-100 px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Live Stats */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.slice(0, 4).map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-300 dark:text-slate-300 text-slate-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center mt-16"
          >
            <span className="text-slate-400 dark:text-slate-400 text-slate-500 text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-6 w-6 text-slate-400 dark:text-slate-400 text-slate-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white text-slate-900">
              Revolutionary Features
            </h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 text-slate-600 max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design for unparalleled intelligence operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 dark:from-slate-800/50 dark:to-slate-900/50 from-slate-100/50 to-white/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-slate-800/80 dark:bg-slate-800/80 bg-white/80 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/50 border-slate-200/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white dark:text-white text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 dark:text-slate-300 text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="text-sm font-semibold text-emerald-400 dark:text-emerald-400 text-emerald-600">
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-6 bg-slate-800/30 dark:bg-slate-800/30 bg-slate-100/30">
        <div className="container mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white text-slate-900">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 text-slate-600 max-w-3xl mx-auto">
              Comprehensive intelligence solutions for modern security challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-700 dark:to-slate-800 from-slate-200 to-slate-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="h-8 w-8 text-emerald-400 dark:text-emerald-400 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white dark:text-white text-slate-900">
                  {capability.title}
                </h3>
                <p className="text-slate-300 dark:text-slate-300 text-slate-600 mb-4">
                  {capability.description}
                </p>
                <div className="text-sm font-semibold text-emerald-400 dark:text-emerald-400 text-emerald-600">
                  {capability.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white text-slate-900">
              Trusted by Global Leaders
            </h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 text-slate-600 max-w-3xl mx-auto">
              Real-time performance metrics that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 dark:from-emerald-500/20 dark:to-blue-500/20 from-emerald-100/50 to-blue-100/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-emerald-400 dark:text-emerald-400 text-emerald-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-300 dark:text-slate-300 text-slate-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-slate-800/30 dark:bg-slate-800/30 bg-slate-100/30">
        <div className="container mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white text-slate-900">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 text-slate-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust Aethon AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 dark:bg-slate-800/50 bg-white/50 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/50 border-slate-200/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 dark:text-slate-300 text-slate-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white dark:text-white text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-400 dark:text-slate-400 text-slate-500 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-slate-500 dark:text-slate-500 text-slate-400 text-xs">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lamp CTA Section */}
      <section className="py-0">
        <LampDemo />
      </section>


      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700/50 dark:border-slate-700/50 border-slate-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg text-white dark:text-white text-slate-900">
                  Strategic AI
                </span>
              </div>
              <p className="text-slate-300 dark:text-slate-300 text-slate-600 text-sm">
                The world's most advanced intelligence platform for strategic decision-making.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white dark:text-white text-slate-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Dashboard</Link></li>
                <li><Link href="/analytics" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Analytics</Link></li>
                <li><Link href="/intelligence" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Intelligence</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white dark:text-white text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">API Reference</Link></li>
                <li><Link href="/support" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white dark:text-white text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 dark:border-slate-700/50 border-slate-200 mt-8 pt-8 text-center">
            <p className="text-slate-400 dark:text-slate-400 text-slate-500 text-sm">
              © 2025 Aethon AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}