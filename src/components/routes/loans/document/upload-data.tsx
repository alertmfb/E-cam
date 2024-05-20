import { useQuery } from '@tanstack/react-query'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
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

export function UploadData(loanId: { LoanId: string }) {
  const user = useAuthUser()
  const { role } = useAuthSession()

  const [content, setContent] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-8 flex-wrap flex-auto">
      <Card className="w-full shadow-md">
        <CardHeader
          className="cursor-pointer transition ease-in-out hover:scale-[1.01]"
          onClick={() => setContent((prev) => !prev)}
        >
          <CardTitle className="text-xl flex items-center gap-3 justify-between">
            {' '}
            <div>Client Information</div>
            <ChevronDown />
          </CardTitle>
          <CardDescription>Details about the client</CardDescription>
        </CardHeader>

        {content && (
          <CardContent className="transition ease-in-out fade-in-30 delay-150">
            <form className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              <Label>{'file_name'.split('_').join(' ')}</Label>{' '}
              <Label className="font-normal">
                <div>{}</div>
              </Label>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
