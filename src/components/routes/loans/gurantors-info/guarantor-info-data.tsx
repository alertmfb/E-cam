import { useQuery } from '@tanstack/react-query'
import {
  GuarantorInfoPayload,
  fetchGuarantorInfo,
} from '@/lib/api/guarantor-info/functions'
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

export function GuarantorInfoData(loanId: { LoanId: string }) {
  const user = useAuthUser()

  let role: Role
  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!)
  }

  const { data: info, isPending } = useQuery({
    queryKey: ['guarantor-info-data'],
    queryFn: () =>
      fetchGuarantorInfo({
        loanId: loanId.LoanId,
        role: role,
        userId: user.id.toString(),
      }),
  })

  if (isPending) {
    return <div>...Loading</div>
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      {info?.map((item, idx) => (
        <Card className="w-full shadow-md" key={idx}>
          <CardHeader>
            <CardTitle>Guarantor {idx + 1}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {Object.entries(item as GuarantorInfoPayload).map((data, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3"
                >
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
      ))}
    </div>
  )
}
