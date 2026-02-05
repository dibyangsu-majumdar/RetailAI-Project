'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  generateMockHistoricalDemand,
  generateMockForecasts,
  mockProducts,
  mockLocations,
} from '@/lib/mock-data'

export default function DemandForecastCard({
  skuId = '',
  locationId = '',
}: {
  skuId?: string
  locationId?: string
}) {
  const historicalDemand = generateMockHistoricalDemand(30)
  const forecasts = generateMockForecasts(historicalDemand)

  // Combine historical and forecast data for chart
  const chartData = [
    ...historicalDemand.map(d => ({
      date: d.date,
      actual: d.quantity,
      forecast: null,
      type: 'historical',
    })),
    ...forecasts.slice(0, 14).map((f, idx) => ({
      date: f.date,
      actual: null,
      forecast: f.forecastedDemand,
      type: 'forecast',
    })),
  ]

  // Combine for continuous line
  const combinedData = historicalDemand.map(d => ({
    date: d.date,
    historical: d.quantity,
    forecast: null,
  }))

  for (const f of forecasts.slice(0, 14)) {
    combinedData.push({
      date: f.date,
      historical: null,
      forecast: f.forecastedDemand,
    })
  }

  const product = skuId && skuId !== 'all' ? mockProducts.find(p => p.id === skuId) : mockProducts[0]
  const location = locationId ? mockLocations.find(l => l.id === locationId) : mockLocations[0]

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Demand Forecast</CardTitle>
              <CardDescription>
                {product?.name} at {location?.name}
              </CardDescription>
            </div>
            <Badge variant="outline">30-day forecast</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={d => d.split('-')[2]}
                />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="historical"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="Historical Demand"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Forecasted Demand"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Details Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Next 7 Days Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Forecasted Demand</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Stockout %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecasts.slice(0, 7).map((f, idx) => (
                <TableRow key={idx} className="border-border/50">
                  <TableCell className="font-medium">{f.date}</TableCell>
                  <TableCell className="text-right font-semibold">{f.forecastedDemand} units</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        f.confidence === 'High'
                          ? 'bg-primary/10'
                          : f.confidence === 'Medium'
                            ? 'bg-accent/10'
                            : 'bg-muted/10'
                      }
                    >
                      {f.confidence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        f.riskLevel === 'High'
                          ? 'bg-destructive/10'
                          : f.riskLevel === 'Medium'
                            ? 'bg-accent/10'
                            : 'bg-primary/10'
                      }
                    >
                      {f.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{f.stockoutProbability}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Explainability Section */}
      <Card className="bg-card/50 border-border/50 border-primary/30">
        <CardHeader>
          <CardTitle className="text-base">Why This Forecast?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Drivers:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Recent sales trend shows stable demand with weekend peaks</li>
              <li>• Seasonal patterns indicate typical Q1 variations</li>
              <li>• Current safety stock level: {product?.safetyStock} units</li>
              <li>• Lead time assumption: 3 days for reorder</li>
            </ul>
          </div>
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs text-muted-foreground italic">
              ⚠️ This is a simulated forecast based on historical trends and synthetic data. Actual predictions should be validated with your historical sales data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
