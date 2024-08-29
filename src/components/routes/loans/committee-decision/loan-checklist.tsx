import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import {
  LoanCheckList,
  loanChecklist,
} from '@/lib/api/committee-decision/schema'
import {
  useLoanCheckList,
  useUploadLoanCheckList,
} from '@/lib/api/committee-decision/functions'

export const CheckListTable = ({ loanId }: { loanId: string }) => {
  const [lc, setLc] = useState<LoanCheckList>(loanChecklist)

  const { data: checkList } = useLoanCheckList(loanId)
  const loadPrev = () => {
    if (checkList) {
      setLc(checkList)
    }
  }

  const uploadLoanCheckList = useUploadLoanCheckList()
  const upload = () => {
    uploadLoanCheckList.mutate({ loanId: loanId, loanChecklist: lc })
  }
  return (
    <div className="w-full space-y-4 pb-4">
      {checkList && (
        <Button onClick={loadPrev} variant={'secondary'}>
          Load Previously Saved
        </Button>
      )}
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
              <Checkbox
                checked={lc.vehicleLicense}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, vehicleLicense: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">a) Deed of Assignment</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.deedOfAssignment}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, deedOfAssignment: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">b) Proof of ownership</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.proofOwnership}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, proofOwnership: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">
              b) Certificate of Occupancy (C of O)
            </TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.certificateOccupancy}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, certificateOccupancy: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">c) Insuance</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.insurance}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, insurance: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">
              c) Survey Plan/Purchase receipt
            </TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.surveyPlan}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, surveyPlan: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">d) Road Worthiness</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.roadWorthiness}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, roadWorthiness: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">d) Valuation report</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.valuationReport}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, valuationReport: checked as boolean })
                }
              />
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
              <Checkbox
                checked={lc.offerLetter}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, offerLetter: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">h) Visitation Report</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.vr}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, vr: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">b) Repayment Schedule</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.repaymentSchedule}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, repaymentSchedule: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">i) Vehicle Tracing</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.vt}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, vt: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">c) CAC Document</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.cacDocument}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, cacDocument: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">j) Pledged Deed</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.pledgeDeed}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, pledgeDeed: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">d) Client's Cheque leaves</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.ccl}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, ccl: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">k) Deed of Conveyance</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.deedOfConveyance}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, deedOfConveyance: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">
              e) Guarantor(s)'s Cheque leaves
            </TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.gcl}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, gcl: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">i) Consent Letter</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.consentLetter}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, consentLetter: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">f) Bank account statement</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.accountStatement}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, accountStatement: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">m) Sworn Affidavit</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.swornAffidavit}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, swornAffidavit: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border">
              g) Colored picture of the pledged property
            </TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.picture}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, picture: checked as boolean })
                }
              />
            </TableCell>
            <TableCell className="border">n) Security agreement</TableCell>
            <TableCell className="border">
              <Checkbox
                checked={lc.securityAgreement}
                onCheckedChange={(checked) =>
                  setLc({ ...lc, securityAgreement: checked as boolean })
                }
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center gap-3">
        {/* <Button onClick={() => console.log(lc)}>Log</Button> */}
        <Button onClick={upload}>Save</Button>
      </div>
    </div>
  )
}
