export type VisitReportData = {
  questionnaire: string
  lo: string
  bm: string
  location: string
  remark: string
}

const QUESTIONS = [
  "Did you visit the client's business?",
  "Did you visit the client's residence?",
  'Did you see the client during the visit?',
  "Is the client's business capable of repaying the loan?",
  'Did you see the collateral pledged by the client?',
  "Did you visit the guarator(s)'s business?",
  'Did you see the guarantor(s) during the visit?',
  'Are the guarantor(s) capable of to stand as one for the loan?',
]

export const visitReport: VisitReportData[] = [
  { questionnaire: QUESTIONS[0], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[1], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[2], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[3], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[4], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[5], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[6], bm: '', lo: '', location: '', remark: '' },
  { questionnaire: QUESTIONS[7], bm: '', lo: '', location: '', remark: '' },
]
