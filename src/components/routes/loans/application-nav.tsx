import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/guarantors-info"
                  params={{ loanId: loanId }}
                >
                  Guarantor's Info
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Pictoral Evidence</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Guarantor's Business Verifivation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Collateral Pledge</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function ApplicationNavB({ loanId }: { loanId: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  to="/app/loans/$loanId/reference"
                  params={{ loanId: loanId }}
                >
                  Reference
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Business Expenses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Family Expenses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link>Client Information</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/guarantors-info"
            params={{ loanId: loanId }}
          >
            Guarantors' Info
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Pictoral Evidence</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Guarantors Business..</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link>Collateral Pledge</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
