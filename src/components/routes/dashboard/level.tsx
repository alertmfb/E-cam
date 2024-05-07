import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CardFooter } from '@/components/ui/card'
import { Link, Navigate } from '@tanstack/react-router'
import { Activity, Banknote, ListTodo, PlusCircle, SquareX } from 'lucide-react'

type Role = 'loan_officer' | 'branch_manager' | 'relationship_manager'

export function DashboardUi() {
  let role

  if (typeof window !== 'undefined' && window.localStorage) {
    role = JSON.parse(localStorage.getItem('role')!) as Role
  }

  switch (role) {
    case 'loan_officer': {
      return <LoanOfficerUi />
    }
    case 'branch_manager': {
      return <RelationshipManagerUi />
    }
    case 'relationship_manager': {
      return <RelationshipManagerUi />
    }
    default: {
      return <Navigate to="/sign-in" />
    }
  }
}

export function LoanOfficerUi() {
  return (
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
          </CardContent>
          <CardFooter>
            <p className="text-sm">Create a loan application</p>
          </CardFooter>
        </Card>
      </Link>

      <Link to="/app/loans/incomplete">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1</div>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Loan applications not completed</p>
          </CardFooter>
        </Card>
      </Link>

      <Link to="/app/loans/status">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Track processed applications</p>
          </CardFooter>
        </Card>
      </Link>

      <Link to="/app/loans/rejected">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Rejected applications</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export function RelationshipManagerUi() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Link to="/app/loans/status">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1</div>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Pending applications for your branch</p>
          </CardFooter>
        </Card>
      </Link>

      <Link to="/app/loans/rejected">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <SquareX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Rejected applications for your branch</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export function BranchManagerUi() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Loan Applications
          </CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
        </CardContent>
        <CardFooter>
          <p className="text-sm">Pending applications</p>
        </CardFooter>
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
        </CardContent>
        <CardFooter>
          <p className="text-sm">Rejected applications</p>
        </CardFooter>
      </Card>

      <Card
        x-chunk="dashboard-01-chunk-0"
        className="cursor-pointer transform hover:scale-[1.02] ease-in-out duration-700"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1</div>
        </CardContent>
        <CardFooter>
          <p className="text-sm">Approved applications</p>
        </CardFooter>
      </Card>
    </div>
  )
}
