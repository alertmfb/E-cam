import {
  Table,
  TableBody,
  TableCaption,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// import { useQuery } from '@tanstack/react-query'
// import { getLoanApplicationsByBranch } from '@/lib/api/loan-application/functions'
// import { Link } from '@tanstack/react-router'
// import { Button } from '@/components/ui/button'

export function RejectedApplicationsTable() {
  return (
    <Table>
      <TableCaption>
        These are your rejected applications sent back to the loan officer
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead>Loan Amount</TableHead>
          <TableHead className="text-right">Rejection Comment</TableHead>
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {applications.data?.map((loan, idx) => (
      <TableRow key={loan.id}>
        <TableCell className="font-medium">{idx + 1}</TableCell>
        <TableCell>{loan.customer_name}</TableCell>
        <TableCell>{loan.loan_officer_name}</TableCell>
        <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
        <TableCell className="text-right">
          <Button asChild size="sm">
            <Link to="" params={{ loanId: loan.id }}>
              view
            </Link>
          </Button>
        </TableCell>
      </TableRow>
    ))} */}
      </TableBody>
    </Table>
  )
}
