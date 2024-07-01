import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/loans/$loanId/_b')({
  component: () => <div>Hello /app/_a/loans/$loanId/_b!</div>,
})

function ContainerLayout() {
  return (
    <div className="container mx-auto mt-4">
      <Outlet />
    </div>
  )
}
