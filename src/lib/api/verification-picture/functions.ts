import { Axios } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'

export type PictureOption = 'pic_one' | 'pic_two' | 'ver_one' | 'ver_two'

type FileUploadParams = {
  picture: FormData
  loanId: string
  type: PictureOption
}

const uploadColPicture = async ({
  picture,
  loanId,
  type,
}: FileUploadParams) => {
  try {
    const response = await Axios.post(
      `/loan-application/col-picture?loanId=${loanId}&type=${type}`,
      picture,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadColPicture = () => {
  const upMut = useMutation({
    mutationFn: uploadColPicture,
    onSettled(data) {
      if (data) {
        alert('Successfully uploaded')
      } else {
        alert('Failed to upload')
      }
    },
  })

  return upMut
}

export type ColPictureResponse = {
  id: number
  loan_application_id: number
  pic_one: string
  pic_two: string
  ver_one: string
  ver_two: string
  created_at: string
  updated_at: string
}

const getColPicture = async ({
  loanId,
}: {
  loanId: string
}): Promise<ColPictureResponse | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/col-picture?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetColPicture = (loanId: string) => {
  const colQry = useQuery({
    queryKey: ['col-pic-data'],
    queryFn: () => getColPicture({ loanId }),
  })
  return colQry.data
}
