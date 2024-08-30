import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import { useCreateInstitution, useInstitution } from '@/lib/api/admin/functions'
import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'

export const InstitutionTable = () => {
  const { data: institutions } = useInstitution()
  const [institutionName, setInstitutionName] = useState('')
  const ci = useCreateInstitution()

  if (!institutions) {
    return <div></div>
  }

  const create = () => {
    if (institutionName === '') {
      alert('Set a valid institution name')
      return
    }
    ci.mutate({ name: institutionName })
  }

  return (
    <div className="w-full space-y-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead className="text-black border">S/N</TableHead>
            <TableHead className="text-black border">Name</TableHead>
            <TableHead className="text-black border"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutions.map((institution, idx) => (
            <TableRow className="hover:bg-white" key={idx}>
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">{institution.name}</TableCell>
              <TableCell className="border space-x-5"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-3">
            <PlusCircle />
            Create Institution
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an Institution</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-3">
            <Input
              placeholder="Institution Name"
              onChange={(e) => setInstitutionName(e.target.value)}
            />
            <Button
              className="w-40 flex items-center gap-3 mt-6"
              onClick={create}
            >
              Save
              {ci.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
