import { ApplicationNavD } from '@/components/routes/loans/application-nav'
import { CommitteeDecisionTable } from '@/components/routes/loans/committee-decision/cd-table'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute(
  '/app/_a/loans/$loanId/committee-decision'
)({
  component: CommitteeDecision,
})

function CommitteeDecision() {
  const { loanId } = Route.useParams() as { loanId: string }

  const navigate = useNavigate()

  return (
    <div className="container w-full flex flex-col gap-3 px-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/incomplete', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Committee Decision</h1>
        </div>
        <ApplicationNavD loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <CommitteeDecisionTable loanId={loanId} />
      </main>
    </div>
  )
}
