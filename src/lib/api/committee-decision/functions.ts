import { Axios } from '@/lib/axios'
import { CommitteeDecisionData } from './schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const uploadCommitteeDecision = async ({
  loanId,
  committeeDecision,
}: {
  loanId: string
  committeeDecision: CommitteeDecisionData[]
}) => {
  try {
    const response = await Axios.post(
      `/loan-application/committee-decision/${loanId}`,
      { committeeDecision: committeeDecision },
      { withCredentials: true }
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadCommitteeDecision = () => {
  const qc = useQueryClient()
  const cdMut = useMutation({
    mutationFn: uploadCommitteeDecision,
    onSuccess(data, variables, context) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['committee-decision-data'] })
        alert('Uploaded')
      } else {
        alert('Failed to save')
      }
    },
  })
  return cdMut
}

const getCommitteeDecision = async ({
  loanId,
}: {
  loanId: string
}): Promise<CommitteeDecisionData[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/committee-decision/${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useCommitteeDecision = (loanId: string) => {
  const cdQry = useQuery({
    queryKey: ['committee-decision-data'],
    queryFn: () => getCommitteeDecision({ loanId }),
  })

  return cdQry
}
