'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryKPI } from '@/lib/mock-data'
import { TrendingDown, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function KPIOverview({ kpis }: { kpis: InventoryKPI }) {
  const kpiCards = [
    {
      title: 'Stockout Risk',
      value: `${kpis.stockoutRiskPercentage}%`,
      description: 'SKUs at risk',
      icon: AlertTriangle,
      bgColor: 'bg-destructive/5',
      color: 'text-destructive',
      trend: -2.5,
    },
    {
      title: 'Inventory Health',
      value: `${kpis.inventoryHealthScore}/100`,
      description: 'Overall score',
      icon: TrendingUp,
      bgColor: 'bg-primary/5',
      color: 'text-primary',
      trend: 4.2,
    },
    {
      title: 'Forecast Accuracy',
      value: `${kpis.forecastAccuracy}%`,
      description: '30-day average',
      icon: Zap,
      bgColor: 'bg-accent/5',
      color: 'text-accent',
      trend: 1.8,
    },
    {
      title: 'Excess Inventory',
      value: `$${(kpis.excessInventoryValue / 1000).toFixed(1)}K`,
      description: 'Holding cost',
      icon: TrendingDown,
      bgColor: 'bg-secondary/5',
      color: 'text-secondary',
      trend: -8.3,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={index} className={cn('border-border/50 hover:border-border/80 transition-all', kpi.bgColor)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div className={cn('p-2 rounded-lg', kpi.bgColor)}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
              {kpi.trend !== 0 && (
                <span className={cn(
                  'text-xs font-semibold px-2 py-1 rounded-full',
                  kpi.trend > 0 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                )}>
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
