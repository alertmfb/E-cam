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
  TENURE,
  TOTAL_AND_AVERAGE,
  totalAndAverage,
} from '@/lib/api/cashflow-test/schema'
import { margins, marginsArr } from './margins'
import { cn } from '@/lib/utils'
import {
  useCashflow,
  useUploadCashflow,
} from '@/lib/api/cashflow-test/functions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Info } from 'lucide-react'

export const CashflowTable = ({ loanId }: { loanId: string }) => {
  const [margin, setMargin] = useState<number>(0)
  const [months, setMonths] = useState<CashflowMonthData[]>(cashFlowMonths)

  const TOTAL_IDX = months.length - 2
  const AVERAGE_IDX = months.length - 1

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

    updateMargin(idx)
    updateTotalExpenses(idx)
    updateOperationalCashflow(idx)
    updateTotalInflowInvestment(idx)
    updateTotalFinancialInflow(idx)
    updateFamilyNetIncome(idx)
    updateTotalFamilyInflow(idx)
    updateCashEOP(idx)
    updateAccuredFlow(idx)
    // Update total and average for the rest of the cells
    updateAllLiquidity(idx)
    updateTotal(key)
    updateAverage(key)
  }

  const updateTotal = (key: keyof CashflowMonthData) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === TOTAL_IDX
          ? {
              ...prev[i],
              [key]: totalAndAverage(
                prev.slice(0, prev.length - TOTAL_AND_AVERAGE),
                key
              ).total,
            }
          : month
      )
    )
  }

  const updateAverage = (key: keyof CashflowMonthData) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === AVERAGE_IDX
          ? {
              ...prev[i],
              [key]: totalAndAverage(
                prev.slice(0, prev.length - TOTAL_AND_AVERAGE),
                key
              ).average,
            }
          : month
      )
    )
  }

  const updateMargin = (colIdx: number) => {
    const per = margin === 0 ? 0 : margin / 100
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              perMargin: month.businessInflow - month.businessInflow * per,
            }
          : month
      )
    )
    updateTotal('perMargin')
    updateAverage('perMargin')
  }

  const updateTotalExpenses = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? { ...month, totalExp: month.perMargin + month.businessExp }
          : month
      )
    )
    updateTotal('totalExp')
    updateAverage('totalExp')
  }

  const updateOperationalCashflow = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              operationalCashflow: month.businessInflow - month.totalExp,
            }
          : month
      )
    )
    updateTotal('operationalCashflow')
    updateAverage('operationalCashflow')
  }

  const updateTotalInflowInvestment = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              totalInvestmentInflow:
                month.soi - (month.inv + month.clientConOperational),
            }
          : month
      )
    )
    updateTotal('totalInvestmentInflow')
    updateAverage('totalInvestmentInflow')
  }

  const updateTotalFinancialInflow = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              totalFinancialInflow:
                month.newLoan +
                month.clientConInflow -
                month.repaymentRunning -
                month.repaymentNew -
                month.repaymentOther,
            }
          : month
      )
    )
    updateTotal('totalFinancialInflow')
    updateAverage('totalFinancialInflow')
  }

  const updateFamilyNetIncome = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              familyNetIncome: month.familyIncome - month.familyExpenses,
            }
          : month
      )
    )
    updateTotal('familyNetIncome')
    updateAverage('familyNetIncome')
  }

  const updateTotalFamilyInflow = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              totalFamilyInflow:
                month.familyNetIncome - month.repaymentFamilyLoan,
            }
          : month
      )
    )
    updateTotal('totalFamilyInflow')
    updateAverage('totalFamilyInflow')
  }

  const updateCashEOP = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              cashAtEnd:
                month.totalFamilyInflow +
                month.totalFinancialInflow +
                month.totalInvestmentInflow +
                month.operationalCashflow,
            }
          : month
      )
    )
    updateTotal('cashAtEnd')
    updateAverage('cashAtEnd')
  }

  const updateAccuredFlow = (colIdx: number) => {
    setMonths((prev) =>
      prev.map((month, i) =>
        i === colIdx
          ? {
              ...month,
              accuredFlow: month.firstLiquidity + month.cashAtEnd,
            }
          : month
      )
    )
    updateTotal('accuredFlow')
    updateAverage('accuredFlow')
  }

  const updateAllLiquidity = (colIdx: number) => {
    if (colIdx === 0) {
      setMonths((prev) =>
        prev.map((month, i) =>
          i > 0 ? { ...month, firstLiquidity: prev[i - 1].accuredFlow } : month
        )
      )
    }
  }

  const { data: cashflow } = useCashflow(loanId)
  const loadCashflow = () => {
    if (cashflow) {
      setMargin(cashflow.margin)
      setMonths(cashflow.months)
    }
  }

  const uploadCashflow = useUploadCashflow()
  const upload = () => {
    uploadCashflow.mutate({
      loanId: loanId,
      cashflow: {
        margin,
        months,
      },
    })
  }

  return (
    <div className="w-full space-y-4 pb-4">
      {cashflow && (
        <Button onClick={loadCashflow} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <div className="font-semibold flex items-center gap-2">
          <Info />
          Set Benchmarked Margin
        </div>
        <div className="w-full sm:w-1/2">
          <MarginOptions setMargin={setMargin} />
        </div>
      </div>
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
                  <Input
                    type="number"
                    className={cn('w-28 h-8', formatText(rowIdx))}
                    readOnly={isOnlyValue(rowIdx)}
                    onChange={(e) =>
                      updateCell(
                        colIdx,
                        Object.keys(month)[rowIdx] as keyof CashflowMonthData,
                        e.target.value === '' ? 0 : parseFloat(e.target.value)
                      )
                    }
                    value={
                      month[
                        Object.keys(month)[rowIdx] as keyof CashflowMonthData
                      ] === 0
                        ? ''
                        : month[
                            Object.keys(month)[
                              rowIdx
                            ] as keyof CashflowMonthData
                          ]
                    }
                  />
                </TableCell>
              ))}
              {/* TOTAL AND AVERAGE (LAST 2) */}
              {months
                .slice(months.length - TOTAL_AND_AVERAGE, months.length)
                .map((month, colIdx) => (
                  <TableCell className="border p-1" key={colIdx}>
                    <Input
                      // type="number"
                      className={cn('w-28 h-8', formatText(rowIdx))}
                      readOnly
                      value={month[
                        Object.keys(month)[rowIdx] as keyof CashflowMonthData
                      ].toLocaleString()}
                    />
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-x-3">
        {/* <Button variant="outline" onClick={() => console.log(months)}>
          Log
        </Button> */}
        <Button onClick={upload}>Save</Button>
      </div>
    </div>
  )
}

export const formatCell = (rowIdx: number): string => {
  switch (rowIdx) {
    case 0:
      return 'bg-pink-100 hover:bg-pink-100'

    case 1:
    case 2:
    case 11:
    case 12:
    case 13:
    case 16:
      return 'bg-yellow-50 hover:bg-yellow-50'

    case 3:
    case 17:
      return 'bg-sky-50 hover:bg-sky-50'

    case 4:
    case 8:
    case 14:
    case 19:
    case 22:
      return 'bg-gray-100 hover:bg-gray-100'

    default:
      return 'hover:bg-white'
  }
}

export const formatText = (rowIdx: number): string => {
  switch (rowIdx) {
    case 0:
    case 4:
    case 8:
    case 22:
      return 'font-bold'

    default:
      return ''
  }
}

export const isOnlyValue = (rowIdx: number): boolean => {
  switch (rowIdx) {
    case 1:
    case 3:
    case 4:
    case 8:
    case 14:
    case 17:
    case 19:
    case 22:
      return true
    default:
      return false
  }
}

const MarginOptions = ({
  setMargin,
}: {
  setMargin: React.Dispatch<React.SetStateAction<number>>
}) => {
  return (
    <Select onValueChange={(key) => setMargin(margins[key])}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select margin" />
      </SelectTrigger>
      <SelectContent>
        {marginsArr.map(([key, value], idx) => (
          <SelectItem value={key} key={idx}>
            {key} - <span className="font-bold">{value}%</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
