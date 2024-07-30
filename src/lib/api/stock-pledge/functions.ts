import { Axios } from '@/lib/axios'
import { InventoryPayload } from '../profit-loss/functions'
import { useMutation, useQuery } from '@tanstack/react-query'

const saveData = async ({ rrows, wm, loanId }: InventoryPayload) => {
  try {
    const lastRow = rrows[rrows.length - 1]
    const lastRowData = Object.values(lastRow)

    if (
      lastRowData[0] === '' ||
      lastRowData[1] === 0 ||
      lastRowData[3] === 0 ||
      lastRowData[4] === 0
    ) {
      return 'Complete rows before submitting'
    }

    rrows.forEach((row, idx) => {
      row.wM = wm[idx]
    })

    const response = await Axios.post(
      `/loan-application/stock-pledge/inventory?loanId=${loanId}`,
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

export const useSaveStockInventory = () => {
  const addMutation = useMutation({
    mutationFn: saveData,
    onSuccess(data) {
      if (data) {
        alert(data)
      } else {
        alert('Failed to save')
      }
    },
  })

  return addMutation
}

const getLastSaved = async ({
  loanId,
}: {
  loanId: string
}): Promise<InventoryPayload['rrows'] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/stock-pledge/inventory?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const usePrevStockInventory = (loanId: string) => {
  const prev = useQuery({
    queryKey: ['prev-stock-inventory'],
    queryFn: () => getLastSaved({ loanId }),
  })

  return prev.data
}
