import { Link } from '@tanstack/react-router'
import logo from '../assets/logo.png'
import { Avatar, AvatarFallback } from './ui/avatar'
import { User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSignOut, useUser } from '@/lib/auth/hooks'
import { Role } from '@/lib/auth'

const roles: Record<Role, string> = {
  loan_officer: 'Loan Officer',
  relationship_manager: 'Relationship Manager',
  branch_manager: 'Branch Manager',
  regional_manager: 'Regional Manager',
  executive: 'Executive',
}

export function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <Link to="/">
          <img src={logo} alt="" className="w-20" />
        </Link>
        <menu className="flex items-center gap-6">
          <span className="text-sm font-medium cursor-pointer">
            Documentation
          </span>
          <span className="text-sm font-medium cursor-pointer">Feedback</span>
          <span className="text-sm font-medium cursor-pointer">
            <Link to="/sign-in">Sign in</Link>
          </span>
        </menu>
      </nav>
    </header>
  )
}

export function AppHeader() {
  const { role, name, institution_name, branch_name } = useUser()

  return (
    <header className="border-b sticky top-0 w-full bg-white z-10">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-8">
          <Link to="/app/dashboard">
            <img src={logo} alt="" className="w-20" />
          </Link>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-medium">{name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{roles[role]}</p>
              {role === 'regional_manager' ? (
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

function UserDropdown() {
  const signOut = useSignOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
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
