import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { getLoanApplicationStatus } from '@/lib/api/loan-application/functions'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuthUser } from '@/lib/auth/hooks'

type Role = 'loan_officer' | 'relationship_manager'

export function ApplicationStatusTable() {
  let role

  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!) as Role
  }

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerStatusTable />
    }
    default: {
      return <GeneralStatusTable />
    }
  }
}

export function LoanOfficerStatusTable() {
  const user = useAuthUser()

  let role: Role

  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!) as Role
  }
  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      getLoanApplicationStatus({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        These are your processed applications awaiting approvals
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>

            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link to="/app/loans/$loanId/data" params={{ loanId: loan.id }}>
                  view loan
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/status/$loanId"
                  params={{ loanId: loan.id }}
                >
                  view approvals
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function GeneralStatusTable() {
  const user = useAuthUser()

  let role: Role

  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!) as Role
  }
  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      getLoanApplicationStatus({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        These are the pending applications for your branch
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>

            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link to="/app/loans/$loanId/data" params={{ loanId: loan.id }}>
                  view loan
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/status/$loanId"
                  params={{ loanId: loan.id }}
                >
                  view approvals
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
