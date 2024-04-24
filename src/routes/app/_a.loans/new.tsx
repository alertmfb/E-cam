import { LoanForm } from '@/components/routes/loans/new/loan-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/new')({
  component: Application,
})

function Application() {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-semibold">New Loan Application</h1>
      <main className="flex flex-col h-20 pt-3">
        <LoanForm />
      </main>
    </div>
  )
}
