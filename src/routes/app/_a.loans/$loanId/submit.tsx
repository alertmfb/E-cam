import { ApplicationNavC } from '@/components/routes/loans/application-nav'
import { SubmitForm } from '@/components/routes/loans/submit/submit-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/submit')({
  component: Submit,
})

function Submit() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="w-full mx-auto px-6 xl:px-20 flex flex-col gap-4">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-xl font-semibold">Submit Loan Application</h1>
        <ApplicationNavC loanId={loanId} key="reference" />
      </div>
      <SubmitForm loanId={loanId} />
    </div>
  )
}
