import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CloudUpload, SquareMousePointer } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ColPictureResponse,
  PictureOption,
  useGetColPicture,
  useUploadColPicture,
} from '@/lib/api/verification-picture/functions'

export function VerificationPicUploadForm({ loanId }: { loanId: string }) {
  const [file, setFile] = useState<File>()
  const [category, setCategory] = useState<PictureOption>('pic_one')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      throw new Error('No file found')
    }
    setFile(e.target.files[0])
  }

  const fileUpload = useUploadColPicture()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    const LIMIT = 2 * 2 ** 20 // 2MB
    const allowedFormats: Record<string, boolean> = {
      'image/jpeg': true,
      'image/png': true,
      'image/apng': true,
      'image/webp': true,
      'image/tiff': true,
    }

    if (!file) {
      alert('No file selected!')
      return
    }

    if (file.size > LIMIT) {
      alert('Image size greater than 2MB')
      return
    }

    if (!allowedFormats[file.type]) {
      alert('Unsupported image format')
      return
    }

    const form = new FormData()
    form.append('picture', file)

    fileUpload.mutate({
      picture: form,
      loanId: loanId,
      type: category,
    })
  }

  const colPictures = useGetColPicture(loanId)
  const [prev, setPrev] = useState<boolean>(false)

  const displayPrev = () => {
    setPrev((prev) => !prev)
  }

  return (
    <div className="w-full flex flex-col items-start gap-5 pb-6">
      {colPictures && (
        <div className="space-y-3">
          <Button variant="outline" onClick={displayPrev}>
            {prev ? 'Hide Saved' : 'Show Saved'}
          </Button>

          {prev && <DataTable data={colPictures} />}
        </div>
      )}
      <form
        className="w-full flex flex-col items-start gap-8 p-6 shadow-md border rounded-lg"
        onSubmit={(e) => handleUpload(e)}
      >
        {/* <Label className="text-xl">Verification Picture Upload</Label> */}

        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex items-center justify-start gap-5 flex-1 flex-wrap">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold">Select File</h1>
              <Button asChild variant="secondary">
                <Label
                  htmlFor="file"
                  className="cursor-pointer flex items-center gap-2 text-base"
                >
                  <SquareMousePointer /> select file to upload
                </Label>
              </Button>
              <Input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
            </div>

            <div className="flex flex-col gap-3 items-start">
              <h1 className="font-bold">Select Category</h1>
              <Select
                onValueChange={(v: PictureOption) => {
                  setCategory(v)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pic_one">Collateral Picture 1</SelectItem>
                  <SelectItem value="pic_two">Collateral Picture 2</SelectItem>
                  <SelectItem value="ver_one">Verification Picture</SelectItem>
                  <SelectItem value="ver_two">
                    Customer Business Place
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm">
            Supported Image formats:
            <i className="font-semibold"> png, jpg, jpeg</i>
            <br />
            Max Size: <i className="font-semibold">2MB</i>
          </div>

          <div className="text-base font-semibold">
            Selected File: <span className="text-blue-700">{file?.name}</span>
          </div>

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

const DataTable = ({ data }: { data: ColPictureResponse }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Category</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Collateral Picture 1</TableCell>
          <TableCell>
            <Button variant="link">
              <a href={data.pic_one} target="_blank" rel="nopener-noreferrer">
                View
              </a>
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Collateral Picture 2</TableCell>
          <TableCell>
            <Button variant="link">
              <a href={data.pic_two} target="_blank" rel="nopener-noreferrer">
                View
              </a>
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Verification Picture</TableCell>
          <TableCell>
            <Button variant="link">
              <a href={data.ver_one} target="_blank" rel="nopener-noreferrer">
                View
              </a>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>4</TableCell>
          <TableCell>Customer Business Place</TableCell>
          <TableCell>
            <Button variant="link">
              <a href={data.ver_two} target="_blank" rel="nopener-noreferrer">
                View
              </a>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
