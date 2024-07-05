import { Axios } from '@/lib/axios'
import { InventoryData } from './schema'

type Payload = {
  rrows: InventoryData[]
  wm: number[]
  loanId?: string
}

export const saveData = async ({ rrows, wm, loanId }: Payload) => {
  try {
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

    const response = await Axios.post(
      `/loan-application/pl/inventory?loanId=${loanId}`,
      {
        inventory: rrows,
      },
      { withCredentials: true }
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}
