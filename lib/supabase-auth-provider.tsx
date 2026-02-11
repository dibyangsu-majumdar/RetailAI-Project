'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  provider: string | null
}

interface UserContextType {
  user: Profile | null
  supabaseUser: SupabaseUser | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('[v0] Error fetching profile:', error)
        return null
      }

      console.log('[v0] Fetched user profile:', data)
      return data as Profile
    } catch (err) {
      console.error('[v0] Exception fetching profile:', err)
      return null
    }
  }

  const refreshUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        setSupabaseUser(authUser)
        const profile = await fetchUserProfile(authUser.id)
        setUser(profile)
        console.log('[v0] User refreshed:', profile)
      } else {
        setSupabaseUser(null)
        setUser(null)
      }
    } catch (err) {
      console.error('[v0] Error refreshing user:', err)
      setSupabaseUser(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial user fetch
    refreshUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[v0] Auth state changed:', event)
        
        if (session?.user) {
          setSupabaseUser(session.user)
          const profile = await fetchUserProfile(session.user.id)
          setUser(profile)
        } else {
          setSupabaseUser(null)
          setUser(null)
        }
        
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSupabaseUser(null)
      router.push('/auth')
    } catch (err) {
      console.error('[v0] Error logging out:', err)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        supabaseUser,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a SupabaseAuthProvider')
  }
  return context
}
