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
import { useGetBS, useSendBS } from '@/lib/api/profit-loss/functions'
import {
  BalanceSheetData,
  balanceSheet,
  compileBSData,
} from '@/lib/api/profit-loss/schema'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const BalanceSheet = ({ loanId }: { loanId: string }) => {
  const [rows, setRows] = useState<BalanceSheetData[]>(balanceSheet)

  let totalTreasury = 0
  let totalReceivables = 0
  let totalShortTermAssets = 0
  let totalBusinessFixedAssets = 0
  let totalFamilyFixedAssets = 0
  let totalFixedAssets = 0
  let totalAssets = 0
  let totalShortTermLiabilities = 0
  let totalLongTermLiabilities = 0
  let totalLiabilities = 0
  let totalEquity = 0
  let totalEquityAndLiabilities = 0

  const { data: lastSaved } = useGetBS(loanId)
  const loadSaved = () => {
    if (lastSaved) {
      setRows(lastSaved)
    }
  }

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

  const updateTotalBusinessFixedAssets = (value: number) => {
    totalBusinessFixedAssets += value
    return value.toFixed(2)
  }

  const updateTotalFamilyFixedAssets = (value: number) => {
    totalFamilyFixedAssets += value
    return value.toFixed(2)
  }

  const updateTotalFixedAssets = (value: number) => {
    totalFixedAssets += value
    return value.toFixed(2)
  }

  const updateTotalAssets = (value: number) => {
    totalAssets += value
    return value.toFixed(2)
  }

  const updateTotalShortTermLiabilities = (value: number) => {
    totalShortTermLiabilities += value
    return value.toFixed(2)
  }

  const updateTotalLongTermLiabilities = (value: number) => {
    totalLongTermLiabilities += value
    return value.toFixed(2)
  }

  const updateTotalLiabilities = (value: number) => {
    totalLiabilities += value
    return value.toFixed(2)
  }

  const updateTotalEquity = (value: number) => {
    totalEquity += value
    return value.toFixed(2)
  }

  const updateTotalEquityAndLiabilities = (value: number) => {
    totalEquityAndLiabilities += value
    return value.toFixed(2)
  }

  const bs = useSendBS()
  const submit = () => {
    bs.mutate({
      data: compileBSData(
        rows,
        totalTreasury,
        totalReceivables,
        totalShortTermAssets,
        totalBusinessFixedAssets,
        totalFamilyFixedAssets,
        totalFixedAssets,
        totalAssets,
        totalShortTermLiabilities,
        totalLongTermLiabilities,
        totalLiabilities,
        totalEquity,
        totalEquityAndLiabilities
      ),
      loanId,
    })
  }

  return (
    <div className="w-full space-y-4 py-3">
      {lastSaved && (
        <Button onClick={() => loadSaved()} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
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
          <TableRow>
            <TableHead className="font-bold text-xl">
              SHORT-TERM ASSETS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <InputRow idx={0} item={rows[0]} changeCell={changeCell} />
          <InputRow idx={1} item={rows[1]} changeCell={changeCell} />
          <InputRow idx={2} item={rows[2]} changeCell={changeCell} />

          <DisplayRow
            row={rows[3]}
            value={updateTotalTreasury(
              rows[0].amount + rows[1].amount + rows[2].amount
            )}
          />

          <InputRow idx={4} item={rows[4]} changeCell={changeCell} />
          <InputRow idx={5} item={rows[5]} changeCell={changeCell} />

          <DisplayRow
            row={rows[6]}
            value={updateReceivables(rows[4].amount + rows[5].amount)}
          />

          <InputRow idx={7} item={rows[7]} changeCell={changeCell} />

          <DisplayRow
            row={rows[8]}
            value={updateTotalShortTermAssets(
              totalTreasury + totalReceivables + rows[7].amount
            )}
          />

          <TableRow>
            <TableCell className="font-bold text-xl text-muted-foreground">
              FIXED ASSETS
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-bold text-lg bg-blue-300">
              BUSINESS
            </TableCell>
          </TableRow>
          <InputRow idx={9} item={rows[9]} changeCell={changeCell} />
          <InputRow idx={10} item={rows[10]} changeCell={changeCell} />
          <InputRow idx={11} item={rows[11]} changeCell={changeCell} />

          <DisplayRow
            row={rows[12]}
            value={updateTotalBusinessFixedAssets(
              rows[9].amount + rows[10].amount + rows[11].amount
            )}
          />

          <TableRow>
            <TableCell className="font-bold text-lg bg-green-300">
              FAMILY
            </TableCell>
          </TableRow>

          <InputRow idx={13} item={rows[13]} changeCell={changeCell} />
          <InputRow idx={14} item={rows[14]} changeCell={changeCell} />
          <InputRow idx={15} item={rows[15]} changeCell={changeCell} />

          <DisplayRow
            row={rows[16]}
            value={updateTotalFamilyFixedAssets(
              rows[13].amount + rows[14].amount + rows[15].amount
            )}
          />

          <DisplayRow
            row={rows[17]}
            value={updateTotalFixedAssets(
              totalBusinessFixedAssets + totalFamilyFixedAssets
            )}
          />

          <DisplayRow
            row={rows[18]}
            value={updateTotalAssets(totalShortTermAssets + totalFixedAssets)}
          />

          <TableRow>
            <TableCell className="text-lg font-bold">
              SHORT-TERM LIABILITIES:
            </TableCell>
          </TableRow>

          <InputRow idx={19} item={rows[19]} changeCell={changeCell} />
          <InputRow idx={20} item={rows[20]} changeCell={changeCell} />
          <InputRow idx={21} item={rows[21]} changeCell={changeCell} />
          <InputRow idx={22} item={rows[22]} changeCell={changeCell} />

          <DisplayRow
            row={rows[23]}
            value={updateTotalShortTermLiabilities(
              rows[19].amount +
                rows[20].amount +
                rows[21].amount +
                rows[22].amount
            )}
          />

          <TableRow>
            <TableCell className="text-lg font-bold">
              LONG-TERM LIABILITIES:
            </TableCell>
          </TableRow>

          <InputRow idx={24} item={rows[24]} changeCell={changeCell} />
          <InputRow idx={25} item={rows[25]} changeCell={changeCell} />

          <DisplayRow
            row={rows[26]}
            value={updateTotalLongTermLiabilities(
              rows[24].amount + rows[25].amount
            )}
          />
          <DisplayRow
            row={rows[27]}
            value={updateTotalLiabilities(
              totalShortTermLiabilities + totalLongTermLiabilities
            )}
          />
          <DisplayRow
            row={rows[28]}
            value={updateTotalEquity(totalAssets - totalLiabilities)}
          />
          <DisplayRow
            row={rows[29]}
            value={updateTotalEquityAndLiabilities(
              totalLiabilities + totalEquity
            )}
          />
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-3">
        {/* <Button
          onClick={() =>
            console.log(
              rows,
              totalTreasury,
              totalReceivables,
              totalShortTermAssets,
              totalBusinessFixedAssets,
              totalFamilyFixedAssets,
              totalAssets
            )
          }
        >
          Log Data
        </Button> */}
        {/* <Button
          onClick={() =>
            console.log(
              compileBSData(
                rows,
                totalTreasury,
                totalReceivables,
                totalShortTermAssets,
                totalBusinessFixedAssets,
                totalFamilyFixedAssets,
                totalFixedAssets,
                totalAssets,
                totalShortTermLiabilities,
                totalLongTermLiabilities,
                totalLiabilities,
                totalEquity,
                totalEquityAndLiabilities
              )
            )
          }
          variant={'outline'}
        >
          Compile
        </Button> */}
        <Button onClick={() => submit()}>Save Data</Button>
      </div>
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
    <TableRow>
      <TableCell className={cn('border', className)}>{item.name}</TableCell>
      <TableCell className="border">
        <Input
          id={item.name + idx}
          onChange={(e) =>
            changeCell(
              idx,
              parseFloat(e.target.value === '' ? '0' : e.target.value),
              Object.keys(item)[1] as keyof BalanceSheetData
            )
          }
          readOnly={readOnly}
          value={item.amount}
        />
      </TableCell>
      <TableCell className="border bg-pink-100"></TableCell>
    </TableRow>
  )
}

const DisplayRow = ({
  row,
  value,
}: {
  row: BalanceSheetData
  value: string
}) => {
  return (
    <TableRow>
      <TableCell className="border font-bold">{row.name}</TableCell>
      <TableCell className="bg-pink-100">
        <Input type="number" id={row.name} readOnly value={value} />
      </TableCell>
      <TableCell className="border bg-pink-100"></TableCell>
    </TableRow>
  )
}
