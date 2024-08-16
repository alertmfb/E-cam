import { rS } from '@/components/routes/loans/references/rSchema'
import { Axios } from '@/lib/axios'
import { useQueries, useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export type ReferencePayload = z.infer<typeof rS>
type ReferenceData = {
  payload: ReferencePayload
  loanId: string
}

type ReferenceFetchParams = {
  loanId: string
  branchId: string
}

type ReferenceResponse = {
  family_references: ReferencePayload[]
  commercial_references: ReferencePayload[]
  neighbourhood_references: ReferencePayload[]
}

export const createFamilyReference = async ({
  payload,
  loanId,
}: ReferenceData) => {
  try {
    const res = await Axios.post(
      `/loan-application/reference/family?loanId=${loanId}`,
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
export const createCommercialReference = async ({
  payload,
  loanId,
}: ReferenceData) => {
  try {
    const res = await Axios.post(
      `/loan-application/reference/commercial?loanId=${loanId}`,
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
export const createNeighbourhoodReference = async ({
  payload,
  loanId,
}: ReferenceData) => {
  try {
    const res = await Axios.post(
      `/loan-application/reference/neighbourhood?loanId=${loanId}`,
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

export const getReferences = async ({
  loanId,
  branchId,
}: ReferenceFetchParams): Promise<ReferenceResponse> => {
  try {
    const res = await Axios.get(
      `/loan-application/reference/all?loanId=${loanId}&branchId=${branchId}`,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

type ReferenceCategory = 'family' | 'commercial' | 'neighbourhood'

const getReferenceByCategory = async ({
  loanId,
  category,
}: {
  loanId: string
  category: ReferenceCategory
}): Promise<ReferencePayload[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/reference/${category}?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useReferenceByCategory = (
  loanId: string,
  category: ReferenceCategory
) => {
  const rfQry = useQuery({
    queryKey: [`reference-${category}-data`],
    queryFn: () => getReferenceByCategory({ loanId, category }),
  })

  return rfQry
}
