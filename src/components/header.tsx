import { Link } from '@tanstack/react-router'
import logo from '../assets/logo3.png'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User, LogOut, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth, useSignOut, useUser } from '@/lib/auth/hooks'
import { Role } from '@/lib/auth'
import { useGetUserImage } from '@/lib/api/user-profile/functions'
import { Button } from './ui/button'

const roles: Record<Role, string> = {
  loan_officer: 'Loan Officer',
  relationship_manager: 'Relationship Manager',
  branch_manager: 'Branch Manager',
  regional_manager: 'Regional Manager',
  credit: 'Credit',
  executive: 'Executive',
  admin: 'Admin',
}

export function AppHeader() {
  return (
    <header className="border-b sticky top-0 w-full bg-white z-10">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <Link to="/app/dashboard">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-8" />
            <span className="font-semibold text-lg">E-CAM</span>
          </div>
        </Link>
        <MoblieMenu />
        <UserInfo />
      </nav>
    </header>
  )
}

const UserInfo = () => {
  const signOut = useSignOut()
  const { userId } = useAuth()
  const { role, name, institution_name, branch_name } = useUser()
  const { data } = useGetUserImage(userId!)

  return (
    <div className="lg:flex items-end gap-3 hidden">
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
              <User /> Profile
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
    </div>
  )
}

const MoblieMenu = () => {
  const { userId } = useAuth()
  const { role, name, institution_name, branch_name } = useUser()

  const signOut = useSignOut()
  const { data } = useGetUserImage(userId!)

  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="w-full text-left italic">Menu</SheetTitle>
            <SheetDescription>
              {/* Make changes to your profile here. */}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6 py-4">
            <Avatar className="cursor-pointer border w-20 h-20 rounded-md self-center">
              {data && (
                <AvatarImage src={data.url} className="rounded-md border" />
              )}
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="items-center gap-4">
              <div className="font-semibold text-xl flex items-center gap-3">
                {name}
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold uppercase tex-lg">
                  {roles[role]}
                </p>
                <div className="flex items-center gap-3">
                  {role === 'regional_manager' || role === 'credit' ? (
                    <div className="text-sm font-semibold">
                      {institution_name?.toUpperCase()}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold">
                      {branch_name?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="gap-4 flex-col">
            <SheetClose asChild>
              <Button variant={'outline'} className="w-full" asChild>
                <Link
                  to="/app/profile"
                  className="cursor-pointer flex items-center gap-3"
                >
                  Change Profile
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="cursor-pointer flex items-center gap-3"
                onClick={() => {
                  signOut.mutate()
                }}
              >
                <LogOut />
                <span>Sign Out</span>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
