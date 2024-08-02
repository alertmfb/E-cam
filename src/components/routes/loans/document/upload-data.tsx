import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronDown, DownloadCloud, UploadCloud, Eye } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  constructUrl,
  constructImageUrl,
  getFileName,
  uploadFile,
} from '@/lib/api/document/functions'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/auth/hooks'

export function UploadData({ loanId }: { loanId: string }) {
  const { role } = useUser()
  const [content, setContent] = useState(false)

  const { data, fetchStatus } = useQuery({
    queryKey: ['excel-document'],
    queryFn: () => getFileName({ loanId }),
  })

  if (fetchStatus === 'fetching') {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Fetch Error</div>
  }

  const { file_name, customer_business, verification_picture } = data

  const fileUrl = constructUrl(file_name)
  const cbUrl = constructImageUrl(customer_business)
  const vpUrl = constructImageUrl(verification_picture)

  // TODO: use supaase cli to downnload image assets

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    const downloadedFileId = file_name.slice(0, 8)
    const uploadFileId = file.name.slice(0, 8)

    if (uploadFileId !== downloadedFileId) {
      alert('Invalid File')
      return
    }

    const { data, error } = await uploadFile(file, loanId)

    if (error) {
      alert(error.message)
      return
    }

    if (!data) {
      alert('Error: No data')
      return
    }

    alert('Re-Upload Successful')
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            {' '}
            <div>Loan Documents</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>
            Assiociated documents with the application
          </CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <form className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between flex-1 flex-wrap gap-3">
                <Label>1. Excel Sheet</Label>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <div className="flex items-center gap-2">
                      <DownloadCloud />
                      <a href={fileUrl} download="verification">
                        Download
                      </a>
                    </div>
                  </Button>

                  {role === 'branch_manager' && (
                    <Button asChild variant="outline">
                      <Label
                        htmlFor="upfile"
                        className="flex items-center gap-2"
                      >
                        <UploadCloud />
                        Re-Upload
                      </Label>
                    </Button>
                  )}

                  <input
                    type="file"
                    id="upfile"
                    className="hidden"
                    onChange={(e) => onFileChange(e)}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-between flex-1 flex-wrap gap-3">
                <Label>2. Verification Picture</Label>
                <Button variant="outline" asChild>
                  <div className="flex items-center gap-2">
                    <Eye />

                    <a href={vpUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </div>
                </Button>
              </div>
              <div className="w-full flex items-center justify-between flex-1 flex-wrap gap-3">
                <Label>3. Customer's Business place</Label>
                <Button variant="outline" asChild>
                  <div className="flex items-center gap-2">
                    <Eye />

                    <a href={cbUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
