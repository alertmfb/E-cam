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
import { useGetOB, useSendOB } from '@/lib/api/profit-loss/functions'
import { OtherBankData } from '@/lib/api/profit-loss/schema'
import { useState } from 'react'

export const OtherBank = ({ loanId }: { loanId: string }) => {
  const [rows, setRows] = useState<OtherBankData[]>([
    { bankName: '', accName: '', accNo: '', bal: 0 },
  ])

  const lastSaved = useGetOB(loanId)
  const loadSaved = () => {
    if (lastSaved.data) {
      setRows(lastSaved.data)
    }
  }

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

  const ob = useSendOB()
  const submit = () => {
    if (
      rows[rows.length - 1].accName === '' ||
      rows[rows.length - 1].accNo === '' ||
      rows[rows.length - 1].bal === 0 ||
      rows[rows.length - 1].bankName === ''
    ) {
      alert('complete rows before submitting')
      return
    }

    ob.mutate({
      data: rows,
      loanId: loanId,
    })
  }

  return (
    <div className="w-full space-y-6 py-3">
      {lastSaved.data && (
        <Button onClick={() => loadSaved()} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
      <Table className="border">
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
                  value={rows[idx].bankName}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'accName' + idx}
                  onChange={(e) => updateCell(idx, e.target.value, 'accName')}
                  value={rows[idx].accName}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'accNo' + idx}
                  onChange={(e) => updateCell(idx, e.target.value, 'accNo')}
                  value={rows[idx].accNo}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'bal' + idx}
                  onChange={(e) =>
                    updateCell(idx, parseFloat(e.target.value), 'bal')
                  }
                  value={rows[idx].bal}
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
        <Button className="" onClick={() => submit()}>
          Save
        </Button>
      </div>
    </div>
  )
}
