import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { routeTree } from './routeTree.gen.ts'
import { useAuthSession } from './lib/auth/hooks.ts'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({ routeTree, context: { auth: undefined! } })

export function InnerApp() {
  const auth = useAuthSession()
  return <RouterProvider router={router} />
}
