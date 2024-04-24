import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CardFooter } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Banknote } from 'lucide-react'

export function LoansCard() {
  return (
    <Link to="/app/loans">
      <Card className="cursor-pointer w-96 transform hover:scale-[1.02] ease-in-out duration-700 shadow-md">
        <CardHeader>
          <CardTitle className="flex p-1 items-center justify-between gap-2">
            <span className="text-lg">Loans</span>
            <Banknote className="mt-1" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl">
            <b>120+</b>
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm">Create and view loan applications</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
