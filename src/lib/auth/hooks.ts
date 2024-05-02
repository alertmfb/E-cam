import { useContext } from 'react'
// import { supabase } from '@/lib/sb'
import { AuthContext } from './auth-provider'
import { useNavigate } from '@tanstack/react-router'
// import type { Session } from '@/lib/auth/auth-provider'

export function useAuthSession() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function RedirectHome() {
  const navigate = useNavigate()
  return navigate({ to: '/sign-in' })
}
