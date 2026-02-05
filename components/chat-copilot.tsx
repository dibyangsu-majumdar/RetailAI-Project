'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Send, Loader2, X } from 'lucide-react'
import { mockProducts, mockLocations } from '@/lib/mock-data'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Mock AI responses based on user queries
const generateAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes('stockout')) {
    return `Based on current simulated forecasts, SKUs at risk of stockout in the next 7 days are:

• **TSH-001** (Premium Cotton T-Shirt) - Bangalore store: 87% probability
• **DEN-001** (Denim Jeans) - Mumbai location: 65% probability

**Why?** Recent demand patterns show a 35% spike during weekends, and current safety stock levels for these SKUs are below recommended thresholds.

**Recommendation:** Consider reordering TSH-001 by tomorrow to maintain service levels.`
  } else if (lowerQuery.includes('overstock') || lowerQuery.includes('excess')) {
    return `Overstocked items based on simulated inventory analysis:

• **Winter Jacket (JAC-001)** - 42 units at Downtown Store
  - Holding cost: ~$8/unit/month
  - Recommendation: 15% promotion to accelerate turnover

• **Running Shoes (RUN-001)** - 156 units across locations
  - Seasonally slow-moving in Q1
  - Alternative: Bundle with complementary items

**Estimated excess inventory value:** $18,750`
  } else if (lowerQuery.includes('promotion')) {
    return `I can help you simulate promotion impact! Key considerations:

1. **Discount Elasticity:** For apparel, typical elasticity is 1.5 (15% discount → 22.5% volume uplift)
2. **Best Candidates:** Fast-moving SKUs like TSH-001 and SNK-001
3. **Timing:** Avoid promotions when inventory is critically low

Would you like me to run a simulation for a specific SKU? Try: "What if I discount Premium Cotton T-Shirt by 20%?"`
  } else if (lowerQuery.includes('forecast') || lowerQuery.includes('demand')) {
    return `Here's the aggregated demand forecast summary:

**Next 7 Days:**
- Average forecasted demand: 54 units/day
- Confidence: High (based on 30-day historical trend)
- Peak day: Saturday (68 units)

**Key Trends:**
- Weekday baseline: 45 units
- Weekend boost: +35% on Saturdays/Sundays
- Slight upward trend: +1% daily

**Drivers:** Recent sales data, seasonality, and promotion history`
  } else if (lowerQuery.includes('reorder') || lowerQuery.includes('recommend')) {
    return `Current reorder recommendations (AI-generated):

**URGENT (Next 3 days):**
1. TSH-001 at Bangalore - 125 units (stockout risk: 87%)
2. SNK-001 at Mumbai - 95 units (stockout risk: 72%)

**STANDARD (Next 7-10 days):**
3. RUN-001 at Chennai - 80 units
4. DEN-001 at Delhi - 65 units

Each recommendation includes lead time demand + safety stock buffer. Would you like details on any specific SKU?`
  } else if (lowerQuery.includes('health') || lowerQuery.includes('score')) {
    return `Current inventory health metrics:

📊 **Inventory Health Score: 78/100**
- Stockout Risk: 12.5% (acceptable range: <15%)
- Service Level: 94% (target: >95%)
- Turnover Rate: 8.2x annually (healthy)

⚠️ **Areas for Improvement:**
- Excess inventory value: $18,750 (higher than target)
- Some SKUs overstocked while others at risk

🎯 **Actions to improve:**
- Execute targeted promotions on slow-moving items
- Optimize reorder points based on updated forecasts`
  } else {
    return `I can help you with inventory decisions! Try asking me about:

• **Stockouts:** "Which SKUs are likely to stock out next week?"
• **Overstock:** "Which products are overstocked?"
• **Promotions:** "What's the impact of a 15% discount on T-shirts?"
• **Reorders:** "What should I reorder next?"
• **Forecasts:** "What's the demand forecast for next 7 days?"
• **Health:** "What's my inventory health score?"

What would you like to know?`
  }
}

export default function ChatCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome to Retail Intelligence Copilot! I can help you with:

• Demand forecasting and trend analysis
• Inventory health and optimization recommendations
• Promotion impact simulations
• Stockout risk identification
• Reorder quantity and timing guidance

Ask me anything about your inventory!`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate AI response
    const aiResponse: Message = {
      role: 'assistant',
      content: generateAIResponse(input),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, aiResponse])
    setIsLoading(false)
  }

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col h-full">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">AI Copilot</CardTitle>
          <Badge variant="outline" className="text-xs">Beta</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {msg.role === 'user' ? 'Y' : 'AI'}
            </div>
            <div
              className={`flex-1 p-3 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border/50 text-foreground'
              }`}
            >
              <div className="prose prose-sm max-w-none text-xs leading-relaxed">
                {msg.content.split('\n').map((line, i) => (
                  <div key={i} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-muted text-muted-foreground">
              AI
            </div>
            <div className="flex-1 p-3 rounded-lg bg-background border border-border/50 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about inventory..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="sm"
            className="px-3"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          💡 Try asking about stockouts, forecasts, or promotions
        </p>
      </div>
    </div>
  )
}
