import { beS, baS } from '@/components/routes/loans/business-expenses/beSchema'
import { Role } from '@/lib/auth'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type BusinessExpensePayload = z.infer<typeof beS>
type BusinessExpenseData = {
  payload: BusinessExpensePayload
  role: Role
  branchId: string
  userId: string
  loanId: string
}

type BusinessAssetPayload = z.infer<typeof baS>
type BusinessAssetData = {
  payload: BusinessAssetPayload
  role: Role
  branchId: string
  userId: string
  loanId: string
}

export const createBusinessExpense = async ({
  payload,
  branchId,
  loanId,
  role,
  userId,
}: BusinessExpenseData) => {
  try {
    const res = await Axios.post(
      `/loan-application/expense/business/${loanId}?role=${role}&branchId=${branchId}&userId=${userId}`,
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

export const createBusinessAsset = async ({
  payload,
  branchId,
  loanId,
  role,
  userId,
}: BusinessAssetData) => {
  try {
    const res = await Axios.post(
      `/loan-application/asset/business/${loanId}?role=${role}&branchId=${branchId}&userId=${userId}`,
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
