import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetApprovedApplications } from '@/lib/api/loan-application/functions'
import { useAuth, useUser } from '@/lib/auth/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const ApprovedApplicationsTable = () => {
  const { role } = useUser()

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerApprovedTable />
    }
    case 'branch_manager': {
      return <BranchManagerApprovedTable />
    }
    case 'regional_manager': {
      return <RegionalManagerApprovedTable />
    }
    case 'executive': {
      return <ExecutiveApprovedTable />
    }
    default: {
      return <div>No Data</div>
    }
  }
}

const LoanOfficerApprovedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id, institution_id } = useUser()

  const applications = useGetApprovedApplications({
    userId: userId!,
    role,
    branchId: branch_id.toString(),
    institutionId: institution_id,
  })

  if (!applications) {
    return <div>...</div>
  }

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/data"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  view
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/loan-cert"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  Offer Letter
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const BranchManagerApprovedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id, institution_id } = useUser()

  const applications = useGetApprovedApplications({
    userId: userId!,
    role,
    branchId: branch_id.toString(),
    institutionId: institution_id,
  })

  if (!applications) {
    return <div>...</div>
  }

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Loan Officer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/data"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  view
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/loan-cert"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  Offer Letter
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const RegionalManagerApprovedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id, institution_id } = useUser()

  const applications = useGetApprovedApplications({
    userId: userId!,
    role,
    branchId: branch_id.toString(),
    institutionId: institution_id,
  })

  if (!applications) {
    return <div>...</div>
  }

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Loan Officer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((loan, idx) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{loan.customer_name}</TableCell>
            <TableCell>{loan.branch}</TableCell>
            <TableCell>{loan.loan_officer_name}</TableCell>
            <TableCell>{new Date(loan.created_at).toDateString()}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/data"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  view
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/loan-cert"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  Offer Letter
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const ExecutiveApprovedTable = () => {
  const { userId } = useAuth()
  const { role, branch_id, institution_id } = useUser()

  const applications = useGetApprovedApplications({
    userId: userId!,
    role,
    branchId: branch_id.toString(),
    institutionId: institution_id,
  })

  if (!applications) {
    return <div>...</div>
  }

  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Loan Officer Name</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((loan, idx) => (
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
                  to="/app/loans/$loanId/data"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  view
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link
                  to="/app/loans/$loanId/loan-cert"
                  params={{
                    loanId: loan.id,
                  }}
                >
                  Offer Letter
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
