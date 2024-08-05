import { Axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

const submitApplication = async ({ loanId }: { loanId: string }) => {
  try {
    const response = await Axios.put(
      `/loan-application/submit?loanId=${loanId}`,
      {},
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
