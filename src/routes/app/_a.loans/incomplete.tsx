import { createFileRoute } from '@tanstack/react-router'
import { IncompleteTable } from '@/components/routes/loans/incomplete/incomplete-table'

export const Route = createFileRoute('/app/_a/loans/incomplete')({
  component: Incomplete,
})

function Incomplete() {
  return (
    <div className="container w-full flex flex-col px-4 gap-5 pt-10">
      <h1 className="text-xl font-semibold">Incomplete</h1>
      <IncompleteTable />
    </div>
  )
}
