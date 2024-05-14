import { AuthProvider } from '@/lib/auth/auth-provider'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Role } from '@/lib/auth/functions'

type Session = {
  access_token: string
  email: string
  role: Role
}

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: Session
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="w-full min-h-screen">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </>
  )
}
