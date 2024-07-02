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
