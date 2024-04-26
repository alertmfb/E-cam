import { LoanForm } from '@/components/routes/loans/new/loan-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/new')({
  component: Application,
})

function Application() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between flex-1 flex-wrap">
        <h1 className="text-2xl font-semibold">New Loan Application</h1>
        <h1 className="text-2xl font-semibold text-blue-700">
          Client's Information
        </h1>
      </div>
      <main className="flex flex-col h-20 pt-3">
        <LoanForm />
      </main>
    </div>
  )
}
