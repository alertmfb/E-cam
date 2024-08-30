import { ApplicationStatusTable } from '@/components/routes/loans/status/status-table'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/status/')({
  component: Status,
})

function Status() {
  const navigate = useNavigate()

  const { role } = useUser()

  if (role === 'admin') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <div className="flex gap-3 items-center">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/dashboard', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold">Loan application status</h1>
      </div>
      <main className="flex flex-col pt-3 gap-2">
        <ApplicationStatusTable />
      </main>
    </div>
  )
}
