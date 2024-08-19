import { Axios } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type OfferLetterData = {
  id: string
  business_name: string
  business_address: string
  sex: string
  name: string
  marital_status: string
  new_loan_amount: string
  disbursement_date: string
  maturity_date: string
  loan_purpose: string
}

const getOfferLetterData = async ({
  loanId,
}: {
  loanId: string
}): Promise<OfferLetterData | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/offer-letter/${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useOfferLetterData = (loanId: string) => {
  const ofQry = useQuery({
    queryKey: ['offer-letter-data'],
    queryFn: () => getOfferLetterData({ loanId }),
  })

  return ofQry
}
