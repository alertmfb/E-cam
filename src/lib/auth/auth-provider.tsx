import { createContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/sb'
import {
  AuthState,
  ProviderProps,
  Role,
  TOKEN_NAME,
  cookies,
  validateToken,
} from '.'
import { Axios } from '../axios'
export interface Session {
  access_token: string
  email: string
  role: Role
}

export const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)

    const token = cookies.get(TOKEN_NAME)

    if (token) {
      Axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
    }

    setLoading(false)
  }, [])

  const token = cookies.get(TOKEN_NAME)
  const authState = validateToken(token)

  return (
    <AuthContext.Provider value={{ ...authState }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
