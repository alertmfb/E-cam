import { UserTable } from '@/components/routes/admin/user-table'
import { useUser } from '@/lib/auth/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/app/_a/admin/users')({
  component: Users,
})

function Users() {
  const { role } = useUser()

  const navigate = useNavigate()

  if (role !== 'admin') {
    return <div>Not Found</div>
  }

  return (
    <div className="container w-full flex flex-col gap-3 p-3">
      <div className="flex items-center gap-5 justify-between flex-1 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => navigate({ to: '/app/dashboard', replace: true })}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
      </div>
      <UserTable />
    </div>
  )
}
