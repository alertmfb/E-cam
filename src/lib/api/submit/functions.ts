import { Axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { string } from 'zod'

const submitApplication = async ({
  loanId,
  senderName,
  ccName,
  senderEmail,
  ccEmail,
}: {
  loanId: string
  senderName: string
  senderEmail: string
  ccName: string
  ccEmail: string
}) => {
  try {
    const response = await Axios.put(
      `/loan-application/submit?loanId=${loanId}`,
      {
        senderName,
        senderEmail,
        ccName,
        ccEmail,
      },
      { withCredentials: true }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const useSubmitApplication = () => {
  const navigate = useNavigate()
  const subMut = useMutation({
    mutationFn: submitApplication,
    onSuccess(data) {
      if (data) {
        alert('Loan Application Submitted')
        navigate({ to: '/app/dashboard' })
      }
    },
  })

  return subMut
}
