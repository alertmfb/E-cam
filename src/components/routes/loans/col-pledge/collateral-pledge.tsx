import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableFooter,
} from '@/components/ui/table'
import { usePrevColData, useSaveColData } from '@/lib/api/col-pledge/functions'
import {
  CollateralPledgeData,
  calculateColTotal,
  collateralPledge,
  compileCollateralData,
} from '@/lib/api/col-pledge/schema'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'

export const CollateralPledge = ({ loanId }: { loanId: string }) => {
  const [rows, setRows] = useState<CollateralPledgeData[]>(collateralPledge)
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [cashCollateral, setCashCollateral] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const MOVABLE_DEPRE = 0.35
  const IMMOVABLE_DEPRE = 0.3

  const { data: prevData } = usePrevColData(loanId)
  const loadPrev = () => {
    if (prevData) {
      setRows(prevData.table)
      setLoanAmount(prevData.loanAmount)
      setCashCollateral(prevData.cashCollateral)
      setStock(prevData.stock)
    }
  }

  const updateCell = (
    idx: number,
    col: keyof CollateralPledgeData,
    value: string | number
  ) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...prev[i], [col]: value } : row))
    )
    updateFSV(idx)
    updateCoverage(idx)
  }

  const updateFSV = (idx: number) => {
    let depreciation = 0
    if (idx <= 3) {
      depreciation = MOVABLE_DEPRE
    } else {
      depreciation = IMMOVABLE_DEPRE
    }

    setRows((prev) =>
      prev.map((row, i) =>
        i === idx
          ? { ...prev[i], fsv: prev[i].ecmv - depreciation * prev[i].ecmv }
          : row
      )
    )
  }

  const updateCoverage = (idx: number) => {
    loanAmount === 0
      ? setRows((prev) =>
          prev.map((row, i) => (i === idx ? { ...prev[i], cov: 0 } : row))
        )
      : setRows((prev) =>
          prev.map((row, i) =>
            i === idx
              ? { ...prev[i], cov: (prev[i].fsv / loanAmount) * 100 }
              : row
          )
        )
  }

  const updateLoanAmount = (val: number) => {
    setLoanAmount(val)
    setRows((prev) =>
      prev.map((row, i) =>
        val > 0 ? { ...prev[i], cov: (row.fsv / val) * 100 } : prev[i]
      )
    )
  }

  const saveData = useSaveColData()

  const submit = () => {
    saveData.mutate({
      data: compileCollateralData(rows, loanAmount, cashCollateral, stock),
      loanId: loanId,
    })
  }

  return (
    <div className="w-full space-y-4 py-3">
      {prevData && (
        <Button onClick={() => loadPrev()} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
      <div className="flex items-center justify-between gap-3 text-xl font-bold flex-1 flex-wrap">
        Movable
        <div className="p-2 bg-gray-100 rounded-md">
          <div className="text-purple-500 text-wrap">%DEPRECIATION</div>{' '}
          {MOVABLE_DEPRE * 100}
        </div>
        <div className="flex items-center gap-2">
          <Label className="font-semibold text-base">Loan Amount:</Label>
          <Input
            type="number"
            onChange={(e) =>
              updateLoanAmount(
                parseFloat(e.target.value === '' ? '0' : e.target.value)
              )
            }
            value={loanAmount === 0 ? '' : loanAmount}
            className="w-32 text-sm font-normal placeholder:text-sm placeholder:font-normal"
          />
        </div>
      </div>

      {/* Movable Collateral Table */}

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
          {rows.slice(0, 4).map((col, idx) => (
            <TableRow key={idx}>
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">
                <Input
                  id={'cn' + idx}
                  onChange={(e) => updateCell(idx, 'colName', e.target.value)}
                  value={col.colName}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'bd' + idx}
                  onChange={(e) => updateCell(idx, 'desc', e.target.value)}
                  value={col.desc}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'yr' + idx}
                  onChange={(e) => updateCell(idx, 'year', e.target.value)}
                  className="min-w-20"
                  value={col.year}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ec' + idx}
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'ecmv',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  className="min-w-24"
                  value={col.ecmv === 0 ? '' : col.ecmv}
                />
              </TableCell>
              <TableCell className="border bg-gray-100">
                <Input
                  id={'fs' + idx}
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'fsv',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  readOnly
                  className="min-w-24"
                  value={col.fsv === 0 ? '' : col.fsv.toLocaleString()}
                />
              </TableCell>
              <TableCell className="border bg-gray-100">
                <Input
                  id={'cv' + idx}
                  readOnly
                  onChange={(e) =>
                    updateCell(
                      idx,
                      'cov',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  value={col.cov === 0 ? '' : Math.round(col.cov) + '%'}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'dt' + idx}
                  onChange={(e) => updateCell(idx, 'docType', e.target.value)}
                  value={col.docType}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ed' + idx}
                  onChange={(e) => updateCell(idx, 'expDate', e.target.value)}
                  value={col.expDate}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'chn' + idx}
                  onChange={(e) => updateCell(idx, 'chaNo', e.target.value)}
                  value={col.chaNo}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ow' + idx}
                  onChange={(e) => updateCell(idx, 'ownership', e.target.value)}
                  value={col.ownership}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">Total:</TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(rows, 'ecmv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(rows, 'fsv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(rows, 'cov', {
                  start: 0,
                  end: 3,
                })
              )}
              %
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-3 text-xl font-bold">
        Immovable
        <div className="p-2 bg-gray-100 rounded-md mx-auto">
          <span className="text-purple-500">%DEPRECIATION </span>
          {IMMOVABLE_DEPRE * 100}
        </div>
      </div>

      {/* Immovable Collateral Table */}

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
          {rows.slice(4, rows.length).map((col, idx, arr) => (
            <TableRow key={idx + arr.length + 1}>
              <TableCell className="border">
                {idx + arr.length + 1 + 1}
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'cn' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'colName', e.target.value)
                  }
                  value={col.colName}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'bd' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'desc', e.target.value)
                  }
                  value={col.desc}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'yr' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'year', e.target.value)
                  }
                  className="min-w-20"
                  value={col.year}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ec' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(
                      idx + arr.length + 1,
                      'ecmv',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  className="min-w-24"
                  value={col.ecmv === 0 ? '' : col.ecmv}
                />
              </TableCell>
              <TableCell className="border bg-gray-100">
                <Input
                  id={'fs' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(
                      idx + arr.length + 1,
                      'fsv',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  readOnly
                  className="min-w-24"
                  value={col.fsv === 0 ? '' : col.fsv.toLocaleString()}
                />
              </TableCell>
              <TableCell className="border bg-gray-100">
                <Input
                  id={'cv' + idx + arr.length + 1}
                  readOnly
                  onChange={(e) =>
                    updateCell(
                      idx + arr.length + 1,
                      'cov',
                      parseFloat(e.target.value === '' ? '0' : e.target.value)
                    )
                  }
                  value={col.cov === 0 ? '' : col.cov + '%'}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'dt' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'docType', e.target.value)
                  }
                  value={col.docType}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ed' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'expDate', e.target.value)
                  }
                  value={col.expDate}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'chn' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(idx + arr.length + 1, 'chaNo', e.target.value)
                  }
                  value={col.chaNo}
                />
              </TableCell>
              <TableCell className="border">
                <Input
                  id={'ow' + idx + arr.length + 1}
                  onChange={(e) =>
                    updateCell(
                      idx + arr.length + 1,
                      'ownership',
                      e.target.value
                    )
                  }
                  value={col.ownership}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">Total:</TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(rows, 'ecmv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              N
              {calculateColTotal(rows, 'fsv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(rows, 'cov', {
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
              {calculateColTotal(rows, 'fsv', {
                start: 0,
                end: 3,
              }).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.round(
                calculateColTotal(rows, 'cov', {
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
              {calculateColTotal(rows, 'fsv', {
                start: 4,
                end: 6,
              }).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.round(
                calculateColTotal(rows, 'cov', {
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
            <TableCell>
              <Input
                type="number"
                onChange={(e) =>
                  setCashCollateral(
                    parseFloat(e.target.value === '' ? '0' : e.target.value)
                  )
                }
                value={cashCollateral === 0 ? '' : cashCollateral}
              />
            </TableCell>
            <TableCell>
              {loanAmount === 0 ? 0 : (cashCollateral / loanAmount) * 100}%
            </TableCell>
          </TableRow>

          {/* 4 */}

          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>STOCK OF GOODS</TableCell>
            <TableCell>
              <Input
                onChange={(e) =>
                  setStock(
                    parseFloat(e.target.value === '' ? '0' : e.target.value)
                  )
                }
                value={stock === 0 ? '' : stock}
              />
            </TableCell>
            <TableCell>
              {loanAmount === 0 ? 0 : (stock / loanAmount) * 100}%
            </TableCell>
          </TableRow>

          {/* Sum */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="bg-pink-100 font-bold">
              {(
                calculateColTotal(rows, 'fsv', {
                  start: 0,
                  end: 6,
                }) +
                cashCollateral +
                stock
              ).toLocaleString()}
            </TableCell>
            <TableCell className="font-bold">
              {Math.round(
                calculateColTotal(rows, 'cov', {
                  start: 0,
                  end: 6,
                }) +
                  (loanAmount === 0 ? 0 : (stock / loanAmount) * 100) +
                  (loanAmount === 0 ? 0 : (cashCollateral / loanAmount) * 100)
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
              calculateColTotal(rows, 'cov', {
                start: 0,
                end: 6,
              }) +
                (loanAmount === 0 ? 0 : (stock / loanAmount) * 100) +
                (loanAmount === 0 ? 0 : (cashCollateral / loanAmount) * 100)
            )}
            %
          </TableHead>
        </TableHeader>
      </Table>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => console.log(rows)}>
          Log Data
        </Button>

        <Button onClick={() => submit()}>Save</Button>
      </div>
    </div>
  )
}
