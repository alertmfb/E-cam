import { useQuery } from '@tanstack/react-query'
import {
  fetchClientInfo,
  useClientImage,
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
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

export function ClientInfoData({ loanId }: { loanId: string }) {
  const { role } = useUser()
  const { userId } = useAuth()

  const [content, setContent] = useState(false)

  const info = useQuery({
    queryKey: ['client-info-data'],
    queryFn: () =>
      fetchClientInfo({
        loanId: loanId,
        role: role,
        userId: userId!,
      }),
  })

  const { data: image } = useClientImage(loanId)

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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
              <div className="font-semibold text-sm flex items-center gap-3">
                <span>Client's Image: </span>
                {image && (
                  <Button variant="link">
                    <a
                      href={image.url}
                      rel="nopoener-noreferrer"
                      target="_blank"
                    >
                      View
                    </a>
                  </Button>
                )}
              </div>
            </div>
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

  if (idx === 28 || idx === 29) {
    return format(new Date(item), 'dd-MM-yyyy')
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
