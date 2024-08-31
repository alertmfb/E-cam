import { Axios } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const uploadUserImage = async ({
  userId,
  image,
}: {
  userId: string
  image: FormData
}) => {
  try {
    const response = await Axios.post(`/user/${userId}/upload-image`, image, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadUserImage = () => {
  const qc = useQueryClient()
  const upMut = useMutation({
    mutationFn: uploadUserImage,
    onSuccess(data) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['user-image'] })
        alert('image uploaded')
      }
    },
  })

  return upMut
}

type ImgResponse = {
  id: number
  url: string
}

const getUserImage = async ({
  userId,
}: {
  userId: string
}): Promise<ImgResponse | undefined> => {
  try {
    const response = await Axios.get(`/user/${userId}/image`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useGetUserImage = (userId: string) => {
  const usQry = useQuery({
    queryKey: ['user-image'],
    queryFn: () => getUserImage({ userId }),
  })

  return usQry
}

const resetPassword = async ({
  userId,
  password,
}: {
  userId: string
  password: string
}) => {
  try {
    const response = await Axios.post(
      `/auth/password-reset/${userId}`,
      { password: password },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useResetPassword = () => {
  const rMut = useMutation({
    mutationFn: resetPassword,
    onSuccess(data) {
      if (data) {
        alert('Password Changed!')
      } else {
        alert('Failed to change password')
      }
    },
  })

  return rMut
}
