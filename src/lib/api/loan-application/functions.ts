import { laS } from '@/components/routes/loans/loan-application/laSchema'
import { Axios } from '@/lib/axios'
import { z } from 'zod'

type LoanApplicationPayload = z.infer<typeof laS>
type LoanApplication = LoanApplicationPayload & {
  id: string
  created_at: string
}

export const createLoanApplication = async ({
  customer_name,
  customer_bvn,
}: LoanApplicationPayload) => {
  try {
    const res = await Axios.post(
      '/loan-application/create',
      {
        customer_name,
        customer_bvn,
      },
      { withCredentials: true }
    )

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
