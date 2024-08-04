import { Axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

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
  const upMut = useMutation({
    mutationFn: uploadGraPicture,
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
