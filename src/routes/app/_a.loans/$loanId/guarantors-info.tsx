import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { GuarantorsInfoForm } from '@/components/routes/loans/gurantors-info/guarantorsInfoForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/guarantors-info')({
  component: GuarantorInfo,
})

function GuarantorInfo() {
  const { loanId } = Route.useParams()

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Guarantor's Info</h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <GuarantorsInfoForm />
      </main>
    </div>
  )
}
