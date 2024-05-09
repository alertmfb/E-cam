import { ApplicationNav } from '@/components/routes/loans/application-nav'
import {
  FamilyAssetsForm,
  FamilyExpensesForm,
} from '@/components/routes/loans/family-expenses/feaForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/family-expenses')({
  component: FamilyExpenses,
})

function FamilyExpenses() {
  const { loanId } = Route.useParams()

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Family Expenses</h1>
        <ApplicationNav loanId={loanId} key="family-expenses" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <FamilyExpensesForm loanId={loanId}/>
        <h1 className="text-2xl font-semibold">Family Assets</h1>

        <FamilyAssetsForm loanId={loanId}/>
      </main>
    </div>
  )
}
