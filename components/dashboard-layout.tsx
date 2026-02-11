'use client'

import React, { useState } from "react"
import { Button } from '@/components/ui/button'
import { MessageSquare, Menu, X, LogOut, Settings, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/supabase-auth-provider'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItem {
  icon: React.ReactNode
  label: string
  description: string
  href: string
}

export default function DashboardLayout({
  children,
  onChatToggle,
  showChat,
}: {
  children: React.ReactNode
  onChatToggle: () => void
  showChat: boolean
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout, user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
    router.push('/auth')
  }

  const navItems: NavItem[] = [
    {
      icon: '📊',
      label: 'Dashboard',
      description: 'View KPIs and inventory overview',
      href: '/dashboard',
    },
    {
      icon: '📥',
      label: 'Data Sources',
      description: 'Connect or upload inventory data',
      href: '/dashboard/data-sources',
    },
    {
      icon: '💳',
      label: 'Pricing',
      description: 'View subscription plans',
      href: '/dashboard/pricing',
    },
    {
      icon: '⚙️',
      label: 'Settings',
      description: 'Manage account and integrations',
      href: '/dashboard/settings',
    },
  ]

  const isActive = (href: string) => {
    if (href.includes('#')) {
      return pathname === href.split('#')[0]
    }
    return pathname === href
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden',
          sidebarOpen ? 'w-72' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <Link href="/dashboard" className={cn('flex-1 flex items-center gap-2', !sidebarOpen && 'justify-center')}>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold">RetailAI</h2>
                <p className="text-xs text-sidebar-foreground/60">Copilot</p>
              </div>
            )}
            {!sidebarOpen && <span className="text-xl">🤖</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const active = isActive(item.href)
            return (
              <Link key={index} href={item.href}>
                <button
                  className={cn(
                    'w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-all',
                    active
                      ? 'bg-sidebar-accent/20 text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-primary/20 text-sidebar-foreground'
                  )}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <div className="flex-1 text-left">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-sidebar-foreground/60">{item.description}</p>
                    </div>
                  )}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-sidebar-border" />

        {/* User Info */}
        {sidebarOpen && user && (
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-sidebar-foreground/60">Logged in as</p>
              <p className="text-sm font-medium truncate">{user.full_name || user.email}</p>
              {user.full_name && (
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut size={16} />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Retail Intelligence Copilot</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Powered by AI forecasting</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={onChatToggle}
                variant={showChat ? 'default' : 'outline'}
                size="sm"
                className="flex gap-2"
              >
                <MessageSquare size={16} />
                {showChat ? 'Hide Chat' : 'AI Copilot'}
              </Button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
