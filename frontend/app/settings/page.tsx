'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Network,
  Zap,
  Save,
  RotateCcw
} from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    updates: true
  })

  const [privacy, setPrivacy] = useState({
    analytics: true,
    crashReports: true,
    usageData: false,
    marketing: false
  })

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC'
  })

  const [performance, setPerformance] = useState({
    cacheSize: '100',
    refreshRate: '30',
    maxConnections: '50'
  })

  return (
    <div className="min-h-screen bg-black dark:bg-black bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <SettingsIcon className="h-12 w-12 text-white dark:text-white text-black" />
            <h1 className="text-4xl font-bold text-white dark:text-white text-black">
              Settings
            </h1>
          </div>
          <p className="text-xl text-white dark:text-white text-black">
            Configure your Strategic AI Platform experience
          </p>
          <Badge variant="outline" className="bg-white/10 dark:bg-white/10 bg-black/10 border-white dark:border-white border-black text-white dark:text-white text-black">
            Platform Configuration v2.0.0
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
            <TabsTrigger value="profile" className="text-white dark:text-white text-black data-[state=active]:bg-white/10 dark:data-[state=active]:bg-white/10 data-[state=active]:bg-black/10">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-white data-[state=active]:bg-white/10">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-white data-[state=active]:bg-white/10">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-white data-[state=active]:bg-white/10">
              <Zap className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <User className="h-6 w-6" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription className="text-white">
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-white">Organization</Label>
                  <Input 
                    id="organization" 
                    placeholder="Enter your organization" 
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-white text-black hover:bg-white/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/50 text-white">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Bell className="h-6 w-6" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription className="text-white">
                  Choose how you want to be notified about platform updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Email Notifications</Label>
                    <p className="text-sm text-white/70">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Push Notifications</Label>
                    <p className="text-sm text-white/70">Receive browser push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">SMS Notifications</Label>
                    <p className="text-sm text-white/70">Receive critical alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Platform Updates</Label>
                    <p className="text-sm text-white/70">Get notified about new features</p>
                  </div>
                  <Switch 
                    checked={notifications.updates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Shield className="h-6 w-6" />
                  <span>Privacy & Security</span>
                </CardTitle>
                <CardDescription className="text-white">
                  Control your data privacy and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Analytics Data</Label>
                    <p className="text-sm text-white/70">Help improve the platform with usage analytics</p>
                  </div>
                  <Switch 
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, analytics: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Crash Reports</Label>
                    <p className="text-sm text-white/70">Automatically send crash reports for debugging</p>
                  </div>
                  <Switch 
                    checked={privacy.crashReports}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, crashReports: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Usage Data</Label>
                    <p className="text-sm text-white/70">Share anonymous usage data for research</p>
                  </div>
                  <Switch 
                    checked={privacy.usageData}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, usageData: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Marketing Communications</Label>
                    <p className="text-sm text-white/70">Receive marketing emails and updates</p>
                  </div>
                  <Switch 
                    checked={privacy.marketing}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Palette className="h-6 w-6" />
                  <span>Appearance & Localization</span>
                </CardTitle>
                <CardDescription className="text-white">
                  Customize the look and feel of your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-white">Theme</Label>
                    <select 
                      id="theme" 
                      className="w-full p-2 bg-black/50 border border-white/20 text-white rounded-md"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">Language</Label>
                    <select 
                      id="language" 
                      className="w-full p-2 bg-black/50 border border-white/20 text-white rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">Timezone</Label>
                    <select 
                      id="timezone" 
                      className="w-full p-2 bg-black/50 border border-white/20 text-white rounded-md"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Settings */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="h-6 w-6" />
                  <span>Performance & Optimization</span>
                </CardTitle>
                <CardDescription className="text-white">
                  Optimize platform performance for your environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cacheSize" className="text-white">Cache Size (MB)</Label>
                    <Input 
                      id="cacheSize" 
                      type="number" 
                      value={performance.cacheSize}
                      onChange={(e) => setPerformance(prev => ({ ...prev, cacheSize: e.target.value }))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refreshRate" className="text-white">Refresh Rate (seconds)</Label>
                    <Input 
                      id="refreshRate" 
                      type="number" 
                      value={performance.refreshRate}
                      onChange={(e) => setPerformance(prev => ({ ...prev, refreshRate: e.target.value }))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxConnections" className="text-white">Max Connections</Label>
                    <Input 
                      id="maxConnections" 
                      type="number" 
                      value={performance.maxConnections}
                      onChange={(e) => setPerformance(prev => ({ ...prev, maxConnections: e.target.value }))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-white text-black hover:bg-white/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Performance Settings
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/50 text-white">
                    <Database className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
