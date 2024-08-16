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
  GraPictureResponse,
  PictureOption,
  useGetGraPicture,
  useUploadGraPicture,
} from '@/lib/api/guarantor-verification/functions'

export function GuarantorPicUploadForm({ loanId }: { loanId: string }) {
  const [file, setFile] = useState<File>()
  const [category, setCategory] = useState<PictureOption>('pic_one')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      throw new Error('No file found')
    }
    setFile(e.target.files[0])
  }

  const fileUpload = useUploadGraPicture()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = new FormData()
    form.append('picture', file!)

    fileUpload.mutate({
      picture: form,
      loanId: loanId,
      type: category,
    })
  }

  const graPictures = useGetGraPicture(loanId)
  const [prev, setPrev] = useState<boolean>(false)

  const displayPrev = () => {
    setPrev((prev) => !prev)
  }

  return (
    <div className="w-full flex flex-col items-start gap-5 pb-6">
      {graPictures && (
        <div className="space-y-3">
          <Button variant="outline" onClick={displayPrev}>
            {prev ? 'Hide Saved' : 'Show Saved'}
          </Button>

          {prev && <DataTable data={graPictures} />}
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
                <SelectContent className="w-64">
                  <SelectItem value="pic_one">
                    Guarantor one business Picture
                  </SelectItem>
                  <SelectItem value="pic_two">
                    Guarantor two business Picture
                  </SelectItem>
                  <SelectItem value="ver_one">
                    Verification Picture one
                  </SelectItem>
                  <SelectItem value="ver_two">
                    Verification Picture two
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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

const DataTable = ({ data }: { data: GraPictureResponse }) => {
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
          <TableCell>Guarantor one business picture</TableCell>
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
          <TableCell>Guarantor two business picture</TableCell>
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
          <TableCell>Verification Picture one</TableCell>
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
          <TableCell>Verification picture two</TableCell>
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
