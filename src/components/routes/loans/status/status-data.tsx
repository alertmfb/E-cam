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

export function StatusData({ loanId }: { loanId: string }) {
  const loan = useQuery({
    queryKey: ['single-status'],
    queryFn: () =>
      getLoanApplicationStatusById({
        branchId: '1',
        loanId: loanId,
        role: 'relationship_manager',
        userId: '1',
      }),
  })

  return (
    <div>
      {loan.data?.map((loan, idx) => (
        <div
          className="w-full flex flex-col items-center gap-4 flex-wrap flex-auto"
          key={idx}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Relationship Manager</CardTitle>
              <CardDescription>
                Your activity on this loan applicaton
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="w-full flex items-start flex-col gap-6">
                <div className="w-full flex items-start gap-3 justify-between">
                  <Label>Approval Status</Label>
                  <Badge className="bg-green-700">Approved</Badge>
                </div>
                <div className="w-full flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold">Approval Amount</span>
                  <p>
                    N
                    {new Intl.NumberFormat().format(
                      Number(loan.rm_approval_amount)
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Label>Approval Comment:</Label>
                  <p>{loan.rm_approval_comment}</p>
                </div>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Branch Manager</CardTitle>
              <CardDescription>
                The branch manager's activity on this loan applicaton
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="w-full flex items-start flex-col gap-6">
                <div className="w-full flex items-start gap-3 justify-between">
                  <Label>Approval Status</Label>
                  <Badge className="bg-blue-700">pending</Badge>
                </div>
                <div className="w-full flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold">Approval Amount</span>
                  <p>N0.00</p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Label>Approval Comment:</Label>
                  <p></p>
                </div>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )
}
