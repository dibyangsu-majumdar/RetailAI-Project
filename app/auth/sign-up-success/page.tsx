import { CheckCircle, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Retail Intelligence</span>
          </div>
          <h1 className="text-4xl font-bold">RetailAI</h1>
        </div>

        {/* Success Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent you a confirmation link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-1">Next Steps:</h3>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Check your email inbox</li>
                    <li>Click the confirmation link we sent you</li>
                    <li>You'll be redirected to your dashboard</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/auth">Back to Sign In</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-xs text-center text-muted-foreground">
                  <span className="font-medium text-primary">Start your 14-day free trial</span> - No credit card required
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
