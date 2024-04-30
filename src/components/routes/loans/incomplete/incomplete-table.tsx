import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchLoanApplications } from '@/lib/api/loan-application/functions'

export function IncompleteTable() {
  const { data: loanApp } = useQuery({
    queryKey: ['incomplete-loan-applications'],
    queryFn: fetchLoanApplications,
  })
  return (
    //TODO: add delete button and confirmation maodal to the table
    // TODO: add loading skeleton
    <Table>
      <TableCaption>
        A list of loan applications yet to be completed.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Customer BVN</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loanApp?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.customer_bvn}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Link
                to="/app/loans/$loanId/client-information"
                params={{ loanId: loan.id }}
              >
                view
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
