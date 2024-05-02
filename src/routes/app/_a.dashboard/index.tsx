import {
  // BranchManagerUi,
  // LoanOfficerUi,
  RelationshipManagerUi,
} from '@/components/routes/dashboard/level'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_a/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <main className="flex flex-col h-24 pt-3">
        {/* <LoanOfficerUi /> */}
        {/* <BranchManagerUi /> */}
        <RelationshipManagerUi />
      </main>
    </div>
  )
}
