import { ciS } from '@/components/routes/loans/client-information/lfSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

export type ClientInfoPayload = z.infer<typeof ciS> & {
  client_business_location: string
}

type FetchParams = {
  userId: string
  loanId: string
  role: string
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

export const fetchClientInfo = async ({
  userId,
  loanId,
  role,
}: FetchParams): Promise<ClientInfoPayload> => {
  try {
    const res = await Axios.get(
      `/loan-application/client-info/${loanId}?role=${role}&userId=${userId}`,
      { withCredentials: true }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
