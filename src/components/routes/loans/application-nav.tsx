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
              params={{ loanId: loanId }}
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
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/guarantors-info"
                  params={{ loanId: loanId }}
                >
                  Guarantor's Info
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/pictoral-evidence"
                  params={{ loanId: loanId }}
                >
                  Pictoral Evidence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/guarantor-business"
                  params={{ loanId: loanId }}
                >
                  Guarantor's Biz Ver
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/profit-loss"
                  params={{ loanId: loanId }}
                >
                  ...
                </Link>
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
                <Link
                  to="/app/loans/$loanId/business-expenses"
                  params={{ loanId: loanId }}
                >
                  Business Expenses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/app/loans/$loanId/family-expenses"
                  params={{ loanId: loanId }}
                >
                  Family Expenses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/app/loans/$loanId/client-information"
                  params={{ loanId: loanId }}
                >
                  Client Information
                </Link>
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
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/pictoral-evidence"
            params={{ loanId: loanId }}
          >
            Pictoral Evidence
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/guarantor-business"
            params={{ loanId: loanId }}
          >
            Guarantor's Biz Ver
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BreadcrumbEllipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/profit-loss"
                params={{ loanId: loanId }}
              >
                Profit & Loss
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/stock-pledge"
                params={{ loanId: loanId }}
              >
                Stock Pledge
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/col-pledge"
                params={{ loanId: loanId }}
              >
                Collateral Pledge
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/visit-report"
                params={{ loanId: loanId }}
              >
                Visit Report
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const ApplicationNavC = ({ loanId }: { loanId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/guarantor-business"
                  params={{ loanId: loanId }}
                >
                  Guarantor's Biz Ver
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/pictoral-evidence"
                  params={{ loanId: loanId }}
                >
                  Pictoral Evidence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/guarantors-info"
                  params={{ loanId: loanId }}
                >
                  Guarantor Info
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/profit-loss"
            params={{ loanId: loanId }}
          >
            Profit & Loss
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/stock-pledge"
            params={{ loanId: loanId }}
          >
            Stock Pledge
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/col-pledge"
            params={{ loanId: loanId }}
          >
            Collateral Pledge
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/cashflow-test"
            params={{ loanId: loanId }}
          >
            Monthly Cashflow Test
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BreadcrumbEllipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/visit-report"
                params={{ loanId: loanId }}
              >
                Visit Report
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/committee-decision"
                params={{ loanId: loanId }}
              >
                Committee's Decision
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/submit"
                params={{ loanId: loanId }}
              >
                Submit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const ApplicationNavD = ({ loanId }: { loanId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/cashflow-test"
                  params={{ loanId: loanId }}
                >
                  Monthly Cashflow Test
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/col-pledge"
                  params={{ loanId: loanId }}
                >
                  Collateral Pledge
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/stock-pledge"
                  params={{ loanId: loanId }}
                >
                  Stock Pledge
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/profit-loss"
                  params={{ loanId: loanId }}
                >
                  Profit Loss
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/visit-report"
            params={{ loanId: loanId }}
          >
            Visit Report
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/committee-decision"
            params={{ loanId: loanId }}
          >
            Committee Decision
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/submit"
            params={{ loanId: loanId }}
          >
            Submit
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
