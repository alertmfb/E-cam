import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  constructUrl,
  constructImageUrl,
  getFileName,
  downloadImage,
} from '@/lib/api/document/functions'
import { Button } from '@/components/ui/button'

export function UploadData({ loanId }: { loanId: string }) {
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
                <Button asChild variant="outline">
                  <a href={fileUrl} download="verification">
                    Download
                  </a>
                </Button>
              </div>
              <div className="w-full flex items-center justify-between flex-1 flex-wrap gap-3">
                <Label>2. Verification Picture</Label>
                <Button variant="outline" asChild>
                  <a href={vpUrl}>View</a>
                </Button>
              </div>
              <div className="w-full flex items-center justify-between flex-1 flex-wrap gap-3">
                <Label>3. Customer's Business place</Label>
                <Button variant="outline" asChild>
                  <a href={cbUrl}>View</a>
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
