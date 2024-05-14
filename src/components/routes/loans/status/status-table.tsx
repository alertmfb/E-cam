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
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'

export function ApplicationStatusTable() {
  const { role } = useAuthSession()

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerStatusTable />
    }
    case 'branch_manager': {
      return <BranchManagerStatusTable />
    }
    case 'executive': {
      return <ExecutiveStatusTable />
    }
    default: {
      return <GeneralStatusTable />
    }
  }
}

export function LoanOfficerStatusTable() {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      getLoanApplicationStatus({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: role,
      }),
  })

  if (applications.fetchStatus === 'fetching') {
    return <div>Loading...</div>
  }

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
                  to="/app/loans/status/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: user.branch_id.toString(),
                  }}
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

export function BranchManagerStatusTable() {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const applications = useQuery({
    queryKey: ['application-status'],
    queryFn: () =>
      getLoanApplicationStatus({
        branchId: user.branch_id.toString(),
        userId: user.id.toString(),
        role: role,
      }),
  })

  if (applications.fetchStatus === 'fetching') {
    return <div>Loading...</div>
  }

  return (
    <Table>
      <TableCaption>Processed applications for your branch</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.loan_officer}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>

            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link to="/app/loans/$loanId/data" params={{ loanId: loan.id }}>
                  view loan
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/status/$loanId/$branchId"
                  params={{
                    loanId: loan.id,
                    branchId: user.branch_id.toString(),
                  }}
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
  const { institution_id, branch_id, id } = useAuthUser()
  const { role } = useAuthSession()

  const applications = useQuery({
    queryKey: ['application-status-id'],
    queryFn: () =>
      getLoanApplicationStatus({
        institutionId: institution_id.toString(),
        branchId: branch_id.toString(),
        userId: id.toString(),
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        These are pending applications for all the branches
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.branch}</TableCell>
            <TableCell>{loan.loan_officer}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>

            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link to="/app/loans/$loanId/data" params={{ loanId: loan.id }}>
                  view loan
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/status/$loanId/$branchId"
                  params={{ loanId: loan.id, branchId: branch_id.toString() }}
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

export function ExecutiveStatusTable() {
  const { id } = useAuthUser()
  const { role } = useAuthSession()

  const applications = useQuery({
    queryKey: ['application-status-id'],
    queryFn: () =>
      getLoanApplicationStatus({
        institutionId: id.toString(),
        branchId: id.toString(),
        userId: id.toString(),
        role: role,
      }),
  })

  return (
    <Table>
      <TableCaption>
        These are the pending and approved applications for all the branches
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Loan Officer</TableHead>
          <TableHead>Application Date</TableHead>
          {role === 'executive' ? <TableHead>Final Approval</TableHead> : ''}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.data?.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.institution}</TableCell>
            <TableCell>{loan.branch?.toUpperCase()}</TableCell>
            <TableCell>{loan.loan_officer}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>

            {role === 'executive' ? (
              <TableCell className="font-semibold">
                {loan.final_approval}
              </TableCell>
            ) : (
              ''
            )}
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link to="/app/loans/$loanId/data" params={{ loanId: loan.id }}>
                  view loan
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/status/$loanId/$branchId"
                  params={{ loanId: loan.id, branchId: id.toString() }}
                >
                  view approvals
                </Link>
              </Button>
              {loan.final_approval === 'approved' && (
                <Button asChild variant="link">
                  <a href="/template.docx" download="Offer Letter Template">
                    download letter
                  </a>
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
