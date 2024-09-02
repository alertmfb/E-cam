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
    <main className="container min-h-screen items-center p-3 flex flex-col justify-center gap-14">
      <div className="flex items-center gap-2 justify-end">
        <img
          src="/logo3.png"
          alt="alert"
          width={50}
          height={50}
          className="scale-75 sm:scale-100"
        />
        <div className="font-semibold text-xl sm:text-2xl text-center text-balance">
          E-CAM
        </div>
      </div>
      <SignInForm />
    </main>
  )

  //
}
