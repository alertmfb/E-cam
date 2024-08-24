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
import { useCashflow } from '@/lib/api/cashflow-test/functions'
import {
  CashflowMonthData,
  DESCRIPTIONS,
  TENURE,
  TOTAL_AND_AVERAGE,
} from '@/lib/api/cashflow-test/schema'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { formatCell, formatText } from './mctTable'

export const CashflowData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Monthly Cashflow Analysis</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>One year cashflow analysis</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <div className="w-full flex flex-col gap-3">
              <DataTable loanId={loanId} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const DataTable = ({ loanId }: { loanId: string }) => {
  const { data: cashflow } = useCashflow(loanId)

  if (!cashflow) {
    return <div></div>
  }

  const { margin, months } = cashflow

  return (
    <div className="w-full space-y-4">
      <div className="font-semibold">% Margin: {margin}</div>
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-purple-100 hover:bg-purple-100">
            <TableHead className="text-black border">Description</TableHead>
            <TableHead className="text-black border">1st month</TableHead>
            <TableHead className="text-black border">2nd month</TableHead>
            <TableHead className="text-black border">3rd month</TableHead>
            <TableHead className="text-black border">4th month</TableHead>
            <TableHead className="text-black border">5th month</TableHead>
            <TableHead className="text-black border">6th month</TableHead>
            <TableHead className="text-black border">7th month</TableHead>
            <TableHead className="text-black border">8th month</TableHead>
            <TableHead className="text-black border">9th month</TableHead>
            <TableHead className="text-black border">10th month</TableHead>
            <TableHead className="text-black border">11th month</TableHead>
            <TableHead className="text-black border">12th month</TableHead>
            <TableHead className="text-black border">Total</TableHead>
            <TableHead className="text-black border">Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DESCRIPTIONS.map((description, rowIdx) => (
            <TableRow key={rowIdx} className={cn(formatCell(rowIdx))}>
              <TableCell className="border font-semibold p-1">
                {description}
              </TableCell>
              {months.slice(0, TENURE).map((month, colIdx) => (
                <TableCell className="border p-1" key={colIdx}>
                  <div
                    className={cn(
                      'w-28 h-8 flex items-center justify-end',
                      formatText(rowIdx)
                    )}
                  >
                    {month[
                      Object.keys(month)[rowIdx] as keyof CashflowMonthData
                    ] === 0
                      ? ''
                      : month[
                          Object.keys(month)[rowIdx] as keyof CashflowMonthData
                        ].toLocaleString()}
                  </div>
                </TableCell>
              ))}
              {/* TOTAL AND AVERAGE (LAST 2) */}
              {months
                .slice(months.length - TOTAL_AND_AVERAGE, months.length)
                .map((month, colIdx) => (
                  <TableCell className="border p-1" key={colIdx}>
                    <div className={cn('w-28 h-8', formatText(rowIdx))}>
                      {month[
                        Object.keys(month)[rowIdx] as keyof CashflowMonthData
                      ].toLocaleString()}
                    </div>
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
