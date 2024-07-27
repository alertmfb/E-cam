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
]
