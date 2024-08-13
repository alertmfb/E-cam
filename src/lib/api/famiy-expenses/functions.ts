import { feS, faS } from '@/components/routes/loans/family-expenses/feSchems'
import { Axios } from '@/lib/axios'
import { z } from 'zod'
import { Role } from '@/lib/auth'
import { useQuery } from '@tanstack/react-query'

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

export type FamilyExAs = {
  id: string
  category: string
  item: string
  details: string
  amount: string
}

const getFamilyExpense = async ({
  loanId,
}: {
  loanId: string
}): Promise<FamilyExAs[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/expense/family?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getFamilyAsset = async ({
  loanId,
}: {
  loanId: string
}): Promise<FamilyExAs[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/asset/family?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetFamilyExpense = (loanId: string) => {
  const feQry = useQuery({
    queryKey: ['family-expense-data'],
    queryFn: () => getFamilyExpense({ loanId }),
  })

  return feQry
}

export const useGetFamilyAsset = (loanId: string) => {
  const feQry = useQuery({
    queryKey: ['family-asset-data'],
    queryFn: () => getFamilyAsset({ loanId }),
  })

  return feQry
}
