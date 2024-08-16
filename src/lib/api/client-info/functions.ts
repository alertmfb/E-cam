import { ciS } from '@/components/routes/loans/client-information/lfSchema'
import { Axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export type ClientInfoPayload = z.infer<typeof ciS> & {
  client_business_location: string
  customer_bvn: string
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

export const fetchBvn = async ({
  loanId,
}: {
  loanId: string
}): Promise<string | null> => {
  try {
    const res = await Axios.get(`/loan-application/bvn?loanId=${loanId}`, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
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

const uploadClientImage = async ({
  loanId,
  image,
}: {
  loanId: string
  image: FormData
}) => {
  try {
    const response = await Axios.post(
      `/loan-application/client-info/${loanId}/upload-image`,
      image,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadClientImage = () => {
  const upMut = useMutation({
    mutationFn: uploadClientImage,
    onSuccess(data, variables, context) {
      if (data) {
        alert('image uploaded')
      }
    },
  })

  return upMut
}
