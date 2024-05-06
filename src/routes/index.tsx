import { Header } from '@/components/header'
import { createFileRoute } from '@tanstack/react-router'
import home from '../assets/home.svg'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto pt-12 flex flex-col gap-12 items-center justify-center">
        <span className="self-start">
          <span className="text-4xl text-blue-950 font-semibold">
            Alert Group
          </span>
          <br />
          <span className="text-2xl tracking-tight">
            Credit Appraisial Memorandum Portal
          </span>
        </span>
        <div className="w-full flex items-center justify-around gap-8 flex-wrap flex-1">
          <img src={home} alt="img" />
          <div className="flex flex-col gap-6 items-center justify-center">
            <h1 className="text-4xl text-blue-950 font-semibold">
              Welcome back, User!
            </h1>
            <Button className="bg-[#3F3D56]" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
