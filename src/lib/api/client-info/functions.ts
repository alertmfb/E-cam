import { ciS } from '@/components/routes/loans/client-information/lfSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

export type ClientInfoPayload = z.infer<typeof ciS> & {
  client_business_location: string
}

type RequestPayload = {
  payload: ClientInfoPayload
  loanId: string
}

type FetchParams = {
  userId: string
  loanId: string
  role: string
}

export const createClientInfo = async (req: RequestPayload) => {
  try {
    const res = await Axios.post(
      `/loan-application/client-info/create?loanId=${req.loanId}`,
      req.payload,
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
