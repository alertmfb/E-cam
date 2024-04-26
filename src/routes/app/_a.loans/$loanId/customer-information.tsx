import { ApplicationNav } from '@/components/routes/loans/application-nav'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_a/loans/$loanId/customer-information'
)({
  component: CustomerInformation,
})

function CustomerInformation() {
  const { loanId } = Route.useParams()
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Client's Information</h1>
        <ApplicationNav loanId={loanId} key="customer-information" />
      </div>
      <main className="flex flex-col h-20 pt-3">Populate data in form</main>
    </div>
  )
}
