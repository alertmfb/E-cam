import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useLoanCheckList } from '@/lib/api/committee-decision/functions'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const LoanCheckListData = ({ loanId }: { loanId: string }) => {
  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            <div>Loan Checklist</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>
            To be completed by the Credit Department
          </CardDescription>
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
  const { data: checkList } = useLoanCheckList(loanId)

  if (!checkList) {
    return <div></div>
  }

  return (
    <div className="w-full space-y-4 pb-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-pink-200">
            <TableHead className="text-black border">
              VEHICLE PAPERS PROVIDED
            </TableHead>
            <TableHead className="text-black border">Tick</TableHead>
            <TableHead className="text-black border">
              LEGAL MORTGAGE PROVIDED
            </TableHead>
            <TableHead className="text-black border">Tick</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="border">a) Vehicle License</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.vehicleLicense} disabled />
            </TableCell>
            <TableCell className="border">a) Deed of Assignment</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.deedOfAssignment} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">b) Proof of ownership</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.proofOwnership} disabled />
            </TableCell>
            <TableCell className="border">
              b) Certificate of Occupancy (C of O)
            </TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.certificateOccupancy} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">c) Insuance</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.insurance} disabled />
            </TableCell>
            <TableCell className="border">
              c) Survey Plan/Purchase receipt
            </TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.surveyPlan} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">d) Road Worthiness</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.roadWorthiness} disabled />
            </TableCell>
            <TableCell className="border">d) Valuation report</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.valuationReport} disabled />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* Second Table */}
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-pink-200">
            <TableHead className="text-black border">
              LOAN SUPPORT DOCUMENT
            </TableHead>
            <TableHead className="text-black border">Tick</TableHead>
            <TableHead className="text-black border">
              LOAN SUPPORT DOCUMENT
            </TableHead>
            <TableHead className="text-black border">Tick</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="border">a) Offer Letter</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.offerLetter} disabled />
            </TableCell>
            <TableCell className="border">h) Visitation Report</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.vr} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">b) Repayment Schedule</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.repaymentSchedule} disabled />
            </TableCell>
            <TableCell className="border">i) Vehicle Tracing</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.vt} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">c) CAC Document</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.cacDocument} disabled />
            </TableCell>
            <TableCell className="border">j) Pledged Deed</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.pledgeDeed} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">d) Client's Cheque leaves</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.ccl} disabled />
            </TableCell>
            <TableCell className="border">k) Deed of Conveyance</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.deedOfConveyance} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">
              e) Guarantor(s)'s Cheque leaves
            </TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.gcl} disabled />
            </TableCell>
            <TableCell className="border">i) Consent Letter</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.consentLetter} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">f) Bank account statement</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.accountStatement} disabled />
            </TableCell>
            <TableCell className="border">m) Sworn Affidavit</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.swornAffidavit} disabled />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">
              g) Colored picture of the pledged property
            </TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.picture} disabled />
            </TableCell>
            <TableCell className="border">n) Security agreement</TableCell>
            <TableCell className="border">
              <Checkbox checked={checkList.securityAgreement} disabled />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
