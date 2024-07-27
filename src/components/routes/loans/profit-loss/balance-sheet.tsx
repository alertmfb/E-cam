import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { BalanceSheetData, balanceSheet } from '@/lib/api/profit-loss/schema'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const BalanceSheet = ({ loanId }: { loanId: string }) => {
  const [rows, setRows] = useState<BalanceSheetData[]>(balanceSheet)

  let totalTreasury = 0
  let totalReceivables = 0
  let totalShortTermAssets = 0

  const changeCell = (
    idx: number,
    value: string | number,
    cell: keyof BalanceSheetData
  ) => {
    setRows((prev) =>
      prev.map((obj, i) => (i === idx ? { ...obj, [cell]: value } : obj))
    )
  }

  const updateTotalTreasury = (value: number) => {
    totalTreasury += value
    return value.toFixed(2)
  }

  const updateReceivables = (value: number) => {
    totalReceivables += value
    return value.toFixed(2)
  }

  const updateTotalShortTermAssets = (value: number) => {
    totalShortTermAssets += value
    return value.toFixed(2)
  }

  return (
    <div className="w-full space-y-4 py-3">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-purple-100 text-center border">
            <TableHead className="text-gray-800 text-center border">
              Main Business
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Amount
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              %
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {balanceSheet.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{item.name}</TableCell>
              <TableCell className={`border`}>
                <Input
                  id={'item' + idx}
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value === '' ? '0' : e.target.value),
                      Object.keys(item)[1] as keyof BalanceSheetData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-100">
                {item.percentage}
              </TableCell>
            </TableRow>
          ))} */}
          <InputRow idx={0} item={rows[0]} changeCell={changeCell} />
          <InputRow idx={1} item={rows[1]} changeCell={changeCell} />
          <InputRow idx={2} item={rows[2]} changeCell={changeCell} />

          <TableRow>
            <TableCell className="border">{rows[3].name}</TableCell>
            <TableCell className="bg-pink-100">
              <Input
                type="number"
                id={'amount' + 3}
                readOnly
                value={updateTotalTreasury(
                  rows[0].amount + rows[1].amount + rows[2].amount
                )}
              />
            </TableCell>
            <TableCell className="border bg-pink-100">
              {rows[3].percentage}
            </TableCell>
          </TableRow>

          <InputRow idx={4} item={rows[4]} changeCell={changeCell} />
          <InputRow idx={5} item={rows[5]} changeCell={changeCell} />

          <TableRow>
            <TableCell className="border">{rows[6].name}</TableCell>
            <TableCell className="bg-pink-100">
              <Input
                type="number"
                id={'amount' + 6}
                readOnly
                value={updateReceivables(rows[4].amount + rows[5].amount)}
              />
            </TableCell>
            <TableCell className="border bg-pink-100">
              {rows[6].percentage}
            </TableCell>
          </TableRow>

          <InputRow idx={7} item={rows[7]} changeCell={changeCell} />

          <TableRow>
            <TableCell className="border">{rows[8].name}</TableCell>
            <TableCell className="bg-pink-100">
              <Input
                type="number"
                id={'amount' + 8}
                readOnly
                value={updateTotalShortTermAssets(
                  totalTreasury + totalReceivables + rows[7].amount
                )}
              />
            </TableCell>
            <TableCell className="border bg-pink-100">
              {rows[8].percentage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        onClick={() =>
          console.log(
            rows,
            totalTreasury,
            totalReceivables,
            totalShortTermAssets
          )
        }
      >
        Log Data
      </Button>
    </div>
  )
}

const InputRow = ({
  idx,
  item,
  changeCell,
  className,
  readOnly = false,
}: {
  idx: number
  item: BalanceSheetData
  changeCell: (
    idx: number,
    value: string | number,
    cell: keyof BalanceSheetData
  ) => void
  className?: string
  readOnly?: boolean
}) => {
  return (
    <TableRow key={idx}>
      <TableCell className="border">{item.name}</TableCell>
      <TableCell className={cn('border', className)}>
        <Input
          id={'item' + idx}
          onChange={(e) =>
            changeCell(
              idx,
              parseFloat(e.target.value === '' ? '0' : e.target.value),
              Object.keys(item)[1] as keyof BalanceSheetData
            )
          }
          readOnly={readOnly}
        />
      </TableCell>
      <TableCell className="border bg-pink-100">{item.percentage}</TableCell>
    </TableRow>
  )
}

const DisplayRow = ({
  idx,
  key,
  item,
  arr,
}: {
  idx: number
  key: keyof BalanceSheetData
  item: BalanceSheetData
  arr: BalanceSheetData[]
}) => {
  return (
    <TableRow>
      <TableCell className="border">{item.name}</TableCell>
      <TableCell className="bg-pink-100">
        {/* <Input
          type="number"
          id={'amount' + idx}
          readOnly
          value={arr[0].amount + arr[1].amount}
        /> */}
        <DisplayRowInput idx={idx} arr={arr} />
      </TableCell>
      <TableCell className="border bg-pink-100">{item.percentage}</TableCell>
    </TableRow>
  )
}

const DisplayRowInput = ({
  idx,
  arr,
}: {
  idx: number
  arr: BalanceSheetData[]
}) => {
  switch (idx) {
    case 3:
      return (
        <Input
          type="number"
          id={'amount' + idx}
          readOnly
          value={arr[0].amount + arr[1].amount}
        />
      )
    default:
      return <Input />
  }
}
