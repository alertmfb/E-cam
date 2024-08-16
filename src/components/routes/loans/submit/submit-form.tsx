import { Button } from '@/components/ui/button'
import { useSubmitApplication } from '@/lib/api/submit/functions'
import { CloudUpload } from 'lucide-react'

export const SubmitForm = ({ loanId }: { loanId: string }) => {
  const submit = useSubmitApplication()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit.mutate({ loanId })
  }

  return (
    <div className="w-full flex flex-col items-start gap-5 pb-6">
      <form
        className="w-full flex flex-col items-start gap-8 p-6 shadow-md border rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex items-center justify-start gap-5 flex-1 flex-wrap">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-wrap text-red-600">
                Please confirm that you have correctly filled out the necessary
                information!
              </h1>
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="bg-blue-700 text-white flex items-center gap-2"
          >
            <CloudUpload /> Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
