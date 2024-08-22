import { Role } from '@/lib/auth'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { useState } from 'react'
import { VisitReportData, visitReport } from '@/lib/api/visit-report/questions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  useUploadVisitReport,
  useVisitReport,
} from '@/lib/api/visit-report/functions'

export const VisitReportForm = ({
  loanId,
  role,
}: {
  loanId: string
  role: Role
}) => {
  const [vR, setVr] = useState<VisitReportData[]>(visitReport)

  const updateCell = (
    idx: number,
    key: keyof VisitReportData,
    value: string
  ) => {
    setVr((prev) =>
      prev.map((row, i) => (idx === i ? { ...prev[idx], [key]: value } : row))
    )
  }

  const { data: fetched } = useVisitReport(loanId)
  const loadFetched = () => {
    if (fetched) {
      setVr(fetched)
    }
  }

  const uploadVisitReport = useUploadVisitReport()
  const upload = () => {
    uploadVisitReport.mutate({ loanId: loanId, visitReport: vR })
  }

  return (
    <div className="w-full space-y-4 pb-4">
      {fetched && (
        <Button onClick={loadFetched} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
      <div className="p-2 text-lg font-semibold">
        NOTE: Provide the loation coordinates where the column is green.
      </div>
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
          {vR.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">{row.questionnaire}</TableCell>
              <TableCell className="border">
                <Input
                  onChange={(e) => updateCell(idx, 'lo', e.target.value)}
                  readOnly={role !== 'loan_officer'}
                  className="w-28"
                  value={vR[idx].lo}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  onChange={(e) => updateCell(idx, 'bm', e.target.value)}
                  readOnly={role !== 'branch_manager'}
                  className="w-28"
                  value={vR[idx].bm}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  onChange={(e) => updateCell(idx, 'location', e.target.value)}
                  className={cn('', returnLocationColor(idx))}
                  value={vR[idx].location}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  onChange={(e) => updateCell(idx, 'remark', e.target.value)}
                  value={vR[idx].remark}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-x-4">
        {/* <Button variant={'outline'} onClick={() => console.log(vR)}>
          Log
        </Button> */}

        <Button onClick={upload}>Save</Button>
      </div>
    </div>
  )
}

export const returnLocationColor = (idx: number): string => {
  if (idx === 0 || idx === 1 || idx === 4 || idx === 5) {
    return 'bg-green-100'
  } else {
    return 'bg-gray-100'
  }
}
