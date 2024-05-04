import { AppHeader } from '@/components/header'
import { AuthProvider, Session } from '@/lib/auth/auth-provider'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import { Outlet, createFileRoute, Navigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { findUser } from '@/lib/auth/functions'

export const Route = createFileRoute('/app/_a')({
  component: Layout,
})

function Layout() {
  // const auth = useAuthSession()
  const auth: Session = {
    email: 'name@gmail.com',
    access_token: 'laal',
    role: 'relationship_manager',
  }

  // fetch user from LocalStorage first, this is to prevent a database call when user refreshes
  const user = useAuthUser()

  // enable query if the user does not have an id
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: () => findUser({ email: auth.email, role: auth.role }),
    enabled: !user?.id,
  })

  if (isLoading) {
    console.log('Fetching data')
  }

  // when query successfull, check id to ensure returned user is valid
  if (isSuccess) {
    if (!data.id) {
      return <Navigate to="/sign-in" replace />
    }

    // set user to local storage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(data))
    }
  }

  if (!auth.access_token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <AuthProvider>
      <div>
        <AppHeader />
        <div className="container mx-auto mt-4">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}
