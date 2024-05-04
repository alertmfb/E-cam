import { Header } from '@/components/header'
import { SigninForm } from '@/components/routes/sign-in/signin-form'
import { createFileRoute } from '@tanstack/react-router'
import signinB from '../assets/signinB.svg'

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
})

function SignIn() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 flex flex-col gap-6 items-center">
        <h1 className="text-4xl text-blue-950 font-semibold tracking-tighter self-start">
          Please Sign in to Continue
        </h1>
        <div className="w-full flex gap-6 items-center justify-around flex-wrap-reverse flex-1">
          <img src={signinB} alt="sign in img" />
          <div className="border p-12 rounded-lg shadow-lg">
            <SigninForm />
          </div>
        </div>
      </div>
    </div>
  )
}
