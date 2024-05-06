import { Axios } from '../axios'
import { supabase } from '../sb'

export type Role = 'loan_officer' | 'branch_manager' | 'relationship_manager'

type QueryParams = {
  role: Role
  email: string
}

export type UserResponse = {
  id: number
  name: string
  branch_id: number
  email: string
}

export const findUser = async ({
  role,
  email,
}: QueryParams): Promise<UserResponse> => {
  try {
    const res = await Axios.get(`/find-user?email=${email}&role=${role}`, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export const signOut = async () => {
  await supabase.auth.signOut()
}
