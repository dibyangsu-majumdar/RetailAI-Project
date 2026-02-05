// Mock retail data - Simulated based on historical trends
export interface Product {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  safetyStock: number
  unitCost: number
  sellingPrice: number
}

export interface Location {
  id: string
  name: string
  city: string
  region: string
  storeType: string
}

export interface DailyDemand {
  date: string
  quantity: number
  dayOfWeek: number
}

export interface Forecast {
  date: string
  forecastedDemand: number
  confidence: 'High' | 'Medium' | 'Low'
  riskLevel: 'Low' | 'Medium' | 'High'
  stockoutProbability: number
}

export interface Recommendation {
  id: string
  skuId: string
  locationId: string
  reorderQuantity: number
  reorderDate: string
  priority: 'High' | 'Medium' | 'Low'
  explanation: string
  drivers: string[]
}

// Sample products
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Cotton T-Shirt',
    sku: 'TSH-001',
    category: 'Apparel',
    currentStock: 245,
    safetyStock: 50,
    unitCost: 4.5,
    sellingPrice: 12.99,
  },
  {
    id: 'prod-002',
    name: 'Denim Jeans',
    sku: 'DEN-001',
    category: 'Apparel',
    currentStock: 89,
    safetyStock: 30,
    unitCost: 12.0,
    sellingPrice: 39.99,
  },
  {
    id: 'prod-003',
    name: 'Running Shoes',
    sku: 'RUN-001',
    category: 'Footwear',
    currentStock: 156,
    safetyStock: 40,
    unitCost: 25.0,
    sellingPrice: 79.99,
  },
  {
    id: 'prod-004',
    name: 'Winter Jacket',
    sku: 'JAC-001',
    category: 'Outerwear',
    currentStock: 42,
    safetyStock: 20,
    unitCost: 28.0,
    sellingPrice: 89.99,
  },
  {
    id: 'prod-005',
    name: 'Casual Sneakers',
    sku: 'SNK-001',
    category: 'Footwear',
    currentStock: 312,
    safetyStock: 60,
    unitCost: 18.0,
    sellingPrice: 59.99,
  },
]

// Sample locations
export const mockLocations: Location[] = [
  { id: 'loc-001', name: 'Downtown Store', city: 'New York', region: 'Northeast', storeType: 'Flagship' },
  { id: 'loc-002', name: 'Mall Location', city: 'Los Angeles', region: 'West', storeType: 'Mall' },
  { id: 'loc-003', name: 'Suburban Store', city: 'Chicago', region: 'Midwest', storeType: 'Suburban' },
  { id: 'loc-004', name: 'Express Store', city: 'Miami', region: 'South', storeType: 'Express' },
  { id: 'loc-005', name: 'Premium Boutique', city: 'San Francisco', region: 'West', storeType: 'Boutique' },
]

// Generate mock historical demand for a SKU-Location combination
export const generateMockHistoricalDemand = (days: number = 30): DailyDemand[] => {
  const data: DailyDemand[] = []
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dayOfWeek = date.getDay()

    // Simulate demand with weekday/weekend patterns
    const baselineDemand = 45
    const weekendBoost = [0, 6].includes(dayOfWeek) ? 1.3 : 0.9
    const randomVariance = Math.random() * 20 - 10
    const quantity = Math.max(
      10,
      Math.round(baselineDemand * weekendBoost + randomVariance)
    )

    data.push({
      date: date.toISOString().split('T')[0],
      quantity,
      dayOfWeek,
    })
  }

  return data
}

// Generate mock forecasts for next 30 days
export const generateMockForecasts = (baselineHistory: DailyDemand[]): Forecast[] => {
  const forecasts: Forecast[] = []
  const avgDemand = baselineHistory.reduce((sum, d) => sum + d.quantity, 0) / baselineHistory.length
  const today = new Date()

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    const dayOfWeek = date.getDay()

    // Forecast with trend and seasonality
    const weekendBoost = [0, 6].includes(dayOfWeek) ? 1.3 : 0.9
    const trend = 1 + (i * 0.01) // Slight upward trend
    const randomVariance = Math.random() * 15 - 7
    const forecastedDemand = Math.round(avgDemand * weekendBoost * trend + randomVariance)

    // Determine confidence based on how far out the forecast is
    const confidence: 'High' | 'Medium' | 'Low' = i <= 7 ? 'High' : i <= 14 ? 'Medium' : 'Low'

    // Calculate stockout probability (mock calculation)
    const stockoutProbability = Math.max(0, Math.min(1, (forecastedDemand - avgDemand) / (avgDemand * 2)))

    const riskLevel: 'Low' | 'Medium' | 'High' =
      stockoutProbability > 0.6 ? 'High' : stockoutProbability > 0.3 ? 'Medium' : 'Low'

    forecasts.push({
      date: date.toISOString().split('T')[0],
      forecastedDemand,
      confidence,
      riskLevel,
      stockoutProbability: Math.round(stockoutProbability * 100),
    })
  }

  return forecasts
}

// Get inventory health KPIs
export interface InventoryKPI {
  stockoutRiskPercentage: number
  inventoryHealthScore: number
  forecastAccuracy: number
  excessInventoryValue: number
}

export const calculateInventoryKPIs = (): InventoryKPI => {
  // Mock KPI calculations - In production, these would be computed from real data
  return {
    stockoutRiskPercentage: 12.5,
    inventoryHealthScore: 78,
    forecastAccuracy: 84.2,
    excessInventoryValue: 18750,
  }
}

// Generate reorder recommendations
export const generateRecommendations = (
  products: Product[],
  locations: Location[],
  forecasts: Forecast[]
): Recommendation[] => {
  const recommendations: Recommendation[] = []
  let id = 1

  for (const product of products.slice(0, 3)) {
    for (const location of locations.slice(0, 3)) {
      // Find high-risk forecast dates
      const highRiskDays = forecasts.filter(f => f.riskLevel === 'High').slice(0, 2)

      if (highRiskDays.length > 0) {
        const nextHighRisk = highRiskDays[0]
        const avgForecast = forecasts.reduce((sum, f) => sum + f.forecastedDemand, 0) / forecasts.length

        // Calculate reorder quantity (safety stock + lead time demand)
        const leadTimeDays = 3
        const leadTimeDemand = avgForecast * leadTimeDays
        const reorderQuantity = Math.round(leadTimeDemand + product.safetyStock)

        const daysUntilStockout = Math.ceil((product.currentStock - product.safetyStock) / avgForecast)
        const reorderDate = new Date()
        reorderDate.setDate(reorderDate.getDate() + Math.max(1, daysUntilStockout - leadTimeDays))

        const priority: 'High' | 'Medium' | 'Low' = daysUntilStockout < 5 ? 'High' : daysUntilStockout < 10 ? 'Medium' : 'Low'

        const drivers = []
        if (nextHighRisk.riskLevel === 'High') drivers.push('High demand forecast')
        if (product.currentStock < product.safetyStock * 2) drivers.push('Low current stock')
        if (daysUntilStockout < 7) drivers.push('Imminent stockout risk')

        recommendations.push({
          id: `rec-${id++}`,
          skuId: product.id,
          locationId: location.id,
          reorderQuantity,
          reorderDate: reorderDate.toISOString().split('T')[0],
          priority,
          explanation: `Based on simulated demand trends, we recommend ordering ${reorderQuantity} units by ${reorderDate.toISOString().split('T')[0]} to maintain optimal inventory levels.`,
          drivers: drivers.length > 0 ? drivers : ['Routine reorder based on forecast'],
        })
      }
    }
  }

  return recommendations
}
