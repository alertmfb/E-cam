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
import {
  BusinessExAs,
  useGetBusinessAsset,
  useGetBusinessExpense,
} from '@/lib/api/business-expenses/functions'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const BusinessData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Business Expense & Assets</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>The client's business data</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <DataFields loanId={loanId} />
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const DataFields = ({ loanId }: { loanId: string }) => {
  const { data: businessExpense } = useGetBusinessExpense(loanId)
  const { data: businessAsset } = useGetBusinessAsset(loanId)

  return (
    <div className="w-full flex flex-col gap-3">
      <div>Business Expense</div>
      {businessExpense && <DataTable data={businessExpense} />}
      <div>Business Asset</div>

      {businessAsset && <DataTable data={businessAsset} />}
    </div>
  )
}

const DataTable = ({ data }: { data: BusinessExAs[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.item}</TableCell>
            <TableCell>{row.details}</TableCell>
            <TableCell>N{parseFloat(row.amount).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
