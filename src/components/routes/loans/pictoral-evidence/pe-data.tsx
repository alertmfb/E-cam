import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetColPicture } from '@/lib/api/verification-picture/functions'
import { ChevronDown, Eye } from 'lucide-react'
import { useState } from 'react'

export const PictoralEvidenceData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Pictoral Evidence</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Verification pictures</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <DataFields loanId={loanId} />
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const DataFields = ({ loanId }: { loanId: string }) => {
  const data = useGetColPicture(loanId)

  if (!data) {
    return <div></div>
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* <CollateralPledgeTable colPledge={data} /> */}
      <div className="w-full flex items-center gap-3 flex-1 flex-wrap">
        {data.pic_one && (
          <Button
            variant="outline"
            className="flex items-center justify-start h-fit gap-3"
          >
            <Eye className="min-w-10" />
            <a
              href={data.pic_one}
              target="_blank"
              rel="nopoener-noreferrer"
              className="text-wrap"
            >
              Collateral Picture 1
            </a>
          </Button>
        )}
        {data.ver_one && (
          <Button
            variant="outline"
            className="flex items-center justify-start h-fit gap-3"
          >
            <Eye className="min-w-10" />
            <a
              href={data.ver_one}
              target="_blank"
              rel="nopoener-noreferrer"
              className="text-wrap"
            >
              Verification Picture (Loan Officer and Risk Supervisor/Superior
              staff)
            </a>
          </Button>
        )}
      </div>

      <div className="w-full flex items-center gap-3 flex-1 flex-wrap">
        {data.pic_two && (
          <Button
            variant="outline"
            className="flex items-center justify-start h-fit gap-3"
          >
            <Eye className="min-w-10" />
            <a
              href={data.pic_two}
              target="_blank"
              rel="nopoener-noreferrer"
              className="text-wrap"
            >
              Collateral Picture 2
            </a>
          </Button>
        )}
        {data.ver_two && (
          <Button
            variant="outline"
            className="flex items-center justify-start h-fit gap-3"
          >
            <Eye className="min-w-10" />
            <a
              href={data.ver_two}
              target="_blank"
              rel="nopoener-noreferrer"
              className="text-wrap"
            >
              Customer Business Place (Loan Officer and customer)
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
