import { ApplicationNavB } from '@/components/routes/loans/application-nav'
import { UploadForm } from '@/components/routes/loans/document/upload-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/document')({
  component: DocumentUpload,
})

function DocumentUpload() {
  const { loanId } = Route.useParams() as { loanId: string }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Document Upload</h1>
        <ApplicationNavB loanId={loanId} key="reference" />
      </div>
      <main className="flex flex-col items-start h-20 pt-9 gap-5">
        <UploadForm loanId={loanId} />
      </main>
    </div>
  )
}
