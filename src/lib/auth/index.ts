import Cookies from 'universal-cookie'
import { isExpired, decodeToken } from 'react-jwt'

export const TOKEN_NAME = '_aqws'
export const SESSION_NAME = '_qsname'
export const SESSION_EMAIL = '_qsemail'
export const SESSION_ROLE = '_qsrole'
export const SESSION_BRANCH_ID = '_qsbid'
export const SESSION_BRANCH_NAME = '_qsbn'
export const SESSION_INSTITUTION_ID = '_qsiid'
export const SESSION_INSTITUTION_NAME = '_qsin'

export type ProviderProps = {
  children: React.ReactNode
}

export type AuthState = {
  isSignedIn: boolean
  userId: string | null
}

type DecodedToken = {
  exp: number
  iat: number
  iss: string
  jti: string
  nbf: number
  prv: string
  sub: string
}

type TokenExpired = {
  isExpired: boolean
}

export const cookies = new Cookies()

export type Role =
  | 'loan_officer'
  | 'branch_manager'
  | 'relationship_manager'
  | 'regional_manager'
  | 'credit'
  | 'executive'

export type User = {
  name: string
  role: Role
  email: string
  branch_id: number
  branch_name: string
  institution_id: string
  institution_name: string
}

export const checkExpired = (token: string): TokenExpired => {
  return { isExpired: isExpired(token) }
}

export const getDecodedToken = (token: string): DecodedToken | null => {
  const decoded = decodeToken<DecodedToken>(token)

  if (!decoded) {
    return null
  }

  return decoded
}

export const validateToken = (token: string | undefined): AuthState => {
  if (!token) {
    return { isSignedIn: false, userId: null }
  }

  // check if token is expired
  if (isExpired(token)) {
    return { isSignedIn: false, userId: null }
  }

  // decode token
  const decodedToken = decodeToken<DecodedToken>(token)

  if (!decodedToken?.sub) {
    return { isSignedIn: false, userId: null }
  }

  return { isSignedIn: true, userId: decodedToken.sub }
}
