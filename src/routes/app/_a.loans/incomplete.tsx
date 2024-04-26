import { createFileRoute } from '@tanstack/react-router'
import { IncompleteTable } from '@/components/routes/loans/incomplete/incomplete-table'

export const Route = createFileRoute('/app/_a/loans/incomplete')({
  component: Incomplete,
})

function Incomplete() {
  return (
    <div className="w-full flex flex-col px-4 gap-5">
      <h1 className="text-2xl font-semibold">Incomplete Loan Applications</h1>
      <IncompleteTable />
    </div>
  )
}