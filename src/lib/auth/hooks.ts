import { useContext } from 'react'
import { AuthContext } from './auth-provider'
import { UserResponse } from './functions'

export function useAuthSession() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthUser() {
  let user
  if (typeof window !== 'undefined' && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user')!) as UserResponse
  }
  return user!
}
