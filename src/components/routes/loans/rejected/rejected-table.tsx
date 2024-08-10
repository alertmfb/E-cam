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
import { useAuth, useAuthSession, useAuthUser, useUser } from '@/lib/auth/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function RejectedApplicationsTable() {
  const { role } = useUser()

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerRejectedTable />
    }
    case 'branch_manager': {
      return <BranchManagerRejectedTable />
    }
    case 'executive': {
      return <ExecutiveRejectedTable />
    }
    default: {
      return <GeneralRejectedTable />
    }
  }
}

const LoanOfficerRejectedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id } = useUser()

  const applications = useQuery({
    queryKey: ['lo-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        branchId: branch_id.toString(),
        userId: userId!,
        role: role,
      }),
  })
  return (
    <Table>
      <TableCaption>
        {role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : role === 'relationship_manager'
            ? 'The are the rejected loan applications for your branch'
            : ''}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
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
                <Link
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: branch_id.toString(),
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

const BranchManagerRejectedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id } = useUser()

  const applications = useQuery({
    queryKey: ['bm-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        branchId: branch_id.toString(),
        userId: userId!,
        role: role,
      }),
  })
  return (
    <Table>
      <TableCaption>
        {role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : role === 'relationship_manager'
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
                    branchId: branch_id.toString(),
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

const GeneralRejectedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id, institution_id } = useUser()

  const applications = useQuery({
    queryKey: ['general-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        institutionId: institution_id.toString(),
        branchId: branch_id.toString(),
        userId: userId!,
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        {role === 'loan_officer'
          ? 'These are your loan applications rejected from other officials'
          : role === 'relationship_manager'
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
            <TableCell>{loan.branch?.toUpperCase()}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: branch_id.toString(),
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

const ExecutiveRejectedTable = () => {
  const { userId } = useAuth()
  const { role } = useUser()

  const applications = useQuery({
    queryKey: ['general-rejected-applications'],
    queryFn: () =>
      fetchRejectedApplications({
        institutionId: 'exec',
        branchId: 'exec',
        userId: userId!,
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>Loan applications you have rejected</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Institution</TableHead>
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
            <TableCell>{loan.institution}</TableCell>
            <TableCell>{loan.branch}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/rejected/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: 'exec',
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
