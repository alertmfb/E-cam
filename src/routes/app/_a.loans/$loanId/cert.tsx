import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/cert')({
  component: Cert,
})

function Cert() {
  return <body lang="EN-US"></body>
}
