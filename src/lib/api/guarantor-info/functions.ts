import { giS } from '@/components/routes/loans/gurantors-info/giSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

export type GuarantorInfoPayload = z.infer<typeof giS>
type FetchParams = {
  userId: string
  loanId: string
  role: string
}

export const createGuarantorInfo = async (payload: GuarantorInfoPayload) => {
  try {
    const res = await Axios.post(
      '/loan-application/guarantor-info/create',
      payload,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const fetchGuarantorInfo = async ({
  userId,
  loanId,
  role,
}: FetchParams): Promise<GuarantorInfoPayload[]> => {
  try {
    const res = await Axios.get(
      `/loan-application/guarantor-info/${loanId}?role=${role}&userId=${userId}`,
      { withCredentials: true }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
