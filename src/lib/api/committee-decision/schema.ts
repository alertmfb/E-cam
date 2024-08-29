export type CommitteeDecisionData = {
  name: string
  designation: string
  amount: number
  duration: string
  ccd: number
  uf: number
  ir: number
  comment: string
  date: string
}

export type LoanCheckList = {
  vehicleLicense: boolean
  proofOwnership: boolean
  insurance: boolean
  roadWorthiness: boolean
  deedOfAssignment: boolean
  certificateOccupancy: boolean
  surveyPlan: boolean
  valuationReport: boolean
  offerLetter: boolean
  repaymentSchedule: boolean
  cacDocument: boolean
  ccl: boolean
  gcl: boolean
  accountStatement: boolean
  picture: boolean
  vr: boolean
  vt: boolean
  pledgeDeed: boolean
  deedOfConveyance: boolean
  consentLetter: boolean
  swornAffidavit: boolean
  securityAgreement: boolean
}

export const committeeDecision: CommitteeDecisionData[] = [
  {
    name: '',
    designation: '',
    amount: 0,
    duration: '',
    ccd: 0,
    uf: 0,
    ir: 0,
    comment: '',
    date: '',
  },
]

export const loanChecklist: LoanCheckList = {
  vehicleLicense: false,
  proofOwnership: false,
  insurance: false,
  roadWorthiness: false,
  deedOfAssignment: false,
  certificateOccupancy: false,
  surveyPlan: false,
  valuationReport: false,
  offerLetter: false,
  repaymentSchedule: false,
  cacDocument: false,
  ccl: false,
  gcl: false,
  accountStatement: false,
  picture: false,
  vr: false,
  vt: false,
  pledgeDeed: false,
  deedOfConveyance: false,
  consentLetter: false,
  swornAffidavit: false,
  securityAgreement: false,
}
