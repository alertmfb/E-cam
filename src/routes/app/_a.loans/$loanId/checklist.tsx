import { CheckListTable } from '@/components/routes/loans/committee-decision/loan-checklist'
import { useUser } from '@/lib/auth/hooks'
import { useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/checklist')({
  component: Checklist,
})

function Checklist() {
  const { loanId } = Route.useParams() as { loanId: string }
  const { role } = useUser()

  const navigate = useNavigate()

  if (role !== 'credit') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({
                to: '/app/loans/$loanId/data',
                params: { loanId: loanId },
                replace: true,
              })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Loan Checklist</h1>
        </div>
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <CheckListTable loanId={loanId} />
      </main>
    </div>
  )
}
