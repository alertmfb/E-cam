import { Axios } from '@/lib/axios'
import {
  BalanceSheetData,
  InventoryData,
  OtherBankData,
  balanceSheet,
} from './schema'
import { useMutation, useQuery } from '@tanstack/react-query'

export type InventoryPayload = {
  rrows: InventoryData[]
  wm: number[]
  loanId?: string
}

type BSPayload = {
  data: BalanceSheetData[]
  loanId?: string
}

type OBPayload = {
  data: OtherBankData[]
  loanId?: string
}

export const saveData = async ({ rrows, wm, loanId }: InventoryPayload) => {
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
}): Promise<InventoryPayload['rrows'] | undefined> => {
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

const sendOtherBalances = async ({ data, loanId }: OBPayload) => {
  try {
    const response = await Axios.post(
      `/loan-application/pl/other-bank?loanId=${loanId}`,
      {
        otherBalances: data,
      },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useSendOB = () => {
  const obMut = useMutation({
    mutationFn: sendOtherBalances,
    onSuccess(data) {
      if (data) {
        alert(data)
      } else {
        alert('Failed to save')
      }
    },
  })

  return obMut
}

const getOtherBalances = async ({
  loanId,
}: {
  loanId: string
}): Promise<OtherBankData[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/pl/other-bank?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetOB = (loanId: string) => {
  const obQry = useQuery({
    queryKey: ['otherBankData'],
    queryFn: () => getOtherBalances({ loanId }),
  })

  return obQry
}

type TotalPLdata = {
  inventory: InventoryData[]
  balanceSheet: BalanceSheetData[]
  otherBalances: OtherBankData[]
}

const getTotal = async ({
  loanId,
}: {
  loanId: string
}): Promise<TotalPLdata | undefined> => {
  try {
    const response = await Axios.get(`/loan-application/pl?loanId=${loanId}`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetPL = (loanId: string) => {
  const plQry = useQuery({
    queryKey: ['total-pl'],
    queryFn: () => getTotal({ loanId }),
  })

  return plQry.data
}
