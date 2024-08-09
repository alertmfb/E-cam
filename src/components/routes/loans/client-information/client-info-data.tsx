import { useQuery } from '@tanstack/react-query'
import {
  ClientInfoPayload,
  fetchClientInfo,
} from '@/lib/api/client-info/functions'
import { useAuth, useUser } from '@/lib/auth/hooks'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function ClientInfoData(loanId: { LoanId: string }) {
  const { role } = useUser()
  const { userId } = useAuth()

  const [content, setContent] = useState(false)

  const info = useQuery({
    queryKey: ['client-info-data'],
    queryFn: () =>
      fetchClientInfo({
        loanId: loanId.LoanId,
        role: role,
        userId: userId!,
      }),
  })

  if (info.isPending) {
    return <div>Loading...</div>
  }

  if (!info.data) {
    return <div></div>
  }
  const infoArray = Object.entries(info.data)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Client Information</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Details about the client</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {infoArray.slice(2, infoArray.length - 2).map((data, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 flex-1 flex-wrap"
                >
                  <Label
                    className={`capitalize ${idx === 24 && 'text-blue-500 font-bold uppercase'}`}
                  >
                    {data[0].split('_').join(' ')}
                  </Label>
                  <Label
                    className={`font-normal text-wrap border w-fit max-w-56 text-right p-1 rounded-md capitalize text-base bg-gray-50 ${idx === 24 && 'text-blue-500 font-bold'}`}
                  >
                    {formatValue(data[1], idx)}
                  </Label>
                </div>
              ))}
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const formatValue = (item: string | Date, idx: number): string => {
  if (item === '' || item === null) {
    return ''
  }

  if (
    idx === 24 ||
    idx === 27 ||
    idx === 39 ||
    idx === 31 ||
    idx === 34 ||
    idx === 40 ||
    idx === 43 ||
    idx === 20 ||
    idx === 20 ||
    idx === 23 ||
    idx === 38 ||
    idx === 40 ||
    idx === 43
  ) {
    return '₦' + parseFloat(item as string).toLocaleString()
  }

  return item.toString()
}
