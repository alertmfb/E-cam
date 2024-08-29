import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { returnLocationColor } from './visit-report-form'
import { useVisitReport } from '@/lib/api/visit-report/functions'
import { cn } from '@/lib/utils'

export const VisitReportData = ({ loanId }: { loanId: string }) => {
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
              {/* <VisitReportForm loanId={loanId} role={role} /> */}
              <VisitReport loanId={loanId} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const VisitReport = ({ loanId }: { loanId: string }) => {
  const { data: fetched } = useVisitReport(loanId)

  if (!fetched) {
    return <div></div>
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="bg-purple-100">
          <TableHead className="border text-black">S/N</TableHead>
          <TableHead className="border text-black">QUESTIONNAIRE</TableHead>
          <TableHead className="border text-black">LO</TableHead>
          <TableHead className="border text-black">BM/BS</TableHead>
          <TableHead className="border text-black">
            LOCATION COORDINATE (Google)
          </TableHead>
          <TableHead className="border text-black">REMARK</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetched.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell className="border">{idx + 1}</TableCell>
            <TableCell className="border">{row.questionnaire}</TableCell>
            <TableCell className="border">
              <Input readOnly className="w-28" value={fetched[idx].lo} />
            </TableCell>
            <TableCell className="border">
              <Input readOnly className="w-28" value={fetched[idx].bm} />
            </TableCell>
            <TableCell className="border">
              <Input
                readOnly
                className={cn('', returnLocationColor(idx))}
                value={fetched[idx].location}
              />
            </TableCell>
            <TableCell className="border">
              <Input readOnly value={fetched[idx].remark} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
