import { Link } from '@tanstack/react-router'
import logo from '../assets/logo.png'
import { Avatar, AvatarFallback } from './ui/avatar'
// import { CreditCard, BookMarked, Info } from 'lucide-react'

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
  return (
    <header className="border-b sticky top-0 w-full bg-white z-10">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-8">
          <Link to="/app/dashboard">
            <img src={logo} alt="" className="w-20" />
          </Link>
          {/* <menu className="flex items-center gap-6 font-semibold *:cursor-pointer">
            <li className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <CreditCard /> Expenses
            </li>
            <li className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <BookMarked /> References
            </li>
            <li className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Info />
              Status
            </li>
          </menu> */}
        </div>
        <div className="flex items-center gap-3">
          <p className="font-medium">Loan Officer</p>
          <Avatar className="cursor-pointer">
            <AvatarFallback>VB</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  )
}
