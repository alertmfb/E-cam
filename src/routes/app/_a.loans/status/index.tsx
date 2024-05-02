import { ApplicationStatusTable } from '@/components/routes/loans/status/status-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/status/')({
  component: Status,
})

function Status() {
  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Loan application status</h1>
      <main className="flex flex-col pt-3">
        <ApplicationStatusTable />
      </main>
    </div>
  )
}
