'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { mockProducts, mockLocations } from '@/lib/mock-data'
import { Play } from 'lucide-react'

interface SimulationResult {
  scenario: string
  baselineRevenue: number
  promotionRevenue: number
  demandUplift: number
  stockoutRisk: number
  netImpact: number
}

export default function PromotionSimulator({
  skuId = '',
  locationId = '',
}: {
  skuId?: string
  locationId?: string
}) {
  const [discountPercent, setDiscountPercent] = useState(15)
  const [promotionDays, setPromotionDays] = useState(7)
  const [simulationRun, setSimulationRun] = useState(false)
  const [results, setResults] = useState<SimulationResult[]>([])

  const product = skuId && skuId !== 'all' ? mockProducts.find(p => p.id === skuId) : mockProducts[0]
  const location = locationId ? mockLocations.find(l => l.id === locationId) : mockLocations[0]

  const runSimulation = () => {
    if (!product) return

    // Simulate different discount scenarios
    const baselineDaily = 45 // units per day
    const baselineRevenue = baselineDaily * product.sellingPrice * promotionDays
    const elasticity = 1.5 // Price elasticity of demand

    const demandUplift = discountPercent * elasticity // e.g., 15% discount * 1.5 elasticity = 22.5% uplift
    const promotionDaily = baselineDaily * (1 + demandUplift / 100)
    const promotionPrice = product.sellingPrice * (1 - discountPercent / 100)
    const promotionRevenue = promotionDaily * promotionPrice * promotionDays

    const newResults: SimulationResult[] = [
      {
        scenario: 'Baseline (No Promotion)',
        baselineRevenue,
        promotionRevenue: baselineRevenue,
        demandUplift: 0,
        stockoutRisk: 12,
        netImpact: 0,
      },
      {
        scenario: `${discountPercent}% Discount`,
        baselineRevenue,
        promotionRevenue,
        demandUplift: Math.round(demandUplift),
        stockoutRisk: Math.min(100, 12 + demandUplift * 0.8),
        netImpact: Math.round(promotionRevenue - baselineRevenue),
      },
      {
        scenario: `${discountPercent + 5}% Discount (Aggressive)`,
        baselineRevenue,
        promotionRevenue: baselineDaily * (1 + (discountPercent + 5) * elasticity / 100) * product.sellingPrice * (1 - (discountPercent + 5) / 100) * promotionDays,
        demandUplift: Math.round((discountPercent + 5) * elasticity),
        stockoutRisk: Math.min(100, 12 + (discountPercent + 5) * elasticity * 0.8),
        netImpact: Math.round(baselineDaily * (1 + (discountPercent + 5) * elasticity / 100) * product.sellingPrice * (1 - (discountPercent + 5) / 100) * promotionDays - baselineRevenue),
      },
    ]

    setResults(newResults)
    setSimulationRun(true)
  }

  const chartData = results.map(r => ({
    scenario: r.scenario.split('(')[0].trim(),
    Revenue: Math.round(r.promotionRevenue),
    'Demand Uplift %': r.demandUplift,
  }))

  return (
    <div className="space-y-4">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Simulation Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm">Discount Percentage: {discountPercent}%</Label>
              <Slider
                value={[discountPercent]}
                onValueChange={val => setDiscountPercent(val[0])}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Test different discount levels</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Promotion Duration: {promotionDays} days</Label>
              <Slider
                value={[promotionDays]}
                onValueChange={val => setPromotionDays(val[0])}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">How long to run the promotion</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Product: {product?.name}</Label>
              <p className="text-xs text-muted-foreground">
                Current Price: ${product?.sellingPrice} | Cost: ${product?.unitCost}
              </p>
            </div>

            <Button onClick={runSimulation} className="w-full gap-2">
              <Play size={16} />
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        {simulationRun && results.length > 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Projected Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(() => {
                const recommended = results[1]
                return (
                  <>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Demand Uplift</p>
                      <p className="text-2xl font-bold text-primary">{recommended.demandUplift}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue Impact</p>
                      <p className={`text-2xl font-bold ${recommended.netImpact > 0 ? 'text-primary' : 'text-destructive'}`}>
                        ${recommended.netImpact.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stockout Risk</p>
                      <p className="text-2xl font-bold text-accent">{Math.round(recommended.stockoutRisk)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ⚠️ Demand increase may strain inventory
                      </p>
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Chart */}
      {simulationRun && results.length > 0 && (
        <>
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="scenario" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Revenue" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="Demand Uplift %" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Detailed Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.map((result, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{result.scenario}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Demand: +{result.demandUplift}% | Stockout Risk: {Math.round(result.stockoutRisk)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${Math.round(result.promotionRevenue).toLocaleString()}</p>
                      <Badge
                        variant="outline"
                        className={
                          result.netImpact > 0
                            ? 'bg-primary/10'
                            : result.netImpact < 0
                              ? 'bg-destructive/10'
                              : ''
                        }
                      >
                        {result.netImpact > 0 ? '+' : ''}{Math.round(result.netImpact).toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card className="bg-primary/5 border-primary/30">
            <CardHeader>
              <CardTitle className="text-base">Simulation Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                Based on simulated elasticity metrics, a {discountPercent}% discount would generate approximately{' '}
                <strong>${results[1].netImpact.toLocaleString()}</strong> in additional revenue while increasing demand by{' '}
                <strong>{results[1].demandUplift}%</strong>.
              </p>
              <p className="text-muted-foreground">
                ⚠️ Monitor stockout risk closely. Current safety stock may be insufficient at peak demand levels.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
