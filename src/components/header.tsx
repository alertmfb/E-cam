import { Link } from '@tanstack/react-router'
import logo from '../assets/logo.png'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <Link to="/">
          <img src={logo} alt="" className="w-20" />
        </Link>
        <menu className="flex items-center gap-3 font-semibold">
          <Button asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
        </menu>
      </nav>
    </header>
  )
}

export function AppHeader() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-7">
          <Link to="/">
            <img src={logo} alt="" className="w-20" />
          </Link>
          <menu className="flex items-center gap-4 font-semibold">
            <li>Expenses</li>
            <li>References</li>
            <li>Status</li>
          </menu>
        </div>
        <div className="flex items-center gap-3">
          <p>Profile</p>
          <Avatar className="cursor-pointer">
            <AvatarFallback>VB</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  )
}
