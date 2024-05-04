// import { ClientInfoData } from '@/components/routes/loans/client-information/client-info-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_a/loans/pending/$loanId/client-info'
)({
  component: ClientInfo,
})

function ClientInfo() {
  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Client Information</h1>
      <main className="flex flex-col pt-3">{/* <ClientInfoData /> */}</main>
    </div>
  )
}
