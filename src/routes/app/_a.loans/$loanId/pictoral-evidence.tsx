import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { VerificationPicUploadForm } from '@/components/routes/loans/document/vp-form'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/pictoral-evidence')(
  {
    component: VerificationPicture,
  }
)

function VerificationPicture() {
  const { loanId } = Route.useParams() as { loanId: string }

  const { role } = useUser()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Pictoral Evidence</h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col items-start h-20 pt-9 gap-5">
        <VerificationPicUploadForm loanId={loanId} />
      </main>
    </div>
  )
}
