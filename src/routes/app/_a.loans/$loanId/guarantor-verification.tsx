import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { GuarantorVerificationForm } from '@/components/routes/loans/guarantor-verification/guarantor-verification-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_a/loans/$loanId/guarantor-verification'
)({
  component: GuarantorVerification,
})

function GuarantorVerification() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">
          Guarantor Business Verification
        </h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <GuarantorVerificationForm />
      </main>
    </div>
  )
}
