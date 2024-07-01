import { StatusData } from '@/components/routes/loans/status/status-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/status/$loanId/$branchId')({
  component: StatusId,
})

function StatusId() {
  const { loanId, branchId } = Route.useParams() as {
    loanId: string
    branchId: string
  }

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Approval Information</h1>
      <main className="flex flex-col pt-3">
        <StatusData loanId={loanId} branchId={branchId} />
      </main>
    </div>
  )
}
