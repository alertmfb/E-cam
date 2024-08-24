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
import { cn } from '@/lib/utils'
import { number } from 'zod'

export const CashflowTable = ({ loanId }: { loanId: string }) => {
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

    updateFirstLiquidity(idx)
    updateTotalExpenses(idx)
    updateOperationalCashflow(idx)
    updateTotalInflowInvestment(idx)
    updateTotalFinancialInflow(idx)
    updateFamilyNetIncome(idx)
    updateTotalFamilyInflow(idx)
    updateCashEOP(idx)
    updateAccuredFlow(idx)
    // Update total and average for the rest of the cells
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

  const updateFirstLiquidity = (colIdx: number) => {
    // setMonths((prev) =>
    //   prev.map((month, idx) =>
    //     colIdx > 0
    //       ? {
    //           ...month,
    //           firstLiquidity: months[colIdx - 0].accuredFlow,
    //         }
    //       : month
    //   )
    // )

    // updateTotal('firstLiquidity')
    // updateAverage('firstLiquidity')
    colIdx !== 0 &&
      setMonths((prev) =>
        prev.map((month, colIdx) =>
          colIdx !== 0
            ? {
                ...prev[colIdx],
                firstLiquidity: months[colIdx - 1].accuredFlow,
              }
            : month
        )
      )
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
    // updateFirstLiquidity(colIdx)
    updateTotal('accuredFlow')
    updateAverage('accuredFlow')
  }

  return (
    <div className="w-full space-y-4 pb-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-purple-100 hover:bg-purple-100">
            <TableHead className="text-black border">Description</TableHead>
            <TableHead className="text-black border">1st month</TableHead>
            <TableHead className="text-black border">2nd month</TableHead>
            {/* <TableHead className="text-black border">3rd month</TableHead>
            <TableHead className="text-black border">4th month</TableHead>
            <TableHead className="text-black border">5th month</TableHead>
            <TableHead className="text-black border">6th month</TableHead>
            <TableHead className="text-black border">7th month</TableHead>
            <TableHead className="text-black border">8th month</TableHead>
            <TableHead className="text-black border">9th month</TableHead>
            <TableHead className="text-black border">10th month</TableHead>
            <TableHead className="text-black border">11th month</TableHead>
            <TableHead className="text-black border">12th month</TableHead> */}
            <TableHead className="text-black border">Total</TableHead>
            <TableHead className="text-black border">Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DESCRIPTIONS.map((description, rowIdx) => (
            <TableRow key={rowIdx} className={cn(formatCell(rowIdx))}>
              <TableCell className="border font-semibold">
                {description}
              </TableCell>
              {months.slice(0, TENURE).map((month, colIdx) => (
                <TableCell className="border p-1" key={colIdx}>
                  <Input
                    className={cn('w-40 h-8', formatText(rowIdx))}
                    readOnly={isOnlyValue(rowIdx, colIdx)}
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
                      className={cn('w-40 h-8', formatText(rowIdx))}
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
      <Button variant="outline" onClick={() => console.log(months)}>
        Log
      </Button>
    </div>
  )
}

const formatCell = (rowIdx: number): string => {
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

const formatText = (rowIdx: number): string => {
  switch (rowIdx) {
    case 0:
    case 4:
    case 8:
      return 'font-bold'

    case 22:
      return 'font-bold text-red-600'
    default:
      return ''
  }
}

const isOnlyValue = (rowIdx: number, colIdx: number): boolean => {
  switch (rowIdx) {
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
