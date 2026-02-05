'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-lg font-bold">RetailAI</h2>
              <p className="text-xs text-sidebar-foreground/60">Intelligence</p>
            </div>
          )}
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
        <nav className="flex-1 p-4 space-y-2">
          <NavLink icon="📊" label="Dashboard" open={sidebarOpen} active />
          <NavLink icon="📈" label="Forecasts" open={sidebarOpen} />
          <NavLink icon="✅" label="Recommendations" open={sidebarOpen} />
          <NavLink icon="🎯" label="Simulations" open={sidebarOpen} />
          <NavLink icon="⚙️" label="Settings" open={sidebarOpen} />
        </nav>

        {/* Footer Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
            <p>Simulated forecasts based on historical trends</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Retail Intelligence Copilot</h1>
            </div>
            <Button
              onClick={onChatToggle}
              variant={showChat ? 'default' : 'outline'}
              size="sm"
              className="flex gap-2"
            >
              <MessageSquare size={16} />
              {showChat ? 'Hide Chat' : 'AI Copilot'}
            </Button>
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

function NavLink({
  icon,
  label,
  open,
  active = false,
}: {
  icon: string
  label: string
  open: boolean
  active?: boolean
}) {
  return (
    <button
      className={cn(
        'w-full px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition-colors',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-primary/20'
      )}
    >
      <span className="text-lg">{icon}</span>
      {open && <span className="flex-1 text-left">{label}</span>}
    </button>
  )
}
