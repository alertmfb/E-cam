import { ApplicationStatusTable } from '@/components/routes/loans/status/status-table'
import { createFileRoute } from '@tanstack/react-router'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Button } from '@/components/ui/button'
// import { ChevronDown } from 'lucide-react'
import { useAuthSession } from '@/lib/auth/hooks'

// const branches = {
//   one: '1',
//   two: '2',
// }

export const Route = createFileRoute('/app/_a/loans/status/')({
  component: Status,
})

function Status() {
  const { role } = useAuthSession()
  // const { institution_id } = useAuthUser()

  // const { data: br, fetchStatus } = useQuery({
  //   queryKey: ['branches'],
  //   queryFn: () => getBranches({ institutionId: institution_id }),
  //   enabled: role === 'regional_manager',
  // })

  // const [currentBranch, setCurrentBranch] = useState<Branch>({
  //   id: '0',
  //   name: '',
  // })

  // if (fetchStatus === 'fetching') {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-xl font-semibold">Loan application status</h1>
        {/* {role === 'regional_manager' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-1"
              >
                <ChevronDown /> Select Branch
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>All Branches</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {br?.map((branch, idx) => (
                <DropdownMenuItem
                  onClick={() =>
                    setCurrentBranch({ ...branch, id: branch.id.toString() })
                  }
                  key={idx}
                >
                  {idx + 1}. {branch.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )} */}
      </div>
      <main className="flex flex-col pt-3 gap-2">
        {role === 'regional_manager' && (
          <h1 className="font-semibold">
            {/* Current Branch: {currentBranch.name} */}
          </h1>
        )}
        <ApplicationStatusTable />
      </main>
    </div>
  )
}
