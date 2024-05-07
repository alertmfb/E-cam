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
import { getLoanApplicationStatusById } from '@/lib/api/loan-application/functions'
import { useAuthUser } from '@/lib/auth/hooks'
import type { Role } from '@/lib/auth/functions'

export function StatusData({
  loanId,
  branchId,
}: {
  loanId: string
  branchId: string
}) {
  const user = useAuthUser()

  let role: Role
  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!)
  }

  const { data: loan } = useQuery({
    queryKey: ['single-status'],
    queryFn: () =>
      getLoanApplicationStatusById({
        branchId: branchId,
        loanId: loanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
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
                pending
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
          <CardTitle>Relationship Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start gap-3 justify-between">
              <Badge
                className={
                  loan?.rm_status === 'approved'
                    ? 'bg-green-700'
                    : loan?.rm_status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-blue-600'
                }
              >
                {loan?.rm_status}
              </Badge>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                Approved Amount to be processed:
              </span>
              <p>
                N
                {new Intl.NumberFormat().format(
                  Number(loan?.rm_approval_amount)
                )}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Approval Comment:</Label>
            <p>{loan?.rm_approval_comment}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
