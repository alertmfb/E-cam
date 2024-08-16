import { Axios } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type PictureOption = 'pic_one' | 'pic_two' | 'ver_one' | 'ver_two'

type FileUploadParams = {
  picture: FormData
  loanId: string
  type: PictureOption
}

const uploadGraPicture = async ({
  picture,
  loanId,
  type,
}: FileUploadParams) => {
  try {
    const response = await Axios.post(
      `/loan-application/gra-picture?loanId=${loanId}&type=${type}`,
      picture,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadGraPicture = () => {
  const queryClient = useQueryClient()
  const upMut = useMutation({
    mutationFn: uploadGraPicture,
    onSettled(data) {
      if (data) {
        alert('Successfully uploaded')
        queryClient.invalidateQueries({ queryKey: ['gra-pic-data'] })
      } else {
        alert('Failed to upload')
      }
    },
  })

  return upMut
}

export type GraPictureResponse = {
  id: number
  loan_application_id: number
  pic_one: string
  pic_two: string
  ver_one: string
  ver_two: string
  created_at: string
  updated_at: string
}

const getGraPicture = async ({
  loanId,
}: {
  loanId: string
}): Promise<GraPictureResponse | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/gra-picture?loanId=${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetGraPicture = (loanId: string) => {
  const colQry = useQuery({
    queryKey: ['gra-pic-data'],
    queryFn: () => getGraPicture({ loanId }),
  })
  return colQry.data
}
