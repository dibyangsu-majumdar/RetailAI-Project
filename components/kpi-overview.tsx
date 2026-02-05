'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryKPI } from '@/lib/mock-data'
import { TrendingDown, AlertTriangle, TrendingUp, Zap } from 'lucide-react'

export default function KPIOverview({ kpis }: { kpis: InventoryKPI }) {
  const kpiCards = [
    {
      title: 'Stockout Risk',
      value: `${kpis.stockoutRiskPercentage}%`,
      description: 'SKUs at risk',
      icon: AlertTriangle,
      color: 'text-destructive',
      trend: -2.5,
    },
    {
      title: 'Inventory Health',
      value: `${kpis.inventoryHealthScore}/100`,
      description: 'Overall score',
      icon: TrendingUp,
      color: 'text-primary',
      trend: 4.2,
    },
    {
      title: 'Forecast Accuracy',
      value: `${kpis.forecastAccuracy}%`,
      description: '30-day average',
      icon: Zap,
      color: 'text-accent',
      trend: 1.8,
    },
    {
      title: 'Excess Inventory',
      value: `$${(kpis.excessInventoryValue / 1000).toFixed(1)}K`,
      description: 'Holding cost',
      icon: TrendingDown,
      color: 'text-secondary',
      trend: -8.3,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={index} className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center gap-1 mt-2">
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
              {kpi.trend !== 0 && (
                <span className={`text-xs font-semibold ${kpi.trend > 0 ? 'text-destructive' : 'text-primary'}`}>
                  {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
