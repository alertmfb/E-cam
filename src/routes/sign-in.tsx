import { Header } from '@/components/header'
import { SigninForm } from '@/components/routes/sign-in/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
})

function SignIn() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 flex items-center justify-center">
        <div className="w-48">
          <SigninForm />
        </div>
      </div>
    </div>
  )
}
