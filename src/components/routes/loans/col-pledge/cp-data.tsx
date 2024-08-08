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
import { usePrevColData } from '@/lib/api/col-pledge/functions'
import {
  CompleteCollateralData,
  calculateColTotal,
} from '@/lib/api/col-pledge/schema'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const ColPledgeData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  const { data } = usePrevColData(loanId)

  if (!data) {
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
            <div>Collateral Pledge</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Collateral pledge data</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <form className="w-full flex flex-col gap-3">
              <CollateralPledgeTable colPledge={data} />
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

const CollateralPledgeTable = ({
  colPledge,
}: {
  colPledge: CompleteCollateralData
}) => {
  const MOVABLE_DEPRE = 0.35
  const IMMOVABLE_DEPRE = 0.3

  return (
    <div className="w-full space-y-4 py-3">
      <div className="flex items-center justify-between gap-3 text-xl font-bold flex-1 flex-wrap">
        Movable
        <div className="p-2 bg-gray-100 rounded-md">
          <span className="text-purple-500">%DEPRECIATION</span>{' '}
          {MOVABLE_DEPRE * 100}
        </div>
        <div>Loan Amount: N{colPledge.loanAmount.toLocaleString()}</div>
      </div>
      <Table className="border">
        <TableHeader className="h-20 p-2 bg-purple-100">
          <TableRow>
            <TableHead className="text-black border">S/N</TableHead>
            <TableHead className="text-black border">COLLATERAL NAME</TableHead>
            <TableHead className="text-black border">
              BRIEF DESCRIPTION
            </TableHead>
            <TableHead className="text-black border">YEAR</TableHead>
            <TableHead className="text-black border">
              ESTIMATED CURRENT MARKET VALUE
            </TableHead>
            <TableHead className="text-black border">
              FORCED SALE VALUE
            </TableHead>
            <TableHead className="text-black border">%COVERAGE</TableHead>
            <TableHead className="text-black border">
              <div className="border-b">COLLATERAL TITLES</div>
              <div className="flex items-center">
                <div className="border-r">DOCUMENT TYPE</div>
              </div>
            </TableHead>
            <TableHead className="text-black border">
              <div className="border-b">COLLATERAL TITLES</div>
              <div className="flex items-center">
                <div>EXPIRY DATE</div>
              </div>
            </TableHead>
            <TableHead className="text-black border">
              VEHICLE CHASIS NUMBER
            </TableHead>
            <TableHead className="text-black border">
              OWNERSHIP <br /> (BORROWER/GUARANTOR <br /> /OTHER PARTY)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colPledge.table.slice(0, 4).map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">{col.colName}</TableCell>
              <TableCell className="border">{col.desc}</TableCell>
              <TableCell className="border">{col.year}</TableCell>
              <TableCell className="border">{col.ecmv}</TableCell>
              <TableCell className="border">{col.fsv}</TableCell>
              <TableCell className="border">{col.cov}</TableCell>
              <TableCell className="border">{col.docType}</TableCell>
              <TableCell className="border">{col.expDate}</TableCell>
              <TableCell className="border">{col.chaNo}</TableCell>
              <TableCell className="border">{col.ownership}</TableCell>
            </TableRow>
          ))}
          {/* Total Row */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">Total:</TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(colPledge.table, 'ecmv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(colPledge.table, 'fsv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(colPledge.table, 'cov', {
                  start: 0,
                  end: 3,
                })
              )}
              %
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Immovable */}

      <div className="flex items-center justify-between gap-3 text-xl font-bold">
        Immovable
        <div className="p-2 bg-gray-100 rounded-md mx-auto">
          <span className="text-purple-500">%DEPRECIATION </span>
          {IMMOVABLE_DEPRE * 100}
        </div>
      </div>

      <Table className="border">
        <TableHeader className="h-20 p-2 bg-purple-100">
          <TableRow>
            <TableHead className="text-black border">S/N</TableHead>
            <TableHead className="text-black border">COLLATERAL NAME</TableHead>
            <TableHead className="text-black border">
              BRIEF DESCRIPTION
            </TableHead>
            <TableHead className="text-black border">YEAR</TableHead>
            <TableHead className="text-black border">
              ESTIMATED CURRENT MARKET VALUE
            </TableHead>
            <TableHead className="text-black border">
              FORCED SALE VALUE
            </TableHead>
            <TableHead className="text-black border">%COVERAGE</TableHead>
            <TableHead className="text-black border">
              <div className="border-b">COLLATERAL TITLES</div>
              <div className="flex items-center">
                <div className="border-r">DOCUMENT TYPE</div>
              </div>
            </TableHead>
            <TableHead className="text-black border">
              <div className="border-b">COLLATERAL TITLES</div>
              <div className="flex items-center">
                <div>EXPIRY DATE</div>
              </div>
            </TableHead>
            <TableHead className="text-black border">
              VEHICLE CHASIS NUMBER
            </TableHead>
            <TableHead className="text-black border">
              OWNERSHIP <br /> (BORROWER/GUARANTOR <br /> /OTHER PARTY)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colPledge.table
            .slice(4, colPledge.table.length)
            .map((col, idx, arr) => (
              <TableRow key={idx + arr.length + 1}>
                <TableCell className="border">{idx + 1}</TableCell>
                <TableCell className="border">{col.colName}</TableCell>
                <TableCell className="border">{col.desc}</TableCell>
                <TableCell className="border">{col.year}</TableCell>
                <TableCell className="border">{col.ecmv}</TableCell>
                <TableCell className="border">{col.fsv}</TableCell>
                <TableCell className="border">{col.cov}</TableCell>
                <TableCell className="border">{col.docType}</TableCell>
                <TableCell className="border">{col.expDate}</TableCell>
                <TableCell className="border">{col.chaNo}</TableCell>
                <TableCell className="border">{col.ownership}</TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">Total:</TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(colPledge.table, 'ecmv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(colPledge.table, 'fsv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(colPledge.table, 'cov', {
                  start: 4,
                  end: 6,
                })
              )}
              %
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex items-center justify-center text-purple-500 bg-gray-100 p-2 text-xl font-bold">
        COLLATERAL MIX
      </div>

      <Table className="border">
        <TableHeader className="bg-purple-100">
          <TableHead className="text-black font-bold text-xl">S/N</TableHead>
          <TableHead className="text-black font-bold text-xl">TYPE</TableHead>
          <TableHead className="text-black font-bold text-xl">
            TOTAL VALUE
          </TableHead>
          <TableHead className="text-black font-bold text-xl">%MIX</TableHead>
        </TableHeader>
        <TableBody>
          {/* 1 */}

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>MOVABLE</TableCell>
            <TableCell>
              {calculateColTotal(colPledge.table, 'fsv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.round(
                calculateColTotal(colPledge.table, 'cov', {
                  start: 0,
                  end: 3,
                })
              )}
              %
            </TableCell>
          </TableRow>

          {/* 2 */}

          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>IMMOVABLE</TableCell>
            <TableCell>
              {calculateColTotal(colPledge.table, 'fsv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.round(
                calculateColTotal(colPledge.table, 'cov', {
                  start: 4,
                  end: 6,
                })
              )}
              %
            </TableCell>
          </TableRow>

          {/* 3 */}

          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>CASH COLLATERAL</TableCell>
            <TableCell>{colPledge.cashCollateral}</TableCell>
            <TableCell>
              {(colPledge.cashCollateral / colPledge.loanAmount) * 100}%
            </TableCell>
          </TableRow>

          {/* 4 */}

          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>STOCK OF GOODS</TableCell>
            <TableCell>{colPledge.stock}</TableCell>
            <TableCell>
              {(colPledge.stock / colPledge.loanAmount) * 100}%
            </TableCell>
          </TableRow>

          {/* Sum */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">
              {(
                calculateColTotal(colPledge.table, 'fsv', {
                  start: 0,
                  end: 6,
                }) +
                colPledge.cashCollateral +
                colPledge.stock
              ).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(colPledge.table, 'cov', {
                  start: 0,
                  end: 6,
                }) +
                  (colPledge.loanAmount === 0
                    ? 0
                    : (colPledge.stock / colPledge.loanAmount) * 100) +
                  (colPledge.loanAmount === 0
                    ? 0
                    : (colPledge.cashCollateral / colPledge.loanAmount) * 100)
              )}
              %
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table className="border">
        <TableHeader>
          <TableHead className="bg-gray-100 font-bold text-black">
            COLLATERAL COVERAGE
          </TableHead>
          <TableHead className="bg-pink-100 font-bold text-black">
            {Math.round(
              calculateColTotal(colPledge.table, 'cov', {
                start: 0,
                end: 6,
              }) +
                (colPledge.loanAmount === 0
                  ? 0
                  : (colPledge.stock / colPledge.loanAmount) * 100) +
                (colPledge.loanAmount === 0
                  ? 0
                  : (colPledge.cashCollateral / colPledge.loanAmount) * 100)
            )}
            %
          </TableHead>
        </TableHeader>
      </Table>
    </div>
  )
}
