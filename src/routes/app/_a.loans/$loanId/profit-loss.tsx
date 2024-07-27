import { ApplicationNavC } from '@/components/routes/loans/application-nav'
import { Inventory } from '@/components/routes/loans/profit-loss/inventory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/profit-loss')({
  component: ProfitLoss,
})

function ProfitLoss() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="w-full mx-auto px-6 xl:px-20 flex flex-col gap-4">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-xl font-semibold">Profit & Loss</h1>
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
        <TabsContent value="bank">Bank</TabsContent>
        <TabsContent value="bs">Balance Sheet</TabsContent>
      </Tabs>
    </div>
  )
}
