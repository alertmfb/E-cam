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
import { rows, updateCell } from '@/lib/api/profit-loss/schema'

export const Inventory = () => {
  return (
    <div className="w-full space-y-4 py-3">
      <Table className="border">
        <TableHeader className="bg-purple-50 text-center border">
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
          {rows.map((cell, idx) => (
            <TableRow key={idx} className="border">
              <TableCell className="border" key={idx}>
                <Input
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
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
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[1] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="value"
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[2] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  type="number"
                  id="sp"
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
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
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[4] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="profit"
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[5] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="margin"
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[6] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
              <TableCell className="border bg-pink-50">
                <Input
                  type="number"
                  id="wm"
                  onChange={(e) =>
                    updateCell(
                      e.target.value,
                      idx,
                      Object.keys(cell)[7] as keyof InventoryData
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}

          <TableRow className="border">
            <TableCell className="border text-center font-bold">
              TOTAL:
            </TableCell>
            <TableCell className="border">
              <Input type="number" id="quantity" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="value" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="sp" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="cp" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="profit" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="margin" />
            </TableCell>
            <TableCell className="border bg-pink-50">
              <Input type="number" id="wm" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button className="w-full mb-6" onClick={() => console.log(rows)}>
        Save
      </Button>
    </div>
  )
}
