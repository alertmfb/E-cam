import { LoanApplicationForm } from '@/components/routes/loans/loan-application/loan-application-form'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/new')({
  component: Application,
})

function Application() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">New Loan Application</h1>
        <Link to="/app/loans">
          <div className="flex items-center gap-1">
            <ArrowLeft className="size-7" />
            <span>Back</span>
          </div>
        </Link>
      </div>
      <main className="flex flex-col h-22 pt-3 gap-4">
        <h1 className="text-xl font-semibold text-destructive">
          Duplicate Entry Validation
        </h1>
        <LoanApplicationForm />
      </main>
    </div>
  )
}
