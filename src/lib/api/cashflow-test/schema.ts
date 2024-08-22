export type CashflowMonthData = {
  businessInflow: number
  perMargin: number
  businessExp: number
  totalExp: number
  operationalCashflow: number
  inv: number
  clientConOperational: number
  soi: number
  totalInvestmentInflow: number
  newLoan: number
  clientConInflow: number
  repaymentRunning: number
  repaymentNew: number
  repaymentOther: number
  totalFinancialInflow: number
  familyIncome: number
  familyExpenses: number
  familyNetIncome: number
  repaymentFamilyLoan: number
  totalFamilyInflow: number
  cashAtEnd: number
  firstLiquidity: number
  accuredFlow: number
}

export const DESCRIPTIONS = [
  'Business Inflow',
  '% Margin',
  'Business Expenses',
  'Total Expenses',
  'Operational Cashflow',
  'Investment',
  'Client Contribution (Capital)',
  'Sales of Immobilizations',
  'Total Inflow from Investement ',
  'New loan (Alert MFB)',
  'Client Contribution (Capital)',
  'Repayment on running loan (AlertMFB)',
  'Repayment on new loan (AlertMFB)',
  'Repayment on other loans',
  'Total Financial Inflow',
  'Family Income',
  'Family Expenses',
  'Family Net income',
  'Repayment on Family loan',
  'Total Family Inflow',
  'Cash at end of the period',
  'First Liquidity',
  'Accrued Flow',
]

const TENURE = 12
export const cashFlowMonths: CashflowMonthData[] = []

for (let i = 0; i < TENURE; i++) {
  const newMonth = {
    businessInflow: 0,
    perMargin: 0,
    businessExp: 0,
    totalExp: 0,
    operationalCashflow: 0,
    inv: 0,
    clientConOperational: 0,
    soi: 0,
    totalInvestmentInflow: 0,
    newLoan: 0,
    clientConInflow: 0,
    repaymentRunning: 0,
    repaymentNew: 0,
    repaymentOther: 0,
    totalFinancialInflow: 0,
    familyIncome: 0,
    familyExpenses: 0,
    familyNetIncome: 0,
    repaymentFamilyLoan: 0,
    totalFamilyInflow: 0,
    cashAtEnd: 0,
    firstLiquidity: 0,
    accuredFlow: 0,
  }
  cashFlowMonths.push(newMonth)
}
