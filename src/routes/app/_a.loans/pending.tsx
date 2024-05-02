import { PendingApplicationsTable } from '@/components/routes/loans/pending/pending-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/pending')({
  component: Pending,
})

function Pending() {
  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">
        Pending loan applications for your approval
      </h1>
      <main className="flex flex-col pt-3">
        <PendingApplicationsTable />
      </main>
    </div>
  )
}
