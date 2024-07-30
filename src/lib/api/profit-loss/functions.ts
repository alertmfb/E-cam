import { Axios } from '@/lib/axios'
import { BalanceSheetData, InventoryData, balanceSheet } from './schema'
import { useMutation, useQuery } from '@tanstack/react-query'

type Payload = {
  rrows: InventoryData[]
  wm: number[]
  loanId?: string
}

type BSPayload = {
  data: BalanceSheetData[]
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
      return 'Complete rows before submitting'
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

export const getLastSaved = async ({
  loanId,
}: {
  loanId: string
}): Promise<Payload['rrows'] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/pl/inventory?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const sendBalanceSheet = async ({ data, loanId }: BSPayload) => {
  try {
    const response = await Axios.post(
      `/loan-application/pl/balance-sheet?loanId=${loanId}`,
      {
        balanceSheet: data,
      },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useSendBS = () => {
  const sendMut = useMutation({
    mutationFn: sendBalanceSheet,
    onSuccess(data) {
      if (data) {
        alert('Saved')
      }
    },
  })

  return sendMut
}

const getBalanceSheet = async ({
  loanId,
}: {
  loanId: string
}): Promise<BalanceSheetData[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/pl/balance-sheet?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetBS = (loanId: string) => {
  const bsQry = useQuery({
    queryKey: ['bsData'],
    queryFn: () => getBalanceSheet({ loanId }),
  })

  return bsQry
}
