import { RejectedData } from '@/components/routes/loans/rejected/rejected-data'
import { createFileRoute } from '@tanstack/react-router'

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

  return (
    <div className="w-full container flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Rejected Details</h1>
      <main className="flex flex-col pt-3">
        <RejectedData loanId={loanId} branchId={branchId} />
      </main>
    </div>
  )
}
