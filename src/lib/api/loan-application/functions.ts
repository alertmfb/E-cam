import { laS } from '@/components/routes/loans/loan-application/laSchema'
import { Axios } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
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
  status?: string
  loan_officer?: string
  branch?: string
  institution?: string
  final_approval?: string
}

type SingleStatusApplication = Omit<LoanApplication, 'customer_bvn'> & {
  bm_status: string
  bm_approval_amount: string
  bm_approval_comment: string
  reg_status: string
  reg_approval_amount: string
  reg_approval_comment: string
  final_approval?: string
  final_approval_amount?: string
  final_approval_comment?: string
}

type RejectedApplcation = PendingApplication & {
  loan_amount: string
  customer_name: string
  branch?: string
  institution?: string
  loan_officer?: string
  bm_status: string
  bm_rejection_comment: string
  reg_status: string
  reg_rejection_comment: string
  final_approval?: string
  final_rejection_comment?: string
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
  institutionId,
  branchId,
  userId,
  role,
  loanId,
}: QueryParams & { loanId: string }): Promise<SingleStatusApplication> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}/status/${loanId}?role=${role}&userId=${userId}&institutionId=${institutionId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const getExecLoanApplicationStatusById = async ({
  userId,
  role,
  loanId,
}: Partial<QueryParams> & {
  loanId: string
}): Promise<SingleStatusApplication> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/exec/status/${loanId}?role=${role}&userId=${userId}&institutionId=exec`,
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

export const getRejectedApplications = async ({
  institutionId,
  branchId,
  userId,
  role,
}: QueryParams): Promise<RejectedApplcation[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/rejected?role=${role}&userId=${userId}&institutionId=${institutionId}&branchId=${branchId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const getExecRejectedApplicationById = async ({
  userId,
  role,
  loanId,
}: Partial<QueryParams> & { loanId: string }): Promise<RejectedApplcation> => {
  try {
    const res = await Axios.get(
      `/loan-application/rejected/${loanId}?role=${role}&userId=${userId}&branchId=exec&institutionId=exec`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const getRejectedApplicationById = async ({
  institutionId,
  branchId,
  userId,
  role,
  loanId,
}: QueryParams & { loanId: string }): Promise<RejectedApplcation> => {
  try {
    const res = await Axios.get(
      `/loan-application/rejected/${loanId}?role=${role}&userId=${userId}&branchId=${branchId}&institutionId=${institutionId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

type ApprovedApplication = {
  id: string
  customer_name: string
  created_at: string
  loan_officer_name: string
  branch: string
  institution: string
}

const getApprovedApplications = async ({
  role,
  userId,
  branchId,
  institutionId,
}: QueryParams): Promise<ApprovedApplication[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/approved?role=${role}&userId=${userId}&branchId=${branchId}&institutionId=${institutionId}`,
      { withCredentials: true }
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetApprovedApplications = (params: QueryParams) => {
  const approvedQry = useQuery({
    queryKey: ['approved-loans'],
    queryFn: () => getApprovedApplications(params),
  })

  return approvedQry.data
}
