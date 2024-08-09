import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetGraPicture } from '@/lib/api/guarantor-verification/functions'
import { ChevronDown, Eye } from 'lucide-react'
import { useState } from 'react'

export const GuarantorVerificationData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  const data = useGetGraPicture(loanId)

  if (!data?.id) {
    return <div></div>
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Guarantor's Biz Verification</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Verification pictures</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <form className="w-full flex flex-col gap-3">
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
                      Guarantor one business pictures
                    </a>
                  </Button>
                )}
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
                      Guarantor two business picures
                    </a>
                  </Button>
                )}
              </div>

              <div className="w-full flex items-center gap-3 flex-1 flex-wrap">
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
                      Verifcation picture (Guarantor, Loan officer and Risk
                      Supervisor/Superior staff)
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
                      Verifcation picture (Guarantor, Loan officer and Risk
                      Supervisor/Superior staff)
                    </a>
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
