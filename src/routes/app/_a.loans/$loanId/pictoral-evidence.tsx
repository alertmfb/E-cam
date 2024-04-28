import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { PictoralEvidenceForm } from '@/components/routes/loans/pictoral-evidence/pictoral-evidence-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/pictoral-evidence')(
  {
    component: PictoralEvidence,
  }
)

function PictoralEvidence() {
  const { loanId } = Route.useParams()
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Pictoral Evidence</h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col h-20 pt-3 gap-5">
        {/* <h1 className="text-xl font-semibold">Pictoral Evidence</h1> */}
        <PictoralEvidenceForm />
      </main>
    </div>
  )
}
