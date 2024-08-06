import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { InventoryData, calculateTotal } from '@/lib/api/profit-loss/schema'
import { usePrevStockInventory } from '@/lib/api/stock-pledge/functions'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const StockPledgeData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  const data = usePrevStockInventory(loanId)
  
  if(!data) {
    return <div></div>
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
    <Card className="w-full shadow-md">
      <CardHeader
        className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
        onClick={() => setContent((prev) => !prev)}
      >
        <CardTitle className="text-xl flex items-center gap-3 justify-between">
          <div>Stock Pledge</div>
          <ChevronDown />
        </CardTitle>
        <CardDescription>Inventory</CardDescription>
      </CardHeader>

      {content && (
        <CardContent className="transition ease-in-out fade-in-30 delay-150">
          <form className="w-full flex flex-col gap-3">
            <InventoryTable inventory={data} />
          </form>
        </CardContent>
      )}
    </Card>
  </div>
  )
}

const InventoryTable = ({ inventory }: { inventory: InventoryData[] }) => {
  return (
    <Table className="mb-6">
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
      <TableBody>
        {inventory.map((col, idx) => (
          <TableRow key={idx}>
            <TableCell className="border text-center">{col.item}</TableCell>
            <TableCell className="border text-center">{col.quantity}</TableCell>
            <TableCell className="border text-center">{col.value}</TableCell>
            <TableCell className="border text-center">
              {col.sellingPrice}
            </TableCell>
            <TableCell className="border text-center">
              {col.costPrice}
            </TableCell>
            <TableCell className="border text-center">{col.profit}</TableCell>
            <TableCell className="border text-center">{col.margin}</TableCell>
            <TableCell className="border text-center">{col.wM}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="border text-center font-bold">TOTAL:</TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'quantity').toFixed(2)
            ).toLocaleString()}
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'value').toFixed(2)
            ).toLocaleString()}
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'sellingPrice').toFixed(2)
            ).toLocaleString()}
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'costPrice').toFixed(2)
            ).toLocaleString()}
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'profit').toFixed(2)
            ).toLocaleString()}
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'margin').toFixed(2)
            ).toLocaleString()}
            %
          </TableCell>
          <TableCell className="border text-center font-bold">
            {parseFloat(
              calculateTotal(inventory, 'wM').toFixed(2)
            ).toLocaleString()}
            %
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}