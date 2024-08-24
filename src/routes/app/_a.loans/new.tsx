import { LoanApplicationForm } from '@/components/routes/loans/loan-application/loan-application-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/lib/auth/hooks'

export const Route = createFileRoute('/app/_a/loans/new')({
  component: Application,
})

function Application() {
  const { role } = useUser()
  const navigate = useNavigate()

  if (role !== 'loan_officer') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/dashboard', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">New Loan Application</h1>
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
