import { useQuery } from '@tanstack/react-query'
import {
  GuarantorInfoPayload,
  fetchGuarantorInfo,
} from '@/lib/api/guarantor-info/functions'
import { useAuth, useUser } from '@/lib/auth/hooks'
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
  const { role } = useUser()
  const { userId } = useAuth()

  const [content, setContent] = useState(false)

  const { data: info, isPending } = useQuery({
    queryKey: ['guarantor-info-data'],
    queryFn: () =>
      fetchGuarantorInfo({
        loanId: loanId.LoanId,
        role: role,
        userId: userId!,
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
            <CardTitle className="text-xl flex items-center gap-3 justify-between">
              {' '}
              <div>Guarantor {idx + 1}</div>
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients guarantor's data</CardDescription>
          </CardHeader>
          {content && (
            <CardContent>
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(item as GuarantorInfoPayload)
                  .slice(2, Object.entries(item).length - 2)
                  .map((data, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 flex-1 flex-wrap"
                    >
                      <Label className="capitalize">
                        {data[0].split('_').join(' ')}
                      </Label>{' '}
                      <Label className="font-normal text-wrap border w-fit max-w-56 text-right p-1 rounded-md capitalize text-base bg-gray-50">
                        <div>{data[1]?.toString()}</div>
                      </Label>
                    </div>
                  ))}
              </form>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
