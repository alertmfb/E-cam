import { BusinessData } from '@/components/routes/loans/business-expenses/business-data'
import { CashflowData } from '@/components/routes/loans/cashflow-test/cashflow-data'
import { ClientInfoData } from '@/components/routes/loans/client-information/client-info-data'
import { ColPledgeData } from '@/components/routes/loans/col-pledge/cp-data'
import { CommitteeDecisionData } from '@/components/routes/loans/committee-decision/committee-decision-data'
import { FamilyData } from '@/components/routes/loans/family-expenses/family-data'
import { GuarantorVerificationData } from '@/components/routes/loans/guarantor-verification/gv-data'
import { GuarantorInfoData } from '@/components/routes/loans/gurantors-info/guarantor-info-data'
import {
  LoanActionForm,
  LoanRejectionForm,
} from '@/components/routes/loans/loan-action/loan-action-form'
import { PictoralEvidenceData } from '@/components/routes/loans/pictoral-evidence/pe-data'
import { ProfitLossData } from '@/components/routes/loans/profit-loss/pl-data'
import { ReferenceData } from '@/components/routes/loans/references/reference-data'
import { StockPledgeData } from '@/components/routes/loans/stock-pledge/sp-data'
import { VisitReportData } from '@/components/routes/loans/visit-report/visit-report-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        <Tabs
          defaultValue="client"
          className="w-full flex flex-col gap-3 outline-none"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="client">Client Data</TabsTrigger>
            <TabsTrigger value="sheets">Sheets</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="space-y-6">
            <ClientInfoData loanId={loanId} />
            <FamilyData loanId={loanId} />
            <BusinessData loanId={loanId} />
            <GuarantorInfoData loanId={loanId} />
            <ReferenceData loanId={loanId} />
          </TabsContent>

          <TabsContent value="sheets" className="space-y-6">
            <ProfitLossData loanId={loanId} />
            <StockPledgeData loanId={loanId} />
            <ColPledgeData loanId={loanId} />
            <CashflowData loanId={loanId} />
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <PictoralEvidenceData loanId={loanId} />
            <GuarantorVerificationData loanId={loanId} />
            <VisitReportData loanId={loanId} />
            <CommitteeDecisionData loanId={loanId} />
          </TabsContent>
        </Tabs>

        <Actions loanId={loanId} />
      </main>
    </div>
  )
}

function Actions({ loanId }: { loanId: string }) {
  const { role } = useUser()

  if (role === 'loan_officer') {
    return <div></div>
  }

  return (
    <>
      <LoanActionForm loanId={loanId} />
      <LoanRejectionForm loanId={loanId} />
    </>
  )
}
