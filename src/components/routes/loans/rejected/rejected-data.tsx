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
import { getRejectedApplicationById } from '@/lib/api/loan-application/functions'
import { useAuthUser } from '@/lib/auth/hooks'
import type { Role } from '@/lib/auth/functions'
import { Button } from '@/components/ui/button'

export function RejectedData({ loanId }: { loanId: string }) {
  const user = useAuthUser()

  let role: Role
  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!)
  }

  const { data: loan } = useQuery({
    queryKey: ['rejected-data'],
    queryFn: () =>
      getRejectedApplicationById({
        branchId: user.branch_id.toString(),
        loanId: loanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto py-6">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Branch Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                <Badge
                  className={loan?.bm_status === 'rejected' ? 'bg-red-600' : ''}
                >
                  {loan?.bm_status}
                </Badge>
              </span>
            </div>
            <div className="w-full flex items-start justify-between gap-3">
              {/* <Label>Customer name:</Label>
              <p>{loan?.customer_name}</p> */}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-3">
            <Label>Rejection Reason:</Label>
            <p>{loan?.bm_rejection_comment ?? 'nil'}</p>
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
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                <Badge
                  className={loan?.rm_status === 'rejected' ? 'bg-red-600' : ''}
                >
                  {loan?.rm_status}
                </Badge>
              </span>
            </div>
            <div className="w-full flex items-start justify-between gap-3"></div>
          </form>
        </CardContent>
        <CardFooter className="w-full justify-start">
          <div className="flex flex-col items-start gap-3">
            <Label>Rejection Reason:</Label>
            <p>{loan?.rm_rejection_comment ?? 'nil'}</p>
          </div>
        </CardFooter>
      </Card>
      {role! === 'loan_officer' && (
        <div className="w-full flex justify-end pt-4">
          <Button className="">Edit Application</Button>
        </div>
      )}
    </div>
  )
}
