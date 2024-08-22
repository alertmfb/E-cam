import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CashflowMonthData,
  cashFlowMonths,
  DESCRIPTIONS,
} from '@/lib/api/cashflow-test/schema'

export const CashflowTable = ({ loanId }: { loanId: string }) => {
  const [months, setMonths] = useState<CashflowMonthData[]>(cashFlowMonths)

  const updateCell = (
    idx: number,
    key: keyof CashflowMonthData,
    value: number
  ) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        idx === i ? { ...prev[idx], [key]: value } : month
      )
    )
  }

  return (
    <div className="w-full space-y-4 pb-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-purple-100">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {months.map((month, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{DESCRIPTIONS[idx]}</TableCell>
              {months.map((month, i) => (
                <TableCell className="border" key={i}>
                  <Input
                    className="w-40"
                    onChange={(e) =>
                      updateCell(
                        i,
                        Object.keys(month)[idx] as keyof CashflowMonthData,
                        e.target.value === '' ? 0 : parseFloat(e.target.value)
                      )
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell className="border">Business Inflow</TableCell>
            {months.map((month, idx) => (
              <TableCell className="border" key={'businessInflow' + idx}>
                <Input
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'businessInflow',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="border">% Margin</TableCell>
            {months.map((month, idx) => (
              <TableCell className="border" key={'perMargin' + idx}>
                <Input
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'perMargin',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                />
              </TableCell>
            ))}
          </TableRow> */}
        </TableBody>
      </Table>
      <Button variant="outline" onClick={() => console.log(months)}>
        Log
      </Button>
    </div>
  )
}
