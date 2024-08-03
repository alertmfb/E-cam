import { Axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

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

const uploadVerPicture = async () => {}

export const useUploadVerPicture = () => {}

const uploadCustomerBusiness = async () => {}

export const useUploadCustomerBusiness = () => {}
