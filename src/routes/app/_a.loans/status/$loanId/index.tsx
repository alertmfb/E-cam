import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/status/$loanId/')({
  component: () => <div>Hello /app/_a/loans/status/$loanId/!</div>
})