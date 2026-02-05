'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  generateRecommendations,
  generateMockHistoricalDemand,
  mockProducts,
  mockLocations,
} from '@/lib/mock-data'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'

export default function RecommendationsPanel({
  skuFilter = '',
  locationFilter = '',
}: {
  skuFilter?: string
  locationFilter?: string
}) {
  const historicalDemand = generateMockHistoricalDemand(30)
  const recommendations = generateRecommendations(mockProducts, mockLocations, []).slice(0, 8)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/10 text-destructive'
      case 'Medium':
        return 'bg-accent/10 text-accent'
      default:
        return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Urgent Reorders</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Optimal Stock</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Auto-Reorder Recommendations</CardTitle>
              <CardDescription>Based on AI forecast and current inventory</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>SKU</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Reorder Qty</TableHead>
                <TableHead>Reorder Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-48">Explanation</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendations.map((rec, idx) => {
                const product = mockProducts.find(p => p.id === rec.skuId)
                const location = mockLocations.find(l => l.id === rec.locationId)

                return (
                  <TableRow key={idx} className="border-border/50">
                    <TableCell className="font-semibold">{product?.sku}</TableCell>
                    <TableCell>{location?.city}</TableCell>
                    <TableCell className="text-right font-semibold">{rec.reorderQuantity}</TableCell>
                    <TableCell className="text-sm">{rec.reorderDate}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-xs">
                      {rec.explanation}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Explanation Card */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            How Are Recommendations Generated?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Recommendation Logic:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>Reorder Quantity:</strong> Calculated as (Lead Time Demand × Days) + Safety Stock
              </li>
              <li>
                <strong>Reorder Date:</strong> Based on forecasted demand and current stock levels
              </li>
              <li>
                <strong>Priority:</strong> High if {'<'}5 days to stockout, Medium if {'<'}10 days, Low otherwise
              </li>
            </ul>
          </div>
          <div className="border-t border-border/50 pt-3">
            <h4 className="font-semibold text-sm mb-1">Key Drivers Considered:</h4>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              <li>• High demand forecast periods</li>
              <li>• Current inventory levels vs. safety stock</li>
              <li>• Imminent stockout risk</li>
              <li>• Recent sales trends and seasonality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
