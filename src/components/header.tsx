import { Link } from '@tanstack/react-router'
import logo from '../assets/logo3.png'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User, LogOut, UploadCloud } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth, useSignOut, useUser } from '@/lib/auth/hooks'
import { Role } from '@/lib/auth'
import { useGetUserImage } from '@/lib/api/user-profile/functions'

const roles: Record<Role, string> = {
  loan_officer: 'Loan Officer',
  relationship_manager: 'Relationship Manager',
  branch_manager: 'Branch Manager',
  regional_manager: 'Regional Manager',
  credit: 'Credit',
  executive: 'Executive',
}

export function AppHeader() {
  const { role, name, institution_name, branch_name } = useUser()

  return (
    <header className="border-b sticky top-0 w-full bg-white z-10">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <Link to="/app/dashboard">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-8" />
            <span className="font-semibold text-lg">E-CAM</span>
          </div>
        </Link>
        <div className="flex items-end gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-medium">{name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{roles[role]}</p>
              {role === 'regional_manager' || role === 'credit' ? (
                <p className="text-sm font-semibold">
                  {institution_name?.toUpperCase()}
                </p>
              ) : (
                <p className="text-sm font-semibold">
                  {branch_name?.toUpperCase()}
                </p>
              )}
            </div>
          </div>
          <UserDropdown />
        </div>
      </nav>
    </header>
  )
}

const UserDropdown = () => {
  const signOut = useSignOut()
  const { userId } = useAuth()
  const { data } = useGetUserImage(userId!)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer border">
          {data && <AvatarImage src={data.url} />}
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Change Profile</DropdownMenuLabel> */}
        <DropdownMenuItem asChild>
          <Link
            to="/app/profile"
            className="cursor-pointer flex items-center gap-3"
          >
            <User /> Change Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-3"
          onClick={() => {
            signOut.mutate()
          }}
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
