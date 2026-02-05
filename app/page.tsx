'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingDown, AlertTriangle, TrendingUp, Eye } from 'lucide-react'
import { mockLocations, mockProducts, calculateInventoryKPIs } from '@/lib/mock-data'
import DashboardLayout from '@/components/dashboard-layout'
import KPIOverview from '@/components/kpi-overview'
import DemandForecastCard from '@/components/demand-forecast-card'
import RecommendationsPanel from '@/components/recommendations-panel'
import PromotionSimulator from '@/components/promotion-simulator'
import ChatCopilot from '@/components/chat-copilot'

export default function Home() {
  const [selectedSku, setSelectedSku] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(mockLocations[0]?.id || '')
  const [dateRange, setDateRange] = useState('7d')
  const [showChat, setShowChat] = useState(false)

  const kpis = calculateInventoryKPIs()

  return (
    <DashboardLayout onChatToggle={() => setShowChat(!showChat)} showChat={showChat}>
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Inventory Intelligence Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                AI-powered demand forecasting and inventory optimization
              </p>
            </div>
          </div>

          {/* KPI Overview */}
          <KPIOverview kpis={kpis} />

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="w-48">
              <Select value={selectedSku} onValueChange={setSelectedSku}>
                <SelectTrigger>
                  <SelectValue placeholder="Select SKU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All SKUs</SelectItem>
                  {mockProducts.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.sku} - {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {mockLocations.map(loc => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name} - {loc.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="14d">Last 14 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="forecast" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="forecast">Forecasts</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
            </TabsList>

            {/* Forecasts Tab */}
            <TabsContent value="forecast" className="space-y-4">
              <DemandForecastCard skuId={selectedSku} locationId={selectedLocation} />
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-4">
              <RecommendationsPanel skuFilter={selectedSku} locationFilter={selectedLocation} />
            </TabsContent>

            {/* Simulation Tab */}
            <TabsContent value="simulation" className="space-y-4">
              <PromotionSimulator skuId={selectedSku} locationId={selectedLocation} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Chat Copilot Sidebar */}
      {showChat && <ChatCopilot />}
    </DashboardLayout>
  )
}

