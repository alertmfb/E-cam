import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'

export function ApplicationNav({ loanId }: { loanId: string }) {
  return (
    <Breadcrumb className="text-base font-normal">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              activeProps={{ className: 'text-black font-semibold' }}
              to="/app/loans/$loanId/client-information"
              params={{ loanId }}
            >
              Client Information
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              activeProps={{ className: 'text-black font-semibold' }}
              to="/app/loans/$loanId/family-expenses"
              params={{ loanId: loanId }}
            >
              Family Expenses
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              activeProps={{ className: 'text-black font-semibold' }}
              to="/app/loans/$loanId/business-expenses"
              params={{ loanId: loanId }}
            >
              Business Expenses
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              activeProps={{ className: 'text-black font-semibold' }}
              to="/app/loans/$loanId/reference"
              params={{ loanId: loanId }}
            >
              Reference
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis className="cursor-pointer" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function ApplicationNavB() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link>Gurantors' Info</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Pictoral Evidence</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Gurantors Business..</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Collateral Pledge</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
