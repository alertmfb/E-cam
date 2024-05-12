import { RejectedApplicationsTable } from '@/components/routes/loans/rejected/rejected-table'
import { createFileRoute } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useAuthSession } from '@/lib/auth/hooks'

const branches = {
  one: '1',
  two: '2',
}

export const Route = createFileRoute('/app/_a/loans/rejected/')({
  component: Rejected,
})

function Rejected() {
  const { role } = useAuthSession()

  const [currentBranch, setCurrentBranch] =
    useState<keyof typeof branches>('one')

  return (
    <div className="w-full flex flex-col px-4 gap-3 pt-10">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-xl font-semibold">Rejected applications</h1>
        {role === 'regional_manager' && (
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
              <DropdownMenuItem onClick={() => setCurrentBranch('one')}>
                One
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentBranch('two')}>
                Two
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <main className="flex flex-col pt-3 gap-2">
        {role === 'regional_manager' && (
          <h1 className="font-semibold">Current Branch: {currentBranch}</h1>
        )}
        <RejectedApplicationsTable
          branchId={branches[currentBranch]}
          key={currentBranch}
        />
      </main>
    </div>
  )
}
