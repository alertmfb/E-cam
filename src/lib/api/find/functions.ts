import { Role } from '@/lib/auth'
import { Axios } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type FindUserResponse = {
  name: string
  email: string
}

const findUser = async ({
  role,
  branchId,
}: {
  role: string
  branchId: string
}): Promise<FindUserResponse | undefined> => {
  try {
    const response = await Axios.get(
      `/find/user?role=${role}&branchId=${branchId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useFindUser = (role: Role, branchId: string) => {
  const uQry = useQuery({
    queryKey: ['find-user'],
    queryFn: () => findUser({ role, branchId }),
  })

  return uQry
}
