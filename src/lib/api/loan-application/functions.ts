import { laS } from '@/components/routes/loans/loan-application/laSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type QueryParams = {
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
  approval_amount: string
  approval_comment: string
}

type RejectedApplcation = PendingApplication & {
  loan_amount: string
  rejection_comment: string
}

// Loan Officer Endpoints

export const createLoanApplication = async (
  payload: LoanApplicationPayload
) => {
  try {
    const res = await Axios.post('/loan-application/create', payload, {
      withCredentials: true,
    })

    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const fetchLoanApplications = async (): Promise<
  LoanApplication[] | undefined
> => {
  try {
    const res = await Axios.get('/loan-application/all', {
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

// TODO: change the return type for this function
export const getLoanApplicationStatus = async ({
  branchId,
  userId,
  role,
}: QueryParams): Promise<StatusApplication[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/branch/${branchId}/status?role=${role}&userId=${userId}`,
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
