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
import { OtherBankData } from '@/lib/api/profit-loss/schema'
import { useState } from 'react'

export const OtherBank = ({ loanId }: { loanId: string }) => {
  const [rows, setRows] = useState<OtherBankData[]>([
    { bankName: '', accName: '', accNo: '', bal: 0 },
  ])

  const updateCell = (
    idx: number,
    value: string | number,
    cell: keyof OtherBankData
  ) => {
    setRows((prev) =>
      prev.map((obj, i) => (i === idx ? { ...obj, [cell]: value } : obj))
    )
  }

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { accName: '', accNo: '', bal: 0, bankName: '' },
    ])
  }

  const deleteRow = () => {
    setRows((prev) => prev.filter((rows, idx) => idx != prev.length - 1))
  }

  return (
    <div className="w-full space-y-6">
      <Table>
        <TableHeader className="bg-purple-200">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>BANK NAME</TableHead>
            <TableHead>ACCOUNT NAME</TableHead>
            <TableHead>ACCOUNT NUMBER</TableHead>
            <TableHead>BALANCE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">
                <Input
                  id={'bankName' + idx}
                  onChange={(e) => updateCell(idx, e.target.value, 'bankName')}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'accName' + idx}
                  onChange={(e) => updateCell(idx, e.target.value, 'accName')}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'accNo' + idx}
                  onChange={(e) => updateCell(idx, e.target.value, 'accNo')}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'bal' + idx}
                  onChange={(e) =>
                    updateCell(idx, parseFloat(e.target.value), 'bal')
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex items-center justify-between gap-3">
        <div className="space-x-3">
          <Button onClick={() => addRow()} variant="outline">
            Add Row
          </Button>
          <Button onClick={() => deleteRow()} variant="outline">
            Delete Row
          </Button>
        </div>
        <Button className="">Save</Button>
      </div>
    </div>
  )
}
