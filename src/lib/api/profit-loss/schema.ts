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

const rows: InventoryData[] = [
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
  {
    item: '',
    quantity: 0,
    value: 0,
    sellingPrice: 0,
    costPrice: 0,
    profit: 0,
    margin: 0,
    wM: 0,
  },
]

const updateCell = (
  value: string | number,
  rowIdx: number,
  cell: keyof InventoryData
) => {
  if (cell === 'item') {
    rows[rowIdx][cell] = value as string
  } else {
    rows[rowIdx][cell] = value as number
  }
}

export { rows, updateCell }
