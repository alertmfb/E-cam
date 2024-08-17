import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Template } from '@/components/routes/loans/loan-cert/template'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/$loanId/loan-cert')({
  component: LoanCert,
})

function LoanCert() {
  const { loanId } = Route.useParams() as { loanId: string }

  const navigate = useNavigate()

  const contentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() =>
              navigate({ to: '/app/loans/approved', replace: true })
            }
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Loan Certificate</h1>
        </div>
      </div>
      <main className="flex flex-col items-start bg-sky-50 rounded-lg gap-5 my-10">
        <div ref={contentRef} className="w-full">
          <Template />
        </div>
        <Button onClick={handlePrint} className="self-end mr-20 mb-10">
          Print Offer Letter
        </Button>
      </main>
    </div>
  )
}
