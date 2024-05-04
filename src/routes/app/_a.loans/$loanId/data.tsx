import { ClientInfoData } from '@/components/routes/loans/client-information/client-info-data'
import { GuarantorInfoData } from '@/components/routes/loans/gurantors-info/guarantor-info-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/data')({
  component: LoanData,
})

function LoanData() {
  const loanId = Route.useParams()
  return (
    <div className="w-full flex flex-col px-4 gap-3 py-10">
      <h1 className="text-xl font-semibold">Loan Data</h1>
      <main className="flex flex-col pt-3 gap-6">
        <ClientInfoData LoanId={loanId.loanId} />
        <GuarantorInfoData LoanId={loanId.loanId} />
      </main>
    </div>
  )
}
