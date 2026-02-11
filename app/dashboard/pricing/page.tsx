'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small retailers',
    price: 99,
    period: '/month',
    trialDays: 14,
    features: [
      '14-day free trial',
      '30-day demand forecasts',
      'Up to 100 SKUs',
      'Basic recommendations',
      'Email support',
      'Data import',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses',
    price: 299,
    period: '/month',
    popular: true,
    trialDays: 14,
    features: [
      '14-day free trial',
      '90-day demand forecasts',
      'Unlimited SKUs',
      'Advanced recommendations',
      'Priority support',
      'Data import & export',
      'Custom integrations',
      'AI-powered insights',
      'Promotion simulations',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    period: '',
    features: [
      'Everything in Professional',
      'Multi-location management',
      'Advanced analytics',
      'Dedicated account manager',
      'Custom training',
      'API access',
      'White-label options',
      'SLA guarantee',
    ],
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    router.push(`/dashboard/payment?plan=${planId}`)
  }

  return (
    <DashboardLayout onChatToggle={() => {}} showChat={false}>
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">14-day free trial on all plans</span>
            </div>
            <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground">
              Choose the perfect plan for your retail business. No credit card required to start.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative transition-all ${
                  plan.popular
                    ? 'border-primary shadow-lg md:scale-105'
                    : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="text-4xl font-bold">
                      {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                    </div>
                    {plan.period && (
                      <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.id !== 'enterprise' ? (
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto space-y-6 mt-12">
            <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>

            <div className="grid gap-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Can I change my plan anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We offer a 14-day free trial for all plans. No credit card required to get started.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, bank transfers, and digital wallets for your convenience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Do you offer refunds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee if you are not satisfied with our service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
