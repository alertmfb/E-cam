import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveFileName, uploadFile } from '@/lib/api/document/functions'
import { CloudUpload, DownloadCloud, SquareMousePointer } from 'lucide-react'
import React, { useState } from 'react'
import { constructUrl } from '@/lib/api/document/functions'
import { useAuthUser } from '@/lib/auth/hooks'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function UploadForm({ loanId }: { loanId: string }) {
  return (
    <div className="w-full flex flex-col items-start gap-5 pb-6">
      <div className="w-full grid grid-rows-1 grid-cols-2 gap-4">
        <VerificationPicUploadForm loanId={loanId} />
        <CustomerBusinessUploadForm loanId={loanId} />
      </div>
      <SheetUploadForm loanId={loanId} />
    </div>
  )
}

function SheetUploadForm({ loanId }: { loanId: string }) {
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
      className="w-full flex flex-col items-start gap-8 border rounded-lg p-6 shadow-md"
      onSubmit={(e) => handleUpload(e)}
    >
      <Label className="text-xl">CAM Sheet Upload.</Label>

      <Label className="text-base">
        Download the excel template, update it with the customer's information,
        rename the file, then upload it.
      </Label>

      <div className="flex items-center justify-center gap-4">
        <Button asChild variant="outline">
          <Label className="flex text-base items-center gap-2" asChild>
            <a href="/excel-sample.xlsx" download="sample">
              <DownloadCloud /> Download CAM excel sheet
            </a>
          </Label>
        </Button>
      </div>

      <div className="flex flex-col items-start justify-center gap-4">
        <Button asChild variant="secondary">
          <Label
            htmlFor="file"
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <SquareMousePointer /> select file to upload
          </Label>
        </Button>
        <div className="text-base font-semibold">{file && file?.name}</div>
        <Input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
        <Button
          type="submit"
          variant="outline"
          className="bg-blue-700 text-white flex items-center gap-2"
        >
          <CloudUpload /> Upload File
        </Button>
      </div>
    </form>
  )
}

function VerificationPicUploadForm({ loanId }: { loanId: string }) {
  // TODO: Set on success to alert 'uploaded'
  return (
    <form className="w-full flex flex-col items-start gap-8 p-6 shadow-md border rounded-lg">
      <Label className="text-xl">Verification Picture Upload</Label>

      <div className="flex flex-col items-start justify-center gap-4">
        <Button asChild variant="secondary">
          <Label
            htmlFor="file"
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <SquareMousePointer /> select file to upload
          </Label>
        </Button>
        <div className="text-base font-semibold">{}</div>
        <Input type="file" id="file" className="hidden" />
        <Button
          type="submit"
          variant="outline"
          className="bg-blue-700 text-white flex items-center gap-2"
        >
          <CloudUpload /> Upload File
        </Button>
      </div>
    </form>
  )
}

function CustomerBusinessUploadForm({ loanId }: { loanId: string }) {
  // TODO: Set on success to alert 'uploaded'

  return (
    <form className="w-full flex flex-col items-start gap-8 p-6 shadow-md border rounded-lg">
      <Label className="text-xl">Customer Business Upload</Label>

      <div className="flex flex-col items-start justify-center gap-4">
        <Button asChild variant="secondary">
          <Label
            htmlFor="file"
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <SquareMousePointer /> select file to upload
          </Label>
        </Button>
        <div className="text-base font-semibold">{}</div>
        <Input type="file" id="file" className="hidden" />
        <Button
          type="submit"
          variant="outline"
          className="bg-blue-700 text-white flex items-center gap-2"
        >
          <CloudUpload /> Upload File
        </Button>
      </div>
    </form>
  )
}
