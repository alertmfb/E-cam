import { Axios } from '@/lib/axios'
import { supabase } from '@/lib/sb'
import { v4 as uuidv4 } from 'uuid'

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET_NAME as string
const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID as string

type UploadData = {
  filename: string
  params: {
    loanId: string
    role?: string
    branchId: string
    institutionId?: string
  }
}

type FileResponse = {
  file_name: string
}

export async function uploadFile(image: File, loanId: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(uuidv4().slice(0, 9) + loanId + image.name, image, { upsert: true })
  return { data, error }
}

export const saveFileName = async ({
  filename,
  params,
}: UploadData): Promise<string> => {
  try {
    const res = await Axios.post(
      `/loan-application/${params.loanId}/upload-file?role=${params.role}&branchId=${params.branchId}&loanId=${params.loanId}&institutionId=${params.institutionId}`,
      { filename },
      { withCredentials: true }
    )
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}

export function constructUrl(assetName: string) {
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${assetName}`
}

export const getFileName = async ({
  loanId,
}: Pick<UploadData['params'], 'loanId'>): Promise<FileResponse> => {
  try {
    const res = await Axios.get(`/loan-application/${loanId}/get-file`, {
      withCredentials: true,
    })
    return res.data
  } catch (e) {
    throw new Error(`response error: ${e}`)
  }
}
