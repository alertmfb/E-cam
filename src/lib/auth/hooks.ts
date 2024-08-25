import { useContext } from 'react'
import { AuthContext } from './auth-provider'
import {
  SESSION_BRANCH_ID,
  SESSION_BRANCH_NAME,
  SESSION_INSTITUTION_ID,
  SESSION_INSTITUTION_NAME,
  SESSION_NAME,
  SESSION_ROLE,
  TOKEN_NAME,
  User,
  cookies,
} from '.'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '../axios'

export function useAuthSession() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthUser() {
  let user
  if (typeof window !== 'undefined' && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user')!) as User
  }
  return user!
}

export function useAuth() {
  const authState = useContext(AuthContext)

  if (!authState) {
    return { isSignedIn: false, userId: null }
  }

  return authState
}

export function useUser(): User {
  const name = cookies.get(SESSION_NAME)
  const role = cookies.get(SESSION_ROLE)
  const branch_id = cookies.get(SESSION_BRANCH_ID)
  const branch_name = cookies.get(SESSION_BRANCH_NAME)
  const institution_id = cookies.get(SESSION_INSTITUTION_ID)
  const institution_name = cookies.get(SESSION_INSTITUTION_NAME)

  return {
    name: name,
    role: role,
    branch_id: branch_id,
    branch_name: branch_name,
    institution_id: institution_id,
    institution_name: institution_name,
  }
}

export const useSignIn = () => {
  const navigate = useNavigate()

  const fn = useMutation({
    mutationFn: signIn,
    onSuccess: () => navigate({ to: '/app/dashboard' }),
  })

  return fn
}

export const useSignOut = () => {
  const navigate = useNavigate()

  const fn = useMutation({
    mutationFn: signOut,
    onSuccess() {
      cookies.remove(TOKEN_NAME)
      cookies.remove(SESSION_NAME)
      cookies.remove(SESSION_ROLE)
      cookies.remove(SESSION_BRANCH_ID)
      cookies.remove(SESSION_BRANCH_NAME)
      cookies.remove(SESSION_INSTITUTION_ID)
      cookies.remove(SESSION_INSTITUTION_NAME)
      navigate({ to: '/' })
    },
  })

  return fn
}

type TokenResponse = {
  access_token: string
} & User

export async function signIn(payload: {
  email: string
  password: string
}): Promise<number | undefined> {
  try {
    const res = await Axios.post<TokenResponse>('/auth/signin', payload, {
      withCredentials: true,
    })

    if (res.data.access_token) {
      cookies.set(TOKEN_NAME, res.data.access_token, {
        path: '/',
      })
      cookies.set(SESSION_NAME, res.data.name, {
        path: '/',
      })
      cookies.set(SESSION_ROLE, res.data.role, {
        path: '/',
      })
      cookies.set(SESSION_BRANCH_ID, res.data.branch_id, {
        path: '/',
      })
      cookies.set(SESSION_BRANCH_NAME, res.data.branch_name, {
        path: '/',
      })
      cookies.set(SESSION_INSTITUTION_ID, res.data.institution_id, {
        path: '/',
      })
      cookies.set(SESSION_INSTITUTION_NAME, res.data.institution_name, {
        path: '/',
      })
    }

    return res.status
  } catch (e) {
    console.error(e)
  }
}

export async function signOut() {
  try {
    cookies.remove(TOKEN_NAME, { path: '/' })
    cookies.remove(SESSION_NAME, { path: '/' })
    cookies.remove(SESSION_ROLE, { path: '/' })
    cookies.remove(SESSION_BRANCH_ID, { path: '/' })
    cookies.remove(SESSION_BRANCH_NAME, { path: '/' })
    cookies.remove(SESSION_INSTITUTION_ID, { path: '/' })
    cookies.remove(SESSION_INSTITUTION_NAME, { path: '/' })

    Axios.post<TokenResponse>(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    )
  } catch (e) {
    console.error(e)
  }
}
