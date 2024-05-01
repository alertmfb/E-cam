import { rS } from '@/components/routes/loans/references/rSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type ReferencePayload = z.infer<typeof rS>

export const createFamilyReference = async (payload: ReferencePayload) => {
  try {
    const res = await Axios.post(
      '/loan-application/reference/family',
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
