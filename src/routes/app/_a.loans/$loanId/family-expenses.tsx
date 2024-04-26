import { ApplicationNav } from '@/components/routes/loans/application-nav'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/family-expenses')({
  component: FamilyExpenses,
})

function FamilyExpenses() {
  const { loanId } = Route.useParams()

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Family Expenses</h1>
        <ApplicationNav loanId={loanId} key="family-expenses" />
      </div>
      <main className="flex flex-col h-20 pt-3">Populate data in form</main>
    </div>
  )
}
