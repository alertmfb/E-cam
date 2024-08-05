import { ClientInfoData } from '@/components/routes/loans/client-information/client-info-data'
import { UploadData } from '@/components/routes/loans/document/upload-data'
import { GuarantorInfoData } from '@/components/routes/loans/gurantors-info/guarantor-info-data'
import {
  LoanActionForm,
  LoanRejectionForm,
} from '@/components/routes/loans/loan-action/loan-action-form'
import { ProfitLossData } from '@/components/routes/loans/profit-loss/pl-data'
import { ReferenceData } from '@/components/routes/loans/references/reference-data'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/data')({
  component: LoanData,
})

function LoanData() {
  const { loanId } = Route.useParams() as { loanId: string }
  return (
    <div className="container w-full flex flex-col px-4 gap-3 py-10">
      <h1 className="text-xl font-semibold">Loan Data</h1>
      <main className="flex flex-col pt-3 gap-6">
        <ClientInfoData LoanId={loanId} />
        <GuarantorInfoData LoanId={loanId} />
        {/* <ReferenceData loanId={loanId} /> */}
        <UploadData loanId={loanId} />
        <ProfitLossData loanId={loanId} />
        <Actions loanId={loanId} />
      </main>
    </div>
  )
}

function Actions(loanId: { loanId: string }) {
  const { role } = useUser()

  if (role === 'loan_officer') {
    return <div></div>
  }

  return (
    <>
      <LoanActionForm loanId={loanId.loanId} />
      <LoanRejectionForm loanId={loanId.loanId} />
    </>
  )
}
