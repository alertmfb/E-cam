import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from '@tanstack/react-router'

const applications = [
  {
    id: '1',
    loanId: 'amf-ebm-rtsk030-2024-1',
    customerName: 'Eren Yeager',
    loanOfficer: 'Joshua Kimmich',
    loanAmount: 700_000,
    date: new Date().toDateString(),
  },
  {
    id: '2',
    loanId: 'abl-ebm-mxxz$913-2024-1',
    customerName: 'James Bond',
    loanOfficer: 'Among Us',
    loanAmount: 500_000,
    date: new Date().toDateString(),
  },
]

export function IncompleteTable() {
  return (
    <Table>
      <TableCaption>
        A list of loan applications yet to be completed.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Loan Id</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Amount</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead className="text-right">Application Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.id}</TableCell>
            <TableCell>{application.loanId}</TableCell>
            <TableCell>{application.customerName}</TableCell>
            <TableCell>{application.loanAmount}</TableCell>
            <TableCell>{application.loanOfficer}</TableCell>
            <TableCell className="text-right">{application.date}</TableCell>
            <TableCell className="text-right">
              <Link
                to="/app/loans/$loanId/client-information"
                params={{ loanId: application.loanId }}
              >
                view
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}
