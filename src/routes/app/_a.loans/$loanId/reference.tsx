import { ApplicationNav } from '@/components/routes/loans/application-nav'
import {
  CommercialReferenceForm,
  FamilyRefereceForm,
  NeighbourhoodReferenceForm,
} from '@/components/routes/loans/references/referenceForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/reference')({
  component: Reference,
})

function Reference() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Reference</h1>
        <ApplicationNav loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        <h1 className="text-xl font-semibold">Family Reference</h1>
        <FamilyRefereceForm loanId={loanId} />
        <h1 className="text-xl font-semibold">Commercial Reference</h1>
        <CommercialReferenceForm loanId={loanId} />
        <h1 className="text-xl font-semibold">Neighbourhood Reference</h1>
        <NeighbourhoodReferenceForm loanId={loanId} />
      </main>
    </div>
  )
}
