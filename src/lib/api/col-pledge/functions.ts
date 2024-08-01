import { Axios } from '@/lib/axios'
import { CollateralPledgeData, CompleteCollateralData } from './schema'
import { useMutation, useQuery } from '@tanstack/react-query'

type CollateralPayload = {
  data: CompleteCollateralData
  loanId: string
}

const saveData = async ({ data, loanId }: CollateralPayload) => {
  try {
    const response = await Axios.post(
      `/loan-application/col-pledge?loanId=${loanId}`,
      {
        data,
      },
      { withCredentials: true }
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useSaveColData = () => {
  const colMut = useMutation({
    mutationFn: saveData,
    onSuccess(data) {
      if (data) {
        alert(data)
      } else {
        alert('Failed to save')
      }
    },
  })

  return colMut
}

const loadPrev = async ({
  loanId,
}: {
  loanId: string
}): Promise<CompleteCollateralData | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/col-pledge?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const usePrevColData = (loanId: string) => {
  const colQry = useQuery({
    queryKey: ['col-data'],
    queryFn: () => loadPrev({ loanId }),
  })

  return colQry
}
