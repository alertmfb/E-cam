import { Inventory } from '@/components/routes/loans/profit-loss/inventory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/profit-loss')({
  component: ProfitLoss,
})

function ProfitLoss() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="w-full mx-auto px-6 xl:px-20 flex flex-col gap-6">
      <div className="text-2xl font-bold">Inventory:</div>
      <Inventory />
    </div>
  )
}
