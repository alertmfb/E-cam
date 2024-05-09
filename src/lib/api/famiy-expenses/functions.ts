import { feS, faS } from '@/components/routes/loans/family-expenses/feSchems'
import { Axios } from '@/lib/axios'
import { z } from 'zod'
import { Role } from '@/lib/auth/functions'

type FamilyExpensePayload = z.infer<typeof feS>
type FamilyExpenseData = {
  payload: FamilyExpensePayload
  role: Role
  branchId: string
  userId: string
  loanId: string
}

type FamilyAssetPayload = z.infer<typeof faS>
type FamilyAssetData = {
  payload: FamilyAssetPayload
  role: Role
  branchId: string
  userId: string
  loanId: string
}

export const createFamilyExpense = async ({
  payload,
  role,
  branchId,
  userId,
  loanId,
}: FamilyExpenseData) => {
  try {
    const res = await Axios.post(
      `/loan-application/expense/family/${loanId}?role=${role}&branchId=${branchId}&userId=${userId}`,
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

export const createFamilyAsset = async ({
  payload,
  branchId,
  role,
  userId,
  loanId,
}: FamilyAssetData) => {
  try {
    const res = await Axios.post(
      `/loan-application/asset/family/${loanId}?role=${role}&branchId=${branchId}&userId=${userId}`,
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
