import { RejectedData } from '@/components/routes/loans/rejected/rejected-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/rejected/$loanId')({
  component: RejectedLoan,
})

function RejectedLoan() {
  const { loanId } = Route.useParams()

  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Rejected Details</h1>
      <main className="flex flex-col pt-3">
        <RejectedData loanId={loanId} />
      </main>
    </div>
  )
}
