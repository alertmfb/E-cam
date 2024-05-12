import { laS } from '@/components/routes/loans/loan-application/laSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type QueryParams = {
  institutionId?: string
  branchId: string
  userId: string
  role: string
}
type LoanApplicationPayload = z.infer<typeof laS>

type LoanApplication = LoanApplicationPayload & {
  id: string
  created_at: string
}

type PendingApplication = Omit<LoanApplication, 'customer_bvn'> & {
  loan_officer_name: string
}

type StatusApplication = Omit<LoanApplication, 'customer_bvn'> & {
  loan_officer?: string
  rm_approval_amount?: string
  rm_approval_comment?: string
}

type SingleStatusApplication = Omit<LoanApplication, 'customer_bvn'> & {
  bm_status: string
  bm_approval_amount: string
  bm_approval_comment: string
  rm_status: string
  rm_approval_amount: string
  rm_approval_comment: string
}

type RejectedApplcation = PendingApplication & {
  loan_amount: string
  customer_name: string
  bm_status: string
  bm_rejection_comment: string
  rm_status: string
  rm_rejection_comment: string
}

type CreateApplicationData = {
  payload: LoanApplicationPayload
  userId: string
  branchId: string
  institutionId: string
}

export type Branch = {
  id: string
  name: string
}

// Loan Officer Endpoints

export const createLoanApplication = async ({
  payload,
  userId,
  branchId,
  institutionId,
}: CreateApplicationData) => {
  try {
    const res = await Axios.post(
      `/loan-application/create?userId=${userId}&branchId=${branchId}&institutionId=${institutionId}`,
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

export const getIncompleteApplications = async ({
  id,
}: {
  id: string
}): Promise<LoanApplication[] | undefined> => {
  try {
    const res = await Axios.get(`/loan-application/incomplete?userId=${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const deleteLoanApplocation = async () => {}

/**
 * Shared Endpoints
 */

export const getBranches = async ({
  institutionId,
}: {
  institutionId: string
}): Promise<Branch[]> => {
  try {
    const res = await Axios.get(
      `/loan-application/branches/?institutionId=${institutionId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const getLoanApplicationsByBranch = async ({
  branchId,
  userId,
  role,
}: QueryParams): Promise<PendingApplication[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}?role=${role}&userId=${userId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const getLoanApplicationStatusById = async ({
  branchId,
  userId,
  role,
  loanId,
}: QueryParams & { loanId: string }): Promise<SingleStatusApplication> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}/status/${loanId}?role=${role}&userId=${userId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

// TODO: change the return type for this function
export const getLoanApplicationStatus = async ({
  institutionId,
  branchId,
  userId,
  role,
}: QueryParams): Promise<StatusApplication[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}/status?role=${role}&userId=${userId}&institutionId=${institutionId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const fetchRejectedApplications = async ({
  branchId,
  userId,
  role,
}: QueryParams): Promise<RejectedApplcation[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}/rejected?role=${role}&userId=${userId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

// TODO: Change the return type for this function
export const getRejectedApplicationById = async ({
  branchId,
  userId,
  role,
  loanId,
}: QueryParams & { loanId: string }): Promise<RejectedApplcation> => {
  try {
    const res = await Axios.get(
      `/loan-application/rejected/${loanId}?role=${role}&userId=${userId}&branchId=${branchId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
