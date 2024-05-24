import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  saveFileName,
  saveImageName,
  uploadFile,
  uploadImage,
} from '@/lib/api/document/functions'
import { CloudUpload, DownloadCloud, SquareMousePointer } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthUser } from '@/lib/auth/hooks'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function VerificationPicUploadForm({ loanId }: { loanId: string }) {
  const { branch_id } = useAuthUser()
  const [file, setFile] = useState<File>()

  const fileMutation = useMutation({
    mutationFn: saveImageName,
    onSuccess: () => {
      alert('uploaded')
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      throw new Error('No file found')
    }
    setFile(e.target.files[0])
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await uploadImage(file!, loanId.toString(), 'vp')

    if (error) {
      throw new Error('upload failed')
    }

    if (!data) {
      throw new Error('corrupted file')
    }

    fileMutation.mutate({
      filename: data.path,
      params: { branchId: branch_id.toString(), loanId: loanId },
      category: 'vp',
    })
  }

  return (
    <div className="w-full flex flex-col items-start gap-5 pb-6">
      <form
        className="w-full flex flex-col items-start gap-8 p-6 shadow-md border rounded-lg"
        onSubmit={(e) => handleUpload(e)}
      >
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
          <div className="text-base font-semibold">{file?.name}</div>
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
    </div>
  )
}
