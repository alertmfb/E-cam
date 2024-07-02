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
import type { InventoryData } from '@/lib/api/profit-loss/schema'
import { calculateTotal } from '@/lib/api/profit-loss/schema'
import { useState } from 'react'

export const Inventory = () => {
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

  function changeCell(
    idx: number,
    value: string | number,
    cell: keyof InventoryData
  ) {
    setRows((prev) =>
      prev.map((obj, i) => (i === idx ? { ...obj, [cell]: value } : obj))
    )
    updateValue(idx)
    updateProfit(idx)
    updateMargin(idx)
  }

  function updateValue(idx: number) {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx ? { ...obj, value: obj.quantity * obj.costPrice } : obj
      )
    )
  }

  function updateProfit(idx: number) {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx ? { ...obj, profit: obj.sellingPrice - obj.costPrice } : obj
      )
    )
  }

  function updateMargin(idx: number) {
    setRows((prev) =>
      prev.map((obj, i) =>
        i === idx
          ? {
              ...obj,
              margin:
                ((obj.sellingPrice - obj.costPrice) / obj.sellingPrice) * 100,
            }
          : obj
      )
    )
  }

  function pushWm(value: number): number {
    wm.push(parseFloat(value.toFixed(2)))
    return value
  }

  return (
    <div className="w-full space-y-4 py-3">
      <Table className="border">
        <TableHeader className="bg-purple-100 text-center border">
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
        </TableHeader>
        <TableBody className="">
          {rrows.map((cell, idx) => (
            <TableRow key={idx} className="border">
              <TableCell className="border" id="item" key={idx}>
                <Input
                  onChange={(e) =>
                    changeCell(
                      idx,
                      e.target.value,
                      Object.keys(cell)[0] as keyof InventoryData
                    )
                  }
                />
              </TableCell>

              <TableCell className="border">
                <Input
                  type="number"
                  id="quantity"
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value),
                      Object.keys(cell)[1] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="value"
                  readOnly
                  value={rrows[idx].value.toString()}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  type="number"
                  id="sp"
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value),
                      Object.keys(cell)[3] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  type="number"
                  id="cp"
                  onChange={(e) =>
                    changeCell(
                      idx,
                      parseFloat(e.target.value),
                      Object.keys(cell)[4] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="profit"
                  readOnly
                  value={rrows[idx].profit.toString()}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="margin"
                  readOnly
                  value={rrows[idx].margin.toFixed(2).toString()}
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="wm"
                  readOnly
                  value={pushWm(
                    (rrows[idx].value /
                      rrows
                        .map((obj, i) => obj.value)
                        .reduce((a, c) => a + c)) *
                      rrows[idx].margin
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
                type="number"
                id="quantity"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'quantity').toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="value"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'value').toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="sp"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'sellingPrice').toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="cp"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'costPrice').toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="profit"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'profit').toString()
                ).toFixed(2)}
              />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input
                type="number"
                id="margin"
                readOnly
                value={parseFloat(
                  calculateTotal(rrows, 'margin').toString()
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
        </TableBody>
      </Table>

      <div className="flex items-center gap-3">
        <Button className="w-full mb-6">Add Row</Button>

        <Button className="w-full mb-6" onClick={() => console.log(rrows)}>
          View Data
        </Button>

        <Button
          className="w-full mb-6"
          onClick={() => console.log(calculateTotal(rrows, 'value'))}
        >
          Total
        </Button>
        <Button className="w-full mb-6" onClick={() => console.log(wm)}>
          WM Total
        </Button>

        {/* <Button className="w-full mb-6" onClick={() => console.log(rows)}>
          Save
        </Button> */}
      </div>
    </div>
  )
}
