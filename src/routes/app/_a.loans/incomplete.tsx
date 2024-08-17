import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { IncompleteTable } from '@/components/routes/loans/incomplete/incomplete-table'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/incomplete')({
  component: Incomplete,
})

function Incomplete() {
  const navigate = useNavigate()
  return (
    <div className="container w-full flex flex-col px-4 gap-5 pt-10">
      <div className="w-full flex items-center gap-3">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/dashboard', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold">Incomplete</h1>
      </div>
      <IncompleteTable />
    </div>
  )
}
