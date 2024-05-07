import { AppHeader } from '@/components/header'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import { Outlet, createFileRoute, Navigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Role, findUser, signOut } from '@/lib/auth/functions'

export const Route = createFileRoute('/app/_a')({
  component: Layout,
})

function Layout() {
  // fetch auth session object
  const auth = useAuthSession()
  let role: Role

  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!) as Role
  }

  // fetch user from LocalStorage first, this is to prevent a database call each time user refreshes
  const user = useAuthUser()
  if (!user?.email) {
    signOut()
  }

  // enable query only if there isnt a user in the local storage
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['find-userrr'],
    queryFn: () => findUser({ email: auth.email, role: role }),
    enabled: !user?.email,
  })

  // this ran because the enabled property was set to true
  if (fetchStatus === 'fetching') {
    return <span>Loading...</span>
  }

  // this bock ckecks if we have data
  if (status === 'success') {
    if (!data?.email) {
      return <Navigate to="/sign-in" replace />
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(data))
    }
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
