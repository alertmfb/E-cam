import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { VisitReportForm } from './visit-report-form'
import { useUser } from '@/lib/auth/hooks'

export const VisitReportData = ({ loanId }: { loanId: string }) => {
  const { role } = useUser()
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Visit Report</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Visit report data</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <div className="w-full flex flex-col gap-3">
              <VisitReportForm loanId={loanId} role={role} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
