import { useQuery } from '@tanstack/react-query'
import {
  GuarantorInfoPayload,
  fetchGuarantorInfo,
} from '@/lib/api/guarantor-info/functions'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function GuarantorInfoData(loanId: { LoanId: string }) {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const [content, setContent] = useState(false)

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
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setContent((prev) => !prev)}
          >
            <CardTitle className="text-xl">
              {' '}
              <div>Guarantor {idx + 1}</div>
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients guarantor</CardDescription>
          </CardHeader>
          {content && (
            <CardContent>
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(item as GuarantorInfoPayload).map(
                  (data, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3"
                    >
                      <Label>{data[0]}</Label>{' '}
                      <Label className="font-normal">
                        <div>{data[1]?.toString()}</div>
                      </Label>
                    </div>
                  )
                )}
              </form>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
