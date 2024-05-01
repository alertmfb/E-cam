// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import {
//   Table,
//   TableHead,
//   TableHeader,
//   TableBody,
//   TableCell,
//   TableRow,
// } from '@/components/ui/table'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Activity,
  // ArrowUpRight,
  PlusCircle,
  ListTodo,
} from 'lucide-react'

export const Route = createFileRoute('/app/_a/loans/')({
  component: Loans,
})

function Loans() {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-semibold px-4">Loans</h1>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Link to="/app/loans/new">
            <Card
              x-chunk="dashboard-01-chunk-0"
              className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+</div>
                <p className="text-xs text-muted-foreground">
                  create a loan application
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/app/loans/incomplete">
            <Card
              x-chunk="dashboard-01-chunk-0"
              className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Incomplete
                </CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Loan applications not completed
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Track applications
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Rejected applications
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"></div>
      </main>
    </div>
  )
}
