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
import { fetchRejectedApplications } from '@/lib/api/loan-application/functions'
// import type { UserResponse } from '@/lib/auth/functions'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function RejectedApplicationsTable() {
  const auth = useAuthSession()
  const user = useAuthUser()

  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      fetchRejectedApplications({
        branchId: user.branch_id.toString(),
        userId: '1',
        role: auth.role,
      }),
  })
  return (
    <Table>
      <TableCaption>
        These are your loan applications rejected from other officials
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/rejected/$loanId"
                  params={{ loanId: loan.id }}
                >
                  view
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
