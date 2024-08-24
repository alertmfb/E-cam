import { ApprovedApplicationsTable } from '@/components/routes/loans/approved/approved-table'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/approved/')({
  component: Approved,
})

function Approved() {
  const navigate = useNavigate()

  return (
    <div className="w-full container flex flex-col px-4 gap-3 pt-10">
      <div className="flex gap-3 items-center">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/dashboard', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold">Approved applications</h1>
      </div>
      <main className="flex flex-col pt-3 gap-2">
        <ApprovedApplicationsTable />
      </main>
    </div>
  )
}
