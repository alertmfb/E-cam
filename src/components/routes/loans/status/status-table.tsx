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

export function ApplicationStatusTable() {
  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      getLoanApplicationStatus({
        branchId: '1',
        userId: '1',
        role: 'relationship_manager',
      }),
  })

  return (
    <Table>
      <TableCaption>
        These are the applications that you have approved awaiting further
        approval
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead>Approval Amount</TableHead>
          <TableHead>Approval Comment</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell>
              {loan?.rm_approval_amount !== undefined
                ? loan?.rm_approval_amount
                : 'N0'}
            </TableCell>
            <TableCell>
              {loan?.rm_approval_comment != undefined
                ? loan?.rm_approval_comment?.slice(0, 36) + '...'
                : 'none'}
            </TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm">
                <Link
                  to="/app/loans/status/$loanId"
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
