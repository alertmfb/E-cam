import { AppHeader } from '@/components/header'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { useAuth } from '@/lib/auth/hooks'
import { Outlet, createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a')({
  component: Protected,
})

function Protected() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Navigate to="/" />
  }

  return (
    <AuthProvider>
      <div>
        <AppHeader />
        <div className="mx-auto mt-4">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}
