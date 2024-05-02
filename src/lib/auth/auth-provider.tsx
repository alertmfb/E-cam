import { createContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/sb'

export interface Session {
  access_token: string
  email: string
  role: 'loan_officer' | 'relationship_manager'
}

export const AuthContext = createContext<Session | null>(null)

type Props = {
  children: React.ReactNode
}

async function checkRole() {
  if (typeof window !== 'undefined' && window.localStorage) {
    !JSON.parse(localStorage.getItem('role')!)
    // (await supabase.auth.signOut())
    // console.log('Role not found')
  }
}

export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  // fetch the role from local storage and sign out if not found or null

  checkRole()

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          'session_key',
          JSON.stringify({
            access_token: session?.access_token,
            email: session?.user.email,
          })
        )
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          'session_key',
          JSON.stringify({
            access_token: session?.access_token,
            email: session?.user.email,
          })
        )
      }
    })

    setLoading(false)

    return () => subscription.unsubscribe()
  }, [])

  const sess = JSON.parse(localStorage.getItem('session_key')!)
  const role = JSON.parse(localStorage.getItem('role')!)
  const session: Session = { ...sess, role }

  return (
    <AuthContext.Provider value={{ ...session }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
