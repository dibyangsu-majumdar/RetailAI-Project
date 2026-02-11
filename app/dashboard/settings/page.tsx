'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@/lib/supabase-auth-provider'
import DashboardLayout from '@/components/dashboard-layout'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notification_email: true,
    notification_sms: false,
  })

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.full_name || '',
        email: user.email || '',
      }))
    }
  }, [user])

  const handleSave = () => {
    console.log('Settings saved:', formData)
  }

  return (
    <DashboardLayout onChatToggle={() => {}} showChat={false}>
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6 max-w-4xl">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notification_email}
                  onChange={(e) =>
                    setFormData({ ...formData, notification_email: e.target.checked })
                  }
                  className="w-4 h-4 rounded border border-input"
                />
                <div>
                  <p className="font-medium text-sm">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive important updates and alerts via email
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notification_sms}
                  onChange={(e) =>
                    setFormData({ ...formData, notification_sms: e.target.checked })
                  }
                  className="w-4 h-4 rounded border border-input"
                />
                <div>
                  <p className="font-medium text-sm">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive critical alerts via SMS (opt-in)
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
                <p className="text-lg font-bold">Professional Plan</p>
                <p className="text-sm text-muted-foreground mt-1">
                  $299/month - Renews on January 15, 2026
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline" className="text-destructive">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API access credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm break-all">
                sk_live_51234567890abcdefghijklmnop...
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Regenerate Key
                </Button>
                <Button variant="outline" size="sm">
                  Copy Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Delete your account permanently. This action cannot be undone.
              </p>
              <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/5">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
