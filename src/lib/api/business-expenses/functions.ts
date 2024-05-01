import { beS, baS } from '@/components/routes/loans/business-expenses/beSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type BusinessExpensePayload = z.infer<typeof beS>
type BusinessAssetPayload = z.infer<typeof baS>

export const createBusinessExpense = async (
  payload: BusinessExpensePayload
) => {
  try {
    const res = await Axios.post(
      '/loan-application/expense/business',
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

export const createBusinessAsset = async (payload: BusinessAssetPayload) => {
  try {
    const res = await Axios.post('/loan-application/asset/business', payload, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
