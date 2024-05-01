import { feS, faS } from '@/components/routes/loans/family-expenses/feSchems'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type FamilyExpensePayload = z.infer<typeof feS>
type FamilyAssetPayload = z.infer<typeof faS>

export const createFamilyExpense = async (payload: FamilyExpensePayload) => {
  try {
    const res = await Axios.post('/loan-application/expense/family', payload, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const createFamilyAsset = async (payload: FamilyAssetPayload) => {
  try {
    const res = await Axios.post('/loan-application/asset/family', payload, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
