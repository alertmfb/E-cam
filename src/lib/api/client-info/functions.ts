import { ciS } from '@/components/routes/loans/client-information/lfSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type ClientInfoPayload = z.infer<typeof ciS> & {
  client_business_location: string
}

export const createClientInfo = async (payload: ClientInfoPayload) => {
  try {
    const res = await Axios.post(
      '/loan-application/client-info/create',
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
