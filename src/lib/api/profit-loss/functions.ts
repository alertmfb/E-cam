import { Axios } from '@/lib/axios'
import { InventoryData } from './schema'

type Payload = {
  rrows: InventoryData[]
  wm: number[]
}

export const saveData = ({ rrows, wm }: Payload) => {
  const lastRow = rrows[rrows.length - 1]
  const lastRowData = Object.values(lastRow)

  if (
    lastRowData[0] === '' ||
    lastRowData[1] === 0 ||
    lastRowData[3] === 0 ||
    lastRowData[4] === 0
  ) {
    console.log('complete rows before submitting')
    return
  }

  rrows.forEach((row, idx) => {
    row.wM = wm[idx]
  })

  console.log(rrows)
}
