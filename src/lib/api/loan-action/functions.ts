import { z } from 'zod'
import {
  loanActionSchema,
  loanRejectionSchema,
} from '../../../components/routes/loans/loan-action/laSchema'
import { Axios } from '@/lib/axios'

type ApprovalPayload = z.infer<typeof loanActionSchema>
type RejectionPayload = z.infer<typeof loanRejectionSchema>

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

type RejectionData = {
  payload: RejectionPayload
  params: ApprovalParams
}

export const approveLoanApplication = async ({
  payload,
  params,
}: MutationData) => {
  try {
    const res = await Axios.post(
      `/loan-application/${params.loanId}/approve?role=${params.role}&branchId=${params.branchId}`,
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

export const rejectLoanApplication = async ({
  payload,
  params,
}: RejectionData) => {
  try {
    const res = await Axios.post(
      `/loan-application/${params.loanId}/reject?role=${params.role}&branchId=${params.branchId}`,
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
