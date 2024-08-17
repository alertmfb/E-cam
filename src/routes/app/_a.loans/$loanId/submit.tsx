import { ApplicationNavC } from '@/components/routes/loans/application-nav'
import { SubmitForm } from '@/components/routes/loans/submit/submit-form'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/submit')({
  component: Submit,
})

function Submit() {
  const { loanId } = Route.useParams() as { loanId: string }

  const { role } = useUser()

  const navigate = useNavigate()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="w-full mx-auto px-6 xl:px-20 flex flex-col gap-4">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/incomplete', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Submit Loan Application</h1>
        </div>
        <ApplicationNavC loanId={loanId} key="reference" />
      </div>
      <SubmitForm loanId={loanId} />
    </div>
  )
}
