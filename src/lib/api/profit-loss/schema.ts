export type InventoryData = {
  item: string
  quantity: number
  value: number
  sellingPrice: number
  costPrice: number
  profit: number
  margin: number
  wM: number
}

export function calculateTotal(
  arr: InventoryData[],
  column: keyof Omit<InventoryData, 'item'>
): number {
  const total = arr.map((obj, i) => obj[column]).reduce((a, c) => a + c)

  return total
}

export type BalanceSheetData = {
  name: string
  amount: number
  percentage: number
}

export const balanceSheet = [
  {
    name: 'Cash at Hand',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Alert MFB',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Balances in other Banks',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL TREASURY',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Receivables (Credit Sales)',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Advance paid to suppliers',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL RECEIVABLES',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL STOCK',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL SHORT-TERM ASSETS',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Equipment and furniture',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Vehicles',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Land and House',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL BUSINESS FIXED ASSETS',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Equipment and furniture',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Vehicles',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Land and House',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL FAMILY FIXED ASSETS',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL FIXED ASSETS',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL ASSETS',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Advance received from customers',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Payables (Credit Supplies)',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'ALERT MFB Loan',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Other banks loan (Outstanding loan bal)',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL SHORT-TERM LIABILITIES',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Alert MFB long-term loan',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'Other banks long-term loans',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL LONG-TERM LIABILITIES',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL LIABILITIES',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL EQUITY (TOTAL ASSETS - TOTAL LIABILITIES',
    amount: 0,
    percentage: 0,
  },
  {
    name: 'TOTAL EQUITY + LIABILITIES',
    amount: 0,
    percentage: 0,
  },
]

export const compileBSData = (
  bs: BalanceSheetData[],
  totalTreasury: number,
  totalReceivables: number,
  totalShortTermAssets: number,
  totalBusinessFixedAssets: number,
  totalFamilyFixedAssets: number,
  totalFixedAssets: number,
  totalAssets: number,
  totalShortTermLiabilities: number,
  totalLongTermLiabilities: number,
  totalLiabilities: number,
  totalEquity: number,
  totalEquityAndLiabilities: number
): BalanceSheetData[] => {
  bs[3].amount = totalTreasury
  bs[6].amount = totalReceivables
  bs[8].amount = totalShortTermAssets
  bs[12].amount = totalBusinessFixedAssets
  bs[16].amount = totalFamilyFixedAssets
  bs[17].amount = totalFixedAssets
  bs[18].amount = totalAssets
  bs[23].amount = totalShortTermLiabilities
  bs[26].amount = totalLongTermLiabilities
  bs[27].amount = totalLiabilities
  bs[28].amount = totalEquity
  bs[29].amount = totalEquityAndLiabilities

  bs.forEach((row) => {
    if (totalAssets > 0) {
      const per = Math.round((row.amount / totalAssets) * 100)
      row.percentage = per
    }
  })

  return bs
}

export type OtherBankData = {
  bankName: string
  accName: string
  accNo: string
  bal: number
}

export const compileBD = () => {}
