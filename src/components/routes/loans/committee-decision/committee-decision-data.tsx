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
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useCommitteeDecision } from '@/lib/api/committee-decision/functions'

export const CommitteeDecisionData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Committee Decision</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Committee decision data</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <div className="w-full flex flex-col gap-3">
              <DataTable loanId={loanId} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const DataTable = ({ loanId }: { loanId: string }) => {
  const { data: fetched } = useCommitteeDecision(loanId)
  return (
    <Table className="border">
      <TableHeader className="font-black">
        <TableRow className="bg-purple-100 font-black">
          <TableHead className="border text-black">S/N</TableHead>
          <TableHead className="border text-black">NAME</TableHead>
          <TableHead className="border text-black">DESIGNATION</TableHead>
          <TableHead className="border text-black">AMOUNT</TableHead>
          <TableHead className="border text-black">DURATION</TableHead>
          <TableHead className="border text-black">CCD%</TableHead>
          <TableHead className="border text-black">UPFRONT FEE %</TableHead>
          <TableHead className="border text-black">INTEREST RATE %</TableHead>
          <TableHead className="border text-black">OTHER COMMENT</TableHead>
          <TableHead className="border text-black">DATE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetched &&
          fetched.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Input className="w-40" readOnly value={row.name} />
              </TableCell>

              <TableCell>
                <Input className="w-40" readOnly value={row.designation} />
              </TableCell>

              <TableCell>
                <Input
                  className="w-28"
                  type="number"
                  readOnly
                  value={row.amount === 0 ? '' : row.amount}
                />
              </TableCell>

              <TableCell>
                <Input className="w-40" readOnly value={row.duration} />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  readOnly
                  value={row.ccd === 0 ? '' : row.ccd}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  readOnly
                  value={row.uf === 0 ? '' : row.uf}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  readOnly
                  value={row.ir === 0 ? '' : row.ir}
                />
              </TableCell>

              <TableCell>
                <Input className="w-80" readOnly value={row.comment} />
              </TableCell>

              <TableCell>
                <Input className="w-36" readOnly value={row.date} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
