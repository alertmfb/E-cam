import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import { useQuery } from '@tanstack/react-query'
import {
  getExecLoanApplicationStatusById,
  getLoanApplicationStatusById,
} from '@/lib/api/loan-application/functions'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'

export function StatusData({
  loanId,
  branchId,
}: {
  loanId: string
  branchId: string
}) {
  const { role } = useAuthSession()

  switch (role) {
    case 'executive': {
      return <ExecutiveStatusData loanId={loanId} />
    }

    default: {
      return <GeneralStatusData loanId={loanId} branchId={branchId} />
    }
  }
}

function GeneralStatusData({
  loanId,
  branchId,
}: {
  loanId: string
  branchId: string
}) {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const { data: loan } = useQuery({
    queryKey: ['single-status'],
    queryFn: () =>
      getLoanApplicationStatusById({
        institutionId: user.institution_id.toString(),
        branchId: branchId,
        loanId: loanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Branch Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.bm_status === 'approved'
                    ? 'bg-green-700'
                    : loan?.bm_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.bm_status}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Approved Amount to be processed:
              </span>
              <p>
                {' '}
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.bm_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Approval Comment:</Label>
            <p>{loan?.bm_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Regional Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.reg_status === 'approved'
                    ? 'bg-green-700'
                    : loan?.reg_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.reg_status}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Approved Amount to be processed:
              </span>
              <p>
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.reg_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Approval Comment:</Label>
            <p>{loan?.reg_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Executive</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.final_approval === 'approved'
                    ? 'bg-green-700'
                    : loan?.reg_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.final_approval}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Final Approval Amount:
              </span>
              <p>
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.final_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Final Approval Comment:</Label>
            <p>{loan?.final_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function ExecutiveStatusData({ loanId }: { loanId: string }) {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const { data: loan } = useQuery({
    queryKey: ['single-status'],
    queryFn: () =>
      getExecLoanApplicationStatusById({
        loanId: loanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Branch Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.bm_status === 'approved'
                    ? 'bg-green-700'
                    : loan?.bm_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.bm_status}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Approved Amount to be processed:
              </span>
              <p>
                {' '}
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.bm_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Approval Comment:</Label>
            <p>{loan?.bm_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Regional Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.reg_status === 'approved'
                    ? 'bg-green-700'
                    : loan?.reg_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.reg_status}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Approved Amount to be processed:
              </span>
              <p>
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.reg_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Approval Comment:</Label>
            <p>{loan?.reg_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Executive</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.final_approval === 'approved'
                    ? 'bg-green-700'
                    : loan?.reg_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.final_approval}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Final Approval Amount:
              </span>
              <p>
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.final_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Final Approval Comment:</Label>
            <p>{loan?.final_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
