import { ApplicationNav } from '@/components/routes/loans/application-nav'
import {
  FamilyAssetsForm,
  FamilyExpensesForm,
} from '@/components/routes/loans/family-expenses/feaForm'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/family-expenses')({
  component: FamilyExpenses,
})

function FamilyExpenses() {
  const { loanId } = Route.useParams() as { loanId: string }

  const { role } = useUser()

  const navigate = useNavigate()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/incomplete', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Family Expenses</h1>
        </div>
        <ApplicationNav loanId={loanId} key="family-expenses" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <FamilyExpensesForm loanId={loanId} />

        <h1 className="text-2xl font-semibold">Family Assets</h1>
        <FamilyAssetsForm loanId={loanId} />
      </main>
    </div>
  )
}
