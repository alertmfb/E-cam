import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { GuarantorsInfoForm } from '@/components/routes/loans/gurantors-info/guarantorsInfoForm'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/guarantors-info')({
  component: GuarantorInfo,
})

function GuarantorInfo() {
  const { loanId } = Route.useParams() as { loanId: string }

  const { role } = useUser()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Guarantor's Info</h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <GuarantorsInfoForm loanId={loanId} />
      </main>
    </div>
  )
}
