import { z } from 'zod'
import { loanActionSchema } from './laSchema'
import { Axios } from '@/lib/axios'

type ApprovalPayload = z.infer<typeof loanActionSchema>
type ApprovalParams = {
  loanId: string
  role: string
  userId: string
  branchId: string
}
type MutationData = {
  payload: ApprovalPayload
  params: ApprovalParams
}

export const approveLoanApplication = async ({
  payload,
  params,
}: MutationData) => {
  try {
    const res = await Axios.post(
      `/loan-application/${params.loanId}/approve`,
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
