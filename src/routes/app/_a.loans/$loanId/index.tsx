import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/')({
  component: LoanEntry,
})

function LoanEntry() {
  return <div>Yo</div>
}
