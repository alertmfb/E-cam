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
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function RejectedApplicationsTable() {
  const { role } = useAuthSession()

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerRejectedTable />
    }
    case 'branch_manager': {
      return <BranchManagerRejectedTable />
    }
    default: {
      return <GeneralRejectedTable />
    }
  }
}

export function LoanOfficerRejectedTable() {
  const auth = useAuthSession()
  const user = useAuthUser()

  const applications = useQuery({
    queryKey: ['lo-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: auth.role,
      }),
  })
  return (
    <Table>
      <TableCaption>
        {auth.role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : auth.role === 'relationship_manager'
            ? 'The are the rejected loan applications for your branch'
            : ''}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
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
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: user.branch_id.toString(),
                  }}
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
export function BranchManagerRejectedTable() {
  const auth = useAuthSession()
  const user = useAuthUser()

  const applications = useQuery({
    queryKey: ['bm-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: auth.role,
      }),
  })
  return (
    <Table>
      <TableCaption>
        {auth.role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : auth.role === 'relationship_manager'
            ? 'The are the rejected loan applications for your branch'
            : ''}
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
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: user.branch_id.toString(),
                  }}
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

export function GeneralRejectedTable() {
  const user = useAuthUser()
  const auth = useAuthSession()

  const applications = useQuery({
    queryKey: ['general-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        institutionId: user.institution_id.toString(),
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: auth.role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        {auth.role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : auth.role === 'relationship_manager'
            ? 'The are the rejected loan applications for your branch'
            : ''}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.branch}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: user.branch_id.toString(),
                  }}
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
