import { Role } from '@/lib/auth'
import { Axios } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getInstitutions = async (): Promise<
  { id: number; name: string }[] | undefined
> => {
  try {
    const response = await Axios.get(`/admin/institution`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useInstitution = () => {
  const iQry = useQuery({
    queryKey: ['admin-institution'],
    queryFn: getInstitutions,
  })

  return iQry
}

const createInstitution = async ({ name }: { name: string }) => {
  try {
    const response = await Axios.post(
      `/admin/institution/create`,
      { name: name },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const useCreateInstitution = () => {
  const qc = useQueryClient()
  const cMut = useMutation({
    mutationFn: createInstitution,
    onSuccess(data) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['admin-institution'] })
        alert('Institution added')
      } else {
        alert('Failed to add institution')
      }
    },
  })

  return cMut
}

const getBranches = async (): Promise<
  { id: number; name: string; institution_id: number }[] | undefined
> => {
  try {
    const response = await Axios.get(`/admin/branch`, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useBranches = () => {
  const bQry = useQuery({
    queryKey: ['admin-branch'],
    queryFn: getBranches,
  })

  return bQry
}

const createBranch = async ({
  name,
  institutionId,
}: {
  name: string
  institutionId: number
}) => {
  try {
    const response = await Axios.post(
      `/admin/branch/create`,
      { name: name, institutionId },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const useCreateBranch = () => {
  const qc = useQueryClient()
  const bMut = useMutation({
    mutationFn: createBranch,
    onSuccess(data) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['admin-branch'] })
        alert('Branch added')
      } else {
        alert('Failed to add branch')
      }
    },
  })

  return bMut
}

const createUser = async (payload: {
  name: string
  email: string
  role: Exclude<Role, 'admin'>
  password: string
  branchId?: number
}) => {
  try {
    const response = await Axios.post(`/admin/user/create`, payload, {
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const useCreateUser = () => {
  const qc = useQueryClient()
  const cMut = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['admin-user'] })
        alert('User added')
      } else {
        alert('Failed to create user')
      }
    },
  })

  return cMut
}
