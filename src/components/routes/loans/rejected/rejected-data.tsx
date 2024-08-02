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
  getExecRejectedApplicationById,
  getRejectedApplicationById,
} from '@/lib/api/loan-application/functions'
import { useAuth, useUser } from '@/lib/auth/hooks'
// import { Button } from '@/components/ui/button'

export function RejectedData({
  loanId,
  branchId,
}: {
  loanId: string
  branchId: string
}) {
  const { role } = useUser()

  switch (role) {
    case 'executive': {
      return <ExecutiveRejectedData loanId={loanId} />
    }

    default: {
      return <GeneralRejectedData loanId={loanId} branchId={branchId} />
    }
  }
}

function GeneralRejectedData({
  loanId,
  branchId,
}: {
  loanId: string
  branchId: string
}) {
  const { userId } = useAuth()
  const { role, institution_id } = useUser()

  const { data: loan } = useQuery({
    queryKey: ['rejected-data'],
    queryFn: () =>
      getRejectedApplicationById({
        institutionId: institution_id,
        branchId: branchId,
        loanId: loanId,
        role: role,
        userId: userId!,
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
            <div className="w-full flex items-start justify-between gap-3"></div>
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
          <CardTitle>Regional Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                <Badge
                  className={
                    loan?.reg_status === 'rejected' ? 'bg-red-600' : ''
                  }
                >
                  {loan?.reg_status}
                </Badge>
              </span>
            </div>
            <div className="w-full flex items-start justify-between gap-3"></div>
          </form>
        </CardContent>
        <CardFooter className="w-full justify-start">
          <div className="flex flex-col items-start gap-3">
            <Label>Rejection Reason:</Label>
            <p>{loan?.reg_rejection_comment ?? 'nil'}</p>
          </div>
        </CardFooter>
      </Card>
      {/* {role! === 'loan_officer' && (
        <div className="w-full flex justify-end pt-4">
          <Button className="">Edit Application</Button>
        </div>
      )} */}
    </div>
  )
}

function ExecutiveRejectedData({ loanId }: { loanId: string }) {
  const { userId } = useAuth()
  const { role } = useUser()

  const { data: loan } = useQuery({
    queryKey: ['rejected-data'],
    queryFn: () =>
      getExecRejectedApplicationById({
        loanId: loanId,
        role: role,
        userId: userId!,
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
            <div className="w-full flex items-start justify-between gap-3"></div>
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
          <CardTitle>Regional Manager</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full flex items-start flex-col gap-6">
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                <Badge
                  className={
                    loan?.reg_status === 'rejected' ? 'bg-red-600' : ''
                  }
                >
                  {loan?.reg_status}
                </Badge>
              </span>
            </div>
            <div className="w-full flex items-start justify-between gap-3"></div>
          </form>
        </CardContent>
        <CardFooter className="w-full justify-start">
          <div className="flex flex-col items-start gap-3">
            <Label>Rejection Reason:</Label>
            <p>{loan?.reg_rejection_comment ?? 'nil'}</p>
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
            <div className="w-full flex items-start justify-between gap-3">
              <span className="text-sm font-semibold">
                <Badge
                  className={
                    loan?.final_approval === 'rejected' ? 'bg-red-600' : ''
                  }
                >
                  {loan?.final_approval}
                </Badge>
              </span>
            </div>
            <div className="w-full flex items-start justify-between gap-3"></div>
          </form>
        </CardContent>
        <CardFooter className="w-full justify-start">
          <div className="flex flex-col items-start gap-3">
            <Label>Rejection Reason:</Label>
            <p>{loan?.final_rejection_comment ?? 'nil'}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
