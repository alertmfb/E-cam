import { Axios } from '@/lib/axios'
import { InventoryData } from './schema'

type Payload = {
  rrows: InventoryData[]
  wm: number[]
}

export const saveData = ({ rrows, wm }: Payload) => {
  console.log(wm)
  const lastRowIndex = rrows.indexOf(rrows[rrows.length - 1])

  if (wm.length === 0) {
    console.log('complete the row before you send')
  }

  if (!wm[lastRowIndex] && wm.length > 0) {
    console.log('Delete unused rows')
    return
  }

  rrows.forEach((row, idx) => {
    row.wM = wm[idx]
  })

  console.log(rrows)

  // try {
  // } catch (e) {}
}
