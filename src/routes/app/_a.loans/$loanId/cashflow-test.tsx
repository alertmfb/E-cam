import { ApplicationNavC } from '@/components/routes/loans/application-nav'
import { CashflowTable } from '@/components/routes/loans/cashflow-test/mctTable'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/cashflow-test')({
  component: CashFlowTest,
})

function CashFlowTest() {
  const { loanId } = Route.useParams() as { loanId: string }

  const navigate = useNavigate()

  return (
    <div className="w-full mx-auto px-3 xl:px-20 flex flex-col gap-4">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/incomplete', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Monthly Cashflow Test</h1>
        </div>
        <ApplicationNavC loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <CashflowTable loanId={loanId} />
      </main>
    </div>
  )
}
