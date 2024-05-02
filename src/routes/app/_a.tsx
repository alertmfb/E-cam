import { AppHeader } from '@/components/header'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { useAuthSession } from '@/lib/auth/hooks'
import { Outlet, createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a')({
  component: Layout,
})

function Layout() {
  const auth = useAuthSession()

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
