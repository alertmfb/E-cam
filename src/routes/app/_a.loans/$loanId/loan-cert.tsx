import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Template } from '@/components/routes/loans/loan-cert/template'

export const Route = createFileRoute('/app/_a/loans/$loanId/loan-cert')({
  component: LoanCert,
})

function LoanCert() {
  const { loanId } = Route.useParams() as { loanId: string }

  const contentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ content: () => contentRef.current })

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">Loan Certificate</h1>
      </div>
      <main className="flex flex-col items-start h-20 pt-9 gap-5">
        <Button variant="outline" onClick={handlePrint}>
          Print
        </Button>
        <div ref={contentRef} className="w-full">
          <Template />
        </div>
      </main>
    </div>
  )
}
