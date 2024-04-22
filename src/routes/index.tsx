import { Header } from '@/components/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto pt-20"></div>
    </div>
  )
}
