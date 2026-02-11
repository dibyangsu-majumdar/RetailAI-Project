'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Lock } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const planDetails: Record<string, { name: string; price: number }> = {
  starter: { name: 'Starter', price: 99 },
  professional: { name: 'Professional', price: 299 },
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || 'starter'
  
  const plan = planDetails[planId] || planDetails.starter
  const [isLoading, setIsLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/dashboard?payment=success')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout onChatToggle={() => {}} showChat={false}>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Plans
            </button>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>
                  You are subscribing to the {plan.name} plan
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Plan Summary */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{plan.name} Plan</span>
                      <span className="text-lg font-bold">${plan.price}/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Billed monthly. Cancel anytime.
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={paymentData.email}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, email: e.target.value })
                      }
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cardholder Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={paymentData.cardName}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cardName: e.target.value })
                      }
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Card Number</label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').slice(0, 16)
                        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ')
                        setPaymentData({ ...paymentData, cardNumber: formatted })
                      }}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={paymentData.expiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            const formatted = value.slice(0, 2) + '/' + value.slice(2, 4)
                            setPaymentData({ ...paymentData, expiry: formatted })
                          } else {
                            setPaymentData({ ...paymentData, expiry: value })
                          }
                        }}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">CVC</label>
                      <Input
                        type="text"
                        placeholder="123"
                        maxLength="3"
                        value={paymentData.cvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentData({ ...paymentData, cvc: value })
                        }}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing Payment...' : `Pay $${plan.price}/month`}
                  </Button>

                  {/* Cancel Link */}
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="bg-muted/50 border-border/50">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  By clicking "Pay", you agree to our Terms of Service. Your subscription will be charged to your card at the beginning of each billing period. You can cancel anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
