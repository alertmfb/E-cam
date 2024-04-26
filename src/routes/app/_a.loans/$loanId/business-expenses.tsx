import { ApplicationNav } from '@/components/routes/loans/application-nav'
import {
  BusinessAssetsForm,
  BusinessExpensesForm,
} from '@/components/routes/loans/business-expenses/beaForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/business-expenses')(
  {
    component: BusinessExpenses,
  }
)

function BusinessExpenses() {
  const { loanId } = Route.useParams()

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Business Expenses</h1>
        <ApplicationNav loanId={loanId} key="business-expenses" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <BusinessExpensesForm />
        <h1 className="text-2xl font-semibold">Business Assets</h1>
        <BusinessAssetsForm />
      </main>
    </div>
  )
}
