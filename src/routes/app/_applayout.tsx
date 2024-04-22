import { AppHeader } from '@/components/header'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_applayout')({
  component: Layout,
})

function Layout() {
  return (
    <div>
      <AppHeader />
      <div className="container mx-auto mt-4">
        <Outlet />
      </div>
    </div>
  )
}
