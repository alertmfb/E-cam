import { ApplicationNav } from '@/components/routes/loans/application-nav'
import {
  CommercialReferenceForm,
  FamilyRefereceForm,
  NeighbourhoodReferenceForm,
} from '@/components/routes/loans/references/referenceForm'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/reference')({
  component: Reference,
})

function Reference() {
  const { loanId } = Route.useParams() as { loanId: string }

  const { role } = useUser()

  const navigate = useNavigate()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3 p-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/incomplete', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Reference</h1>
        </div>
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
