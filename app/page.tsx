'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/supabase-auth-provider'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/auth')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  )
}
