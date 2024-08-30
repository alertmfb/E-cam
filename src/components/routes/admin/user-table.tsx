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
  useCreateUser,
  useInstitution,
} from '@/lib/api/admin/functions'
import { Role } from '@/lib/auth'
import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'

type UserRoles = Exclude<Role, 'admin'>

export const UserTable = () => {
  const { data: institutions } = useInstitution()
  const { data: branches } = useBranches()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRoles>('loan_officer')
  const [branch, setBranch] = useState('')
  const [password, setPassword] = useState('')

  const cu = useCreateUser()

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
    if (name === '' || email === '' || password === '') {
      alert('Do not leave any fields empty')
      return
    }

    switch (role) {
      case 'loan_officer':
      case 'branch_manager':
      case 'regional_manager':
        password !== '' &&
          cu.mutate({
            name,
            email,
            role,
            password,
            branchId: parseInt(branch),
          })
        break
      case 'credit':
      case 'executive':
        password !== '' &&
          cu.mutate({
            name,
            email,
            role,
            password,
          })
        break

      default:
        alert('Invalid')
        return
    }
  }

  return (
    <div className="w-full space-y-4 pt-6">
      {/* <Table className="border">
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
      </Table> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-3">
            <PlusCircle />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-3">
          <DialogTitle>Create a User</DialogTitle>
          <div className="flex flex-col gap-4 p-3">
            <Input
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select onValueChange={(value: UserRoles) => setRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loan_officer">Loan Officer</SelectItem>
                <SelectItem value="branch_manager">Branch Manager</SelectItem>
                <SelectItem value="regional_manager">
                  Regional Manager
                </SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-full flex items-center gap-3">
              <Select onValueChange={(value) => setBranch(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch, idx) => (
                    <SelectItem value={branch.id.toString()} key={idx}>
                      {branch.name} - {institutionMap[branch.institution_id]}
                    </SelectItem>
                  ))}
                  {/* <span className="font-semibold">Institution: </span> {institutionMap[br]} */}
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-40 flex items-center gap-3 mt-4"
              onClick={create}
            >
              Save
              {cu.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
