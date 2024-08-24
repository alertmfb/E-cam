import { Axios } from '@/lib/axios'
import { VisitReportData } from './questions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const uploadVisitReport = async ({
  loanId,
  visitReport,
}: {
  loanId: string
  visitReport: VisitReportData[]
}) => {
  try {
    const response = await Axios.post(
      `/loan-application/visit-report/${loanId}`,
      {
        visitReport: visitReport,
      },
      { withCredentials: true }
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useUploadVisitReport = () => {
  const qc = useQueryClient()
  const upMut = useMutation({
    mutationFn: uploadVisitReport,
    onSuccess(data, variables, context) {
      if (data) {
        qc.invalidateQueries({ queryKey: ['visit-report-data'] })
        alert('Uploaded')
      } else {
        alert('Failed to save')
      }
    },
  })

  return upMut
}

const getVisitReport = async ({
  loanId,
}: {
  loanId: string
}): Promise<VisitReportData[] | undefined> => {
  try {
    const response = await Axios.get(
      `/loan-application/visit-report/${loanId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useVisitReport = (loanId: string) => {
  const vrQry = useQuery({
    queryKey: ['visit-report-data'],
    queryFn: () => getVisitReport({ loanId }),
  })

  return vrQry
}
