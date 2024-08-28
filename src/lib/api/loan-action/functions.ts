import { z } from 'zod'
import {
  loanActionSchema,
  loanRejectionSchema,
} from '../../../components/routes/loans/loan-action/laSchema'
import { Axios } from '@/lib/axios'
import { FindUserResponse } from '../find/functions'
import { useQuery } from '@tanstack/react-query'

type ApprovalPayload = z.infer<typeof loanActionSchema>
type RejectionPayload = z.infer<typeof loanRejectionSchema>

type ApprovalParams = {
  institutionId?: string
  loanId: string
  role: string
  userId: string
  branchId: string
}
type MutationData = {
  payload: ApprovalPayload & {
    senderName: string
    senderEmail: string
    recepients: FindUserResponse[]
  }
  params: ApprovalParams
}

type RejectionData = {
  payload: RejectionPayload & {
    senderName: string
    senderEmail: string
    recepients: FindUserResponse[]
  }
  params: ApprovalParams
}

export const approveLoanApplication = async ({
  payload,
  params,
}: MutationData) => {
  try {
    const res = await Axios.post(
      `/loan-application/${params.loanId}/approve?role=${params.role}&branchId=${params.branchId}&loanId=${params.loanId}&institutionId=${params.institutionId}`,
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

const findFinalAproval = async ({
  loanId,
}: {
  loanId: string
}): Promise<{ customer_name: string } | undefined> => {
  try {
    const response = await Axios.get(`/loan-application/approved/${loanId}`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useFinalApproval = (loanId: string) => {
  const faQry = useQuery({
    queryKey: ['loan-final-check'],
    queryFn: () => findFinalAproval({ loanId }),
  })

  return faQry
}
