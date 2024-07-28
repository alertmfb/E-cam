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
import { getLastSaved, saveData } from '@/lib/api/profit-loss/functions'
import type { InventoryData } from '@/lib/api/profit-loss/schema'
import { calculateTotal } from '@/lib/api/profit-loss/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const Inventory = ({ loanId }: { loanId: string }) => {
  // Fetch last saved on mount
  const [isLast, setIsLast] = useState(false)

  const [rrows, setRows] = useState([
    {
      item: '',
      quantity: 0,
      value: 0,
      sellingPrice: 0,
      costPrice: 0,
      profit: 0,
      margin: 0,
      wM: 0,
    },
  ])

  const wm: number[] = []

  const { data: lastSaved, isFetched } = useQuery({
    queryKey: ['last'],
    queryFn: () => getLastSaved({ loanId }),
  })

  const loadPrev = () => {
    if (lastSaved) {
      setRows(lastSaved)
      setIsLast(true)
    }
  }

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      ...[
        {
          item: '',
          quantity: 0,
          value: 0,
          sellingPrice: 0,
          costPrice: 0,
          profit: 0,
          margin: 0,
          wM: 0,
        },
      ],
    ])
  }

  const removeRow = () => {
    if (rrows.length !== 1) {
      setRows((prev) => prev.filter((obj, i) => i + 1 !== prev.length))
    }
  }

  const changeCell = (
    idx: number,
    value: string | number,
    cell: keyof InventoryData
  ) => {
    setRows((prev) =>
      prev.map((obj, i) => (i === idx ? { ...obj, [cell]: value } : obj))
    )
    updateValue(idx)
    updateProfit(idx)
    updateMargin(idx)
  }

  const updateValue = (idx: number) => {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx ? { ...obj, value: obj.quantity * obj.costPrice } : obj
      )
    )
  }

  const updateProfit = (idx: number) => {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx ? { ...obj, profit: obj.sellingPrice - obj.costPrice } : obj
      )
    )
  }

  const updateMargin = (idx: number) => {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx
          ? {
              ...obj,
              margin:
                obj.sellingPrice === 0
                  ? 0
                  : ((obj.sellingPrice - obj.costPrice) / obj.sellingPrice) *
                    100,
            }
          : obj
      )
    )
  }

  const pushWm = (value: number, idx: number): number => {
    if (isNaN(value)) {
      wm.push(0)
    } else {
      wm.push(parseFloat(value.toFixed(2)))
    }
    return wm[idx]
  }

  const addMutation = useMutation({
    mutationFn: saveData,
    onSuccess(data) {
      alert(data)
    },
  })

  return (
    <div className="w-full space-y-4 py-3">
      {lastSaved && (
        <Button onClick={() => loadPrev()} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-purple-100 text-center border">
            <TableHead className="text-gray-800 text-center border">
              Item
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Quantity
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Value
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Selling Price
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Cost Price
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Profit
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Margin %
            </TableHead>
            <TableHead className="text-gray-800 text-center border">
              Weighted Margin %
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {rrows.map((cell, idx) => (
            <TableRow key={idx} className="border">
              <TableCell className="border" key={idx}>
                <Input
                  id={'item' + idx}
                  onChange={(e) =>
                    changeCell(
                      idx,
                      e.target.value,
                      Object.keys(cell)[0] as keyof InventoryData
                    )
                  }
                  defaultValue={isLast ? rrows[idx].item : ''}
                  // value={isLast ? rrows[idx].item : ''}
                />
              </TableCell>

              <TableCell className="border">
                <Input
                  type="number"
                  id={'quantity' + idx}
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value === '' ? '0' : e.target.value),
                      Object.keys(cell)[1] as keyof InventoryData
                    )
                  }
                  defaultValue={isLast ? rrows[idx].quantity : '0'}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id={'value' + idx}
                  readOnly
                  value={rrows[idx].value.toString()}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  type="number"
                  id={'sp' + idx}
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value === '' ? '0' : e.target.value),
                      Object.keys(cell)[3] as keyof InventoryData
                    )
                  }
                  defaultValue={isLast ? rrows[idx].sellingPrice : '0'}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  type="number"
                  id={'cp' + idx}
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value === '' ? '0' : e.target.value),
                      Object.keys(cell)[4] as keyof InventoryData
                    )
                  }
                  defaultValue={isLast ? rrows[idx].costPrice : '0'}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id={'profit' + idx}
                  readOnly
                  value={rrows[idx].profit.toString()}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id={'margin' + idx}
                  readOnly
                  value={rrows[idx].margin.toFixed(2).toString()}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  // type="number"
                  id={'wm' + idx}
                  readOnly
                  value={pushWm(
                    (rrows[idx].value /
                      rrows
                        .map((obj, i) => obj.value)
                        .reduce((a, c) => a + c)) *
                      rrows[idx].margin,
                    idx
                  ).toFixed(2)}
                />
              </TableCell>
            </TableRow>
          ))}

          <TableRow className="border">
            <TableCell className="border text-center font-bold">
              TOTAL:
            </TableCell>
            <TableCell className="border">
              <Input
                id="quantity"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'quantity').toFixed(2)
                ).toLocaleString()}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                id="value"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'value').toFixed(2)
                ).toLocaleString()}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                id="sp"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'sellingPrice').toFixed(2)
                ).toLocaleString()}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                id="cp"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'costPrice').toFixed(2)
                ).toLocaleString()}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                id="profit"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'profit').toFixed(2)
                ).toLocaleString()}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="margin"
                readOnly
                value={parseFloat(
                  (calculateTotal(rrows, 'margin') / rrows.length === 0
                    ? 0
                    : calculateTotal(rrows, 'margin') / rrows.length
                  ).toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="wm"
                readOnly
                value={parseFloat(
                  wm.reduce((a, c) => a + c).toString()
                ).toFixed(2)}
              />
            </TableCell>
          </TableRow>
          <TableRow className="font-bold">
            <TableCell>
              %Average Margin:{' '}
              {parseFloat(
                (calculateTotal(rrows, 'margin') / rrows.length === 0
                  ? 0
                  : calculateTotal(rrows, 'margin') / rrows.length
                ).toString()
              ).toFixed(2)}
              %
            </TableCell>
            <TableCell>
              %Weighted Margin:{' '}
              {parseFloat(wm.reduce((a, c) => a + c).toString()).toFixed(2)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button className="w-full" onClick={() => addRow()} variant="outline">
            Add Row
          </Button>
          <Button
            className="w-full"
            onClick={() => removeRow()}
            variant="secondary"
          >
            Remove Row
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {/* <Button className=" mb-6" onClick={() => console.log([rrows, wm])}>
            Log Data
          </Button> */}

          <Button className="mb-6" onClick={() => console.log(rrows, wm)}>
            Log Data
          </Button>
          <Button
            className="mb-6"
            onClick={() => addMutation.mutate({ rrows, wm, loanId })}
          >
            Save Data
          </Button>
        </div>
      </div>
    </div>
  )
}
