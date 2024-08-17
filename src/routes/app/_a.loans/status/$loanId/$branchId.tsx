import { StatusData } from '@/components/routes/loans/status/status-data'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/status/$loanId/$branchId')({
  component: StatusId,
})

function StatusId() {
  const { loanId, branchId } = Route.useParams() as {
    loanId: string
    branchId: string
  }

  const navigate = useNavigate()

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <div className="flex items-center gap-3">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/loans/status', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">Approval Information</h1>
      </div>
      <main className="flex flex-col pt-3">
        <StatusData loanId={loanId} branchId={branchId} />
      </main>
    </div>
  )
}
