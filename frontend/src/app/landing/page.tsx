'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LampDemo } from '@/components/ui/lamp'
import { GooeyText } from '@/components/ui/gooey-text-morphing'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze complex data patterns in real-time",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Quantum-encrypted communications with zero-trust architecture",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide intelligence network spanning 195+ countries and territories",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Live data processing with predictive modeling and trend analysis",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Access to 10,000+ intelligence analysts and strategic advisors",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with 99.99% uptime guarantee",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const stats = [
    { number: "10M+", label: "Data Points Analyzed Daily" },
    { number: "195+", label: "Countries Monitored" },
    { number: "99.99%", label: "Uptime Guarantee" },
    { number: "<1s", label: "Response Time" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Strategic Analyst, Fortune 500",
      content: "Strategic AI Platform has revolutionized our intelligence operations. The insights are unparalleled.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Government Intelligence Director",
      content: "The most sophisticated intelligence platform I've ever used. Game-changing capabilities.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Director, MIT",
      content: "Cutting-edge AI technology with real-world applications. Truly impressive.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-white via-slate-50 to-white">
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
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="#analytics" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">
                Analytics
              </Link>
              <Link href="#testimonials" className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors">
                Testimonials
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
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
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 text-emerald-600 border-emerald-500/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
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
              texts={["Strategic Intelligence", "Redefined"]}
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
            AI-Powered Business Intelligence Platform
            <br />
            <span className="text-lg text-slate-400 dark:text-slate-400 text-slate-500">
              Real-time intelligence, predictive analytics, and strategic insights for the modern world
            </span>
          </motion.p>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 dark:border-slate-600 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-100 px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center"
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
                  <p className="text-slate-300 dark:text-slate-300 text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="analytics" className="py-20 px-6 bg-slate-800/30 dark:bg-slate-800/30 bg-slate-100/30">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-300 dark:text-slate-300 text-slate-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
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
              Join thousands of satisfied users who trust Strategic AI Platform
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
                className="bg-slate-800/50 dark:bg-slate-800/50 bg-white/50 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/50 border-slate-200/50 rounded-2xl p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 dark:text-slate-300 text-slate-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-white dark:text-white text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 dark:text-slate-400 text-slate-500 text-sm">
                    {testimonial.role}
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
              © 2025 Strategic AI Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
