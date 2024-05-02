import { RejectedApplicationsTable } from '@/components/routes/loans/rejected/rejected-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/rejected')({
  component: Rejected,
})

function Rejected() {
  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Rejected applications</h1>
      <main className="flex flex-col pt-3">
        <RejectedApplicationsTable />
      </main>
    </div>
  )
}
