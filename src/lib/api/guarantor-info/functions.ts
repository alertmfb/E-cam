import { giS } from '@/components/routes/loans/gurantors-info/giSchema'
import { Axios } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export type GuarantorInfoPayload = z.infer<typeof giS>
type FetchParams = {
  userId: string
  loanId: string
  role: string
}

type GuarantorData = {
  payload: GuarantorInfoPayload
  branchId: string
  loanId: string
}

export const createGuarantorInfo = async ({
  payload,
  branchId,
  loanId,
}: GuarantorData) => {
  try {
    const res = await Axios.post(
      `/loan-application/guarantor-info/create?branchId=${branchId}&loanId=${loanId}`,
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

export const fetchGuarantorInfo = async ({
  userId,
  loanId,
  role,
}: FetchParams): Promise<GuarantorInfoPayload[]> => {
  try {
    const res = await Axios.get(
      `/loan-application/guarantor-info/${loanId}?role=${role}&userId=${userId}`,
      { withCredentials: true }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

const getGuarantorNameInfo = async ({
  userId,
  loanId,
  role,
}: FetchParams): Promise<GuarantorInfoPayload[] | undefined> => {
  try {
    const res = await Axios.get(
      `/loan-application/guarantor-info/${loanId}?role=${role}&userId=${userId}&filter=business_name`,
      { withCredentials: true }
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetGuarantorNameInfo = (
  userId: string,
  loanId: string,
  role: string
) => {
  const grQry = useQuery({
    queryKey: ['guarantor-name-info'],
    queryFn: () => getGuarantorNameInfo({ userId, loanId, role }),
  })

  return grQry
}

const uploadGuarantorProfile = async ({
  loanId,
  type,
  image,
}: {
  loanId: string
  type: string
  image: FormData
}) => {
  try {
    const response = await Axios.post(
      `/loan-application/guarantor-info/${loanId}/image?type=${type}`,
      image,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadGuarantorProfile = () => {
  const upMut = useMutation({
    mutationFn: uploadGuarantorProfile,
    onSuccess(data) {
      if (data) {
        alert('image uploaded')
      } else {
        alert('Failed to upload')
      }
    },
  })

  return upMut
}

type ImageResponse = {
  id: string
  url_one: string
  url_two: string
}

const getGuarantorProfile = async ({
  loanId,
}: {
  loanId: string
}): Promise<ImageResponse | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/guarantor-info/${loanId}/image`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGuarantorProfile = (loanId: string) => {
  const gpQry = useQuery({
    queryKey: ['guarantor-profile-data'],
    queryFn: () => getGuarantorProfile({ loanId }),
  })

  return gpQry
}
