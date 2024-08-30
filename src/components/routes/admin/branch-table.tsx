import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'
import {
  useBranches,
  useCreateBranch,
  useInstitution,
} from '@/lib/api/admin/functions'
import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'

export const BranchTable = () => {
  const { data: institutions } = useInstitution()
  const { data: branches } = useBranches()

  const [branchName, setBranchName] = useState('')
  const [instId, setInstId] = useState('')

  const cb = useCreateBranch()

  if (!institutions) {
    return <div></div>
  }

  if (!branches) {
    return <div></div>
  }

  const institutionMap: Record<number, string> = {}

  institutions.forEach((institution) => {
    institutionMap[institution.id] = institution.name
  })

  const create = () => {
    if (branchName === '' || instId === '') {
      alert('do not leave fields empty')
      return
    }

    cb.mutate({ name: branchName, institutionId: parseInt(instId) })
  }

  return (
    <div className="w-full space-y-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead className="text-black border">S/N</TableHead>
            <TableHead className="text-black border">Name</TableHead>
            <TableHead className="text-black border">Institution</TableHead>
            <TableHead className="text-black border"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch, idx) => (
            <TableRow className="hover:bg-white">
              <TableCell className="border">{idx + 1}</TableCell>
              <TableCell className="border">{branch.name}</TableCell>
              <TableCell className="border">
                {institutionMap[branch.institution_id]}
              </TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-3">
            <PlusCircle />
            Create Branch
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create a Branch</DialogTitle>
          <div className="flex flex-col gap-4 p-3">
            <Input
              placeholder="Branch Name"
              onChange={(e) => setBranchName(e.target.value)}
            />
            <Select onValueChange={(value) => setInstId(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an Institution" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((institution, idx) => (
                  <SelectItem value={institution.id.toString()} key={idx}>
                    {institution.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-40 flex items-center gap-3 mt-6"
              onClick={create}
            >
              Save
              {cb.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
