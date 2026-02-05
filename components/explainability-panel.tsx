'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react'

export default function ExplainabilityPanel() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">How Retail Intelligence Works</h2>
        <p className="text-muted-foreground">
          This copilot uses explainable AI to help you make confident inventory decisions. Learn how each recommendation is generated.
        </p>
      </div>

      {/* Core Methodology */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Core Forecasting Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-semibold text-sm mb-1">1. Historical Analysis</h4>
              <p className="text-sm text-muted-foreground">
                We analyze 30+ days of historical sales data to identify patterns, trends, and seasonality. Weekend peaks, promotional impacts, and category trends are all factored in.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-4 py-2">
              <h4 className="font-semibold text-sm mb-1">2. Time-Series Decomposition</h4>
              <p className="text-sm text-muted-foreground">
                Demand is broken into components: baseline demand, trend (direction of change), and seasonality (recurring patterns). Each is modeled separately for accuracy.
              </p>
            </div>

            <div className="border-l-4 border-secondary pl-4 py-2">
              <h4 className="font-semibold text-sm mb-1">3. Safety Stock Calculation</h4>
              <p className="text-sm text-muted-foreground">
                We calculate optimal safety stock levels based on demand variability, service level targets, and lead time. This ensures 95%+ service levels.
              </p>
            </div>

            <div className="border-l-4 border-chart-1 pl-4 py-2">
              <h4 className="font-semibold text-sm mb-1">4. Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Stockout probability is calculated for each day based on forecasted demand vs. projected inventory. Risk levels (Low/Medium/High) guide urgency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Drivers */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            What Drives Our Recommendations?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Demand Signals</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Recent sales velocity</li>
                <li>• Weekly and seasonal patterns</li>
                <li>• Promotional impact history</li>
                <li>• Category trends</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Inventory Health</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Current stock levels</li>
                <li>• Safety stock targets</li>
                <li>• Turnover rates</li>
                <li>• Aging inventory</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Supply Chain</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Lead time assumptions (3 days)</li>
                <li>• Reorder batch sizes</li>
                <li>• Supplier constraints</li>
                <li>• Order cost optimization</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Business Rules</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Target service levels</li>
                <li>• Budget constraints</li>
                <li>• Location-specific policies</li>
                <li>• Risk tolerance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence & Limitations */}
      <Card className="bg-card/50 border-border/50 border-accent/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            Confidence Levels & Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-primary/20">High</Badge>
                <span className="text-sm font-semibold">Days 1-7</span>
              </div>
              <p className="text-xs text-muted-foreground">
                High confidence based on near-term visibility and minimal uncertainty in demand patterns.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-accent/20">Medium</Badge>
                <span className="text-sm font-semibold">Days 8-14</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Moderate confidence; weekly patterns remain predictable but external factors become more uncertain.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-muted/50">Low</Badge>
                <span className="text-sm font-semibold">Days 15+</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Lower confidence; unforeseen events, promotions, or market shifts may occur.
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 pt-4">
            <h4 className="font-semibold text-sm mb-2">Important Limitations:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                ⚠️ <strong>Simulated Data:</strong> These forecasts use synthetic retail data. Accuracy improves with your actual historical data.
              </li>
              <li>
                ⚠️ <strong>Unforeseen Events:</strong> Black swan events (recalls, supplier issues, pandemics) are not predictable.
              </li>
              <li>
                ⚠️ <strong>Promotional Assumptions:</strong> External promotions not in the historical data won't be reflected in forecasts.
              </li>
              <li>
                ⚠️ <strong>Validation Required:</strong> Always validate recommendations with domain expertise and business context.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Example Explanation */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-5 w-5" />
            Example: Premium Cotton T-Shirt (TSH-001)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Current State</h4>
              <p className="text-muted-foreground">
                245 units in stock | Safety stock: 50 units | Average daily demand: 45 units
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Forecast Signal</h4>
              <p className="text-muted-foreground">
                Next 7 days show weekend peaks (68 units) and weekday baseline (40 units). Trend: +1% daily due to upcoming promotion.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Why This Recommendation?</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Current stock covers ~5 days at baseline demand</li>
                <li>Upcoming weekend will accelerate depletion</li>
                <li>3-day lead time means order must go out by Day 2</li>
                <li>Recommend 125 units to cover lead time + 7 days + safety stock</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Risk Assessment</h4>
              <p className="text-muted-foreground">
                87% stockout probability if no reorder. Priority: URGENT (High risk).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust & Validation */}
      <Alert className="bg-background/50 border-border/50">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Why Trust These Recommendations?</strong>
          <p className="text-xs text-muted-foreground mt-1">
            Every recommendation includes transparent logic: the data inputs, formulas used, and assumptions made. No black-box decisions. If a recommendation doesn't make sense in your business context, you can always override it.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
