import { giS } from '@/components/routes/loans/gurantors-info/giSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type GuarantorInfoPayload = z.infer<typeof giS>

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
