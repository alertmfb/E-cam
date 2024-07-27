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
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/verification-picture"
                  params={{ loanId: loanId }}
                >
                  Verification Pic
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/customer-business"
                  params={{ loanId: loanId }}
                >
                  Customer Business
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/document"
                  params={{ loanId: loanId }}
                >
                  Document Upload
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
            to="/app/loans/$loanId/verification-picture"
            params={{ loanId: loanId }}
          >
            Verification Pic
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/customer-business"
            params={{ loanId: loanId }}
          >
            Business Pic
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/document"
            params={{ loanId: loanId }}
          >
            Document Upload
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BreadcrumbEllipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/profit-loss"
                params={{ loanId: loanId }}
              >
                Profit & Loss
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/profit-loss"
                params={{ loanId: loanId }}
              >
                Stock Pledge
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                activeProps={{ className: 'text-black font-semibold' }}
                to="/app/loans/$loanId/profit-loss"
                params={{ loanId: loanId }}
              >
                Collateral Pledge
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
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/document"
                  params={{ loanId: loanId }}
                >
                  Document Upload
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/customer-business"
                  params={{ loanId: loanId }}
                >
                  Customer Biz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  activeProps={{ className: 'text-black font-semibold' }}
                  to="/app/loans/$loanId/verification-picture"
                  params={{ loanId: loanId }}
                >
                  Verification Pic
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
            Stock Pledge
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            activeProps={{ className: 'text-black font-semibold' }}
            to="/app/loans/$loanId/profit-loss"
            params={{ loanId: loanId }}
          >
            Collateral Pledge
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
