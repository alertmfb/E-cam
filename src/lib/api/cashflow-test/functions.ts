import { Axios } from '@/lib/axios'
import { CashflowMonthData } from './schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type CashflowPayload = {
  margin: number
  months: CashflowMonthData[]
}

const uploadCashflow = async ({
  loanId,
  cashflow,
}: {
  loanId: string
  cashflow: CashflowPayload
}) => {
  try {
    const response = await Axios.post(
      `/loan-application/cashflow/${loanId}`,
      { cashflow: cashflow },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadCashflow = () => {
  const qc = useQueryClient()
  const ucMut = useMutation({
    mutationFn: uploadCashflow,
    onSuccess(data) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['cashflow-data'] })
        alert('Uploaded')
      } else {
        alert('Failed to upload')
      }
    },
  })
  return ucMut
}

const getCashflow = async ({
  loanId,
}: {
  loanId: string
}): Promise<CashflowPayload | undefined> => {
  try {
    const response = await Axios.get(`/loan-application/cashflow/${loanId}`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useCashflow = (loanId: string) => {
  const cfQry = useQuery({
    queryKey: ['cashflow-data'],
    queryFn: () => getCashflow({ loanId }),
  })

  return cfQry
}
