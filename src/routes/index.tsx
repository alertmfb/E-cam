import { SignInForm } from '@/components/routes/sign-in/signin-form'
import { useAuth } from '@/lib/auth/hooks'
import { Navigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Navigate to="/app/dashboard" replace />
  }

  return (
    <main className="container h-screen items-center p-2 flex flex-col justify-center gap-14">
      <div className="flex items-center gap-2">
        <img src="/logo3.png" alt="alert" width={50} height={50} />
        <h1 className="font-semibold text-2xl text-center text-balance">
          E-CAM
        </h1>
      </div>
      <SignInForm />
    </main>
  )

  //
}
