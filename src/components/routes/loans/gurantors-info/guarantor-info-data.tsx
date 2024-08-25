import { useQuery } from '@tanstack/react-query'
import {
  GuarantorInfoPayload,
  fetchGuarantorInfo,
  useGuarantorProfile,
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
import { Button } from '@/components/ui/button'

export function GuarantorInfoData({ loanId }: { loanId: string }) {
  const { role } = useUser()
  const { userId } = useAuth()

  const [content, setContent] = useState(false)
  const [contentT, setContentT] = useState(false)

  const { data: info, isPending } = useQuery({
    queryKey: ['guarantor-info-data'],
    queryFn: () =>
      fetchGuarantorInfo({
        loanId: loanId,
        role: role,
        userId: userId!,
      }),
  })

  const { data: image } = useGuarantorProfile(loanId)

  if (!info) {
    return <div></div>
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader className="cursor-pointer transition ease-in-out hover:scale-[1.01]">
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Guarantors</div>
          </CardTitle>
          <CardDescription>The client's guarantors</CardDescription>
        </CardHeader>

        <CardContent>
          <DataFields loanId={loanId} />
        </CardContent>
      </Card>
    </div>
  )
}

const DataFields = ({ loanId }: { loanId: string }) => {
  const { role } = useUser()
  const { userId } = useAuth()

  const [content, setContent] = useState(false)
  const [contentT, setContentT] = useState(false)

  const { data: info, isPending } = useQuery({
    queryKey: ['guarantor-info-data'],
    queryFn: () =>
      fetchGuarantorInfo({
        loanId: loanId,
        role: role,
        userId: userId!,
      }),
  })

  const { data: image } = useGuarantorProfile(loanId)

  if (!info) {
    return <div></div>
  }

  return (
    <div>
      {info[0] && (
        <Card className="w-full shadow-md">
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setContent((prev) => !prev)}
          >
            <CardTitle className="text-xl flex items-center gap-3 justify-between">
              {' '}
              <div>Guarantor 1</div>
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients guarantor's data</CardDescription>
          </CardHeader>
          {content && (
            <CardContent>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(info[0] as GuarantorInfoPayload)
                  .slice(2, Object.entries(info[0]).length - 2)
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
                <div className="font-semibold text-sm flex items-center gap-3">
                  <span>Guarantor's Image: </span>
                  {image && (
                    <Button variant="link">
                      <a
                        href={image.url_one}
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
      )}

      {info[1] && (
        <Card className="w-full shadow-md">
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setContentT((prev) => !prev)}
          >
            <CardTitle className="text-xl flex items-center gap-3 justify-between">
              {' '}
              <div>Guarantor 2</div>
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients guarantor's data</CardDescription>
          </CardHeader>
          {contentT && (
            <CardContent>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(info[1] as GuarantorInfoPayload)
                  .slice(2, Object.entries(info[1]).length - 2)
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
                <div className="font-semibold text-sm flex items-center gap-3">
                  <span>Guarantor's Image: </span>
                  {image && (
                    <Button variant="link">
                      <a
                        href={image.url_two}
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
      )}
    </div>
  )
}
