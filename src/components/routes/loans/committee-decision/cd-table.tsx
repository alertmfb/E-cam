import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CommitteeDecisionData,
  committeeDecision,
} from '@/lib/api/committee-decision/schema'
import {
  useCommitteeDecision,
  useUploadCommitteeDecision,
} from '@/lib/api/committee-decision/functions'

export const CommitteeDecisionTable = ({ loanId }: { loanId: string }) => {
  const [cd, setCd] = useState<CommitteeDecisionData[]>(committeeDecision)

  const updateCell = (
    idx: number,
    key: keyof CommitteeDecisionData,
    value: string | number
  ) => {
    setCd((prev) =>
      prev.map((row, i) => (idx === i ? { ...prev[idx], [key]: value } : row))
    )
  }

  const { data: fetched } = useCommitteeDecision(loanId)

  const uploadCd = useUploadCommitteeDecision()
  const upload = () => {
    if (cd[0].name === '' || cd[0].designation === '') {
      alert('Complete all fields')
      return
    }

    if (!fetched) {
      uploadCd.mutate({
        loanId: loanId,
        committeeDecision: cd,
      })
    }

    if (fetched) {
      uploadCd.mutate({
        loanId: loanId,
        committeeDecision: [...fetched, ...cd],
      })
    }
  }

  return (
    <div className="w-full space-y-4 pb-4">
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

      <div className="w-full text-center font-semibold text-lg">ADD ENTRY</div>

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
          {cd.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) => updateCell(idx, 'name', e.target.value)}
                  value={row.name}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) =>
                    updateCell(idx, 'designation', e.target.value)
                  }
                  value={row.designation}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-28"
                  type="number"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'amount',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.amount === 0 ? '' : row.amount}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) => updateCell(idx, 'duration', e.target.value)}
                  value={row.duration}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'ccd',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.ccd === 0 ? '' : row.ccd}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'uf',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.uf === 0 ? '' : row.uf}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'ir',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.ir === 0 ? '' : row.ir}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-80"
                  onChange={(e) => updateCell(idx, 'comment', e.target.value)}
                  value={row.comment}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-36"
                  onChange={(e) => updateCell(idx, 'date', e.target.value)}
                  value={row.date}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="space-x-4">
        {/* <Button variant={'outline'} onClick={() => console.log(cd)}>
          Log
        </Button> */}

        <Button onClick={upload}>Save</Button>
      </div>
    </div>
  )
}

/**
 * {cd.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) => updateCell(idx, 'name', e.target.value)}
                  value={row.name}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) =>
                    updateCell(idx, 'designation', e.target.value)
                  }
                  value={row.designation}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-28"
                  type="number"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'amount',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.amount === 0 ? '' : row.amount}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-40"
                  onChange={(e) => updateCell(idx, 'duration', e.target.value)}
                  value={row.duration}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'ccd',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.ccd === 0 ? '' : row.ccd}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'uf',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.uf === 0 ? '' : row.uf}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  className="w-20"
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'ir',
                      e.target.value === '' ? 0 : parseFloat(e.target.value)
                    )
                  }
                  value={row.ir === 0 ? '' : row.ir}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-80"
                  onChange={(e) => updateCell(idx, 'comment', e.target.value)}
                  value={row.comment}
                />
              </TableCell>

              <TableCell>
                <Input
                  className="w-36"
                  onChange={(e) => updateCell(idx, 'date', e.target.value)}
                  value={row.date}
                />
              </TableCell>
            </TableRow>
          ))}
 */
