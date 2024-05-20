import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveFileName, uploadFile } from '@/lib/api/document/functions'
import { CloudUpload, DownloadCloud } from 'lucide-react'
import React, { useState } from 'react'
import { constructUrl } from '@/lib/api/document/functions'
import { useAuthUser } from '@/lib/auth/hooks'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function UploadForm({ loanId }: { loanId: string }) {
  const { branch_id } = useAuthUser()
  const [file, setFile] = useState<File>()
  const navigate = useNavigate()

  const fileMutation = useMutation({
    mutationFn: saveFileName,
    onSuccess: () => {
      navigate({ to: '/app/loans/status' })
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      throw new Error('No file found')
    }

    setFile(e.target.files[0]!)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await uploadFile(file!, loanId.toString())

    if (error) {
      throw new Error('upload failed')
    }

    if (!data) {
      throw new Error('corrupted file')
    }

    // TODO: Save in db
    console.log(constructUrl(data?.path))
    fileMutation.mutate({
      filename: data.path,
      params: { branchId: branch_id.toString(), loanId: loanId },
    })
  }

  return (
    <form
      className="flex flex-col items-start gap-8"
      onSubmit={(e) => handleUpload(e)}
    >
      <Label className="text-xl">
        Download the excel template, update it with the customer's information,
        rename the file, then upload it.
      </Label>

      <div className="flex items-center justify-center gap-4">
        <Label className="flex text-base items-center gap-2">
          <DownloadCloud /> Download CAM excel sheet
        </Label>
        <Button>
          <a href="/excel-sample.xlsx" download>
            Download
          </a>
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Label
          htmlFor="file"
          className="cursor-pointer flex items-center gap-2 text-base hover:text-blue-800"
        >
          <CloudUpload /> select file to upload here
        </Label>
        {file?.name}
        <Input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
        <Button
          type="submit"
          variant="outline"
          className="bg-blue-700 text-white"
        >
          Upload
        </Button>
      </div>
    </form>
  )
}
