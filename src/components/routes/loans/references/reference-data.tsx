import { useQuery } from '@tanstack/react-query'
import { getReferences } from '@/lib/api/references/functions'
import { useAuth, useAuthUser, useUser } from '@/lib/auth/hooks'
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

export function ReferenceData({ loanId }: { loanId: string }) {
  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader className="cursor-pointer transition ease-in-out hover:scale-[1.01]">
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>References</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <DataFields loanId={loanId} />
        </CardContent>
      </Card>
    </div>
  )
}

const DataFields = ({ loanId }: { loanId: string }) => {
  const { branch_id } = useUser()

  const [fr, setFr] = useState(false)
  const [cr, setCr] = useState(false)
  const [nr, setNr] = useState(false)

  const { data } = useQuery({
    queryKey: ['references-data'],
    queryFn: () => getReferences({ loanId, branchId: branch_id.toString() }),
  })

  if (!data) {
    return <div></div>
  }

  const familyReferences = data.family_references
  const commercialReferences = data.commercial_references
  const neighbourhoodReferences = data.neighbourhood_references

  return (
    <div>
      {familyReferences.map((re, idx) => (
        <Card className="w-full shadow-md" key={idx}>
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setFr((prev) => !prev)}
          >
            <CardTitle className="text-xl flex gap-3 items-center justify-between">
              <div>Family Reference {idx + 1}</div>
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients family reference</CardDescription>
          </CardHeader>
          {fr && (
            <CardContent>
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(re).map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3"
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
      {commercialReferences.map((re, idx) => (
        <Card className="w-full shadow-md" key={idx}>
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setCr((prev) => !prev)}
          >
            <CardTitle className="text-xl flex gap-3 items-center justify-between">
              Commercial Reference {idx + 1}
              <ChevronDown />
            </CardTitle>
            <CardDescription>The clients commercial reference</CardDescription>
          </CardHeader>
          {cr && (
            <CardContent>
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(re).map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3"
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
      {neighbourhoodReferences.map((re, idx) => (
        <Card className="w-full shadow-md" key={idx}>
          <CardHeader
            className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
            onClick={() => setNr((prev) => !prev)}
          >
            <CardTitle className="text-xl flex gap-3 items-center justify-between">
              Neighbourhood Reference {idx + 1}
              <ChevronDown />
            </CardTitle>
            <CardDescription>
              The clients neighbourhood reference
            </CardDescription>
          </CardHeader>
          {nr && (
            <CardContent>
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {Object.entries(re).map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3"
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
