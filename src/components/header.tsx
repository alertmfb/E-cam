import { Link } from '@tanstack/react-router'
import logo from '../assets/logo.png'
import { Avatar, AvatarFallback } from './ui/avatar'
import { signOut } from '@/lib/auth/functions'
import { User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from '@tanstack/react-router'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'

const roles = {
  loan_officer: 'Loan Officer',
  relationship_manager: 'Relationship Manager',
  branch_manager: 'Branch Manager',
  regional_manager: 'Regional Manager',
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
  const auth = useAuthSession()
  const user = useAuthUser()

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
            <p className="font-medium">{user?.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm">{roles[auth.role]}</p>
              <p className="text-sm font-medium">{user?.institution_name}</p>
            </div>
          </div>
          <UserDropdown />
        </div>
      </nav>
    </header>
  )
}

function UserDropdown() {
  const navigate = useNavigate()
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
            signOut(), navigate({ to: '/sign-in' })
          }}
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
