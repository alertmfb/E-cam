import { ApplicationNavC } from '@/components/routes/loans/application-nav'
import { BalanceSheet } from '@/components/routes/loans/profit-loss/balance-sheet'
import { Inventory } from '@/components/routes/loans/profit-loss/inventory'
import { OtherBank } from '@/components/routes/loans/profit-loss/other-bank'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/profit-loss')({
  component: ProfitLoss,
})

function ProfitLoss() {
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
          <h1 className="text-2xl font-semibold">Profit & Loss</h1>
        </div>
        <ApplicationNavC loanId={loanId} key="reference" />
      </div>
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bank">Bank/Other IMF Balances</TabsTrigger>
          <TabsTrigger value="bs">Balance Sheet</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Inventory loanId={loanId} />
        </TabsContent>
        <TabsContent value="bank">
          <OtherBank loanId={loanId} />
        </TabsContent>
        <TabsContent value="bs">
          <BalanceSheet loanId={loanId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
