import { useQuery } from '@tanstack/react-query'
import {
  ClientInfoPayload,
  fetchClientInfo,
} from '@/lib/api/client-info/functions'
import { useAuthUser } from '@/lib/auth/hooks'
import { Role } from '@/lib/auth/functions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function ClientInfoData(loanId: { LoanId: string }) {
  const user = useAuthUser()

  let role: Role
  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!)
  }

  const info = useQuery({
    queryKey: ['client-info-data'],
    queryFn: () =>
      fetchClientInfo({
        loanId: loanId.LoanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  if (info.isPending) {
    return <div>...Loading</div>
  }

  const infoArray = Object.entries(info?.data as ClientInfoPayload)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {infoArray.map((data, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3">
                <Label>{data[0]}</Label>{' '}
                <Label className="font-normal">
                  <div>{data[1]?.toString()}</div>
                </Label>
              </div>
            ))}
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
