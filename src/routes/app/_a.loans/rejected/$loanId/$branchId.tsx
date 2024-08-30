import { RejectedData } from '@/components/routes/loans/rejected/rejected-data'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute(
  '/app/_a/loans/rejected/$loanId/$branchId'
)({
  component: RejectedLoan,
})

function RejectedLoan() {
  const { loanId, branchId } = Route.useParams() as {
    loanId: string
    branchId: string
  }

  const navigate = useNavigate()

  const { role } = useUser()

  if (role === 'admin' || role === 'credit') {
    return <div>Not Found</div>
  }

  return (
    <div className="w-full container flex flex-col px-4 gap-3 pt-10">
      <div className="flex items-center gap-3">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/loans/rejected', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">Rejected Details</h1>
      </div>{' '}
      <main className="flex flex-col pt-3">
        <RejectedData loanId={loanId} branchId={branchId} />
      </main>
    </div>
  )
}
