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
import {
  fetchRejectedApplications,
  useGetApprovedApplications,
} from '@/lib/api/loan-application/functions'
import { useAuth, useAuthSession, useAuthUser, useUser } from '@/lib/auth/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const ApprovedApplicationsTable = () => {
  const { role } = useUser()

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerRejectedTable />
    }
    // case 'branch_manager': {
    //   return <BranchManagerApprovedTable />
    // }
    // case 'executive': {
    //   return <ExecutiveApprovedTable />
    // }
    // default: {
    //   return <GeneralApprovedTable />
    // }
  }
}

const LoanOfficerRejectedTable = () => {
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
