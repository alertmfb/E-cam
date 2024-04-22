import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_applayout/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="w-full flex flex-col px-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  )
}
