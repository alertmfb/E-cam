/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as AppAImport } from './routes/app/_a'
import { Route as AppADashboardIndexImport } from './routes/app/_a.dashboard/index'
import { Route as AppALoansNewImport } from './routes/app/_a.loans/new'
import { Route as AppALoansIncompleteImport } from './routes/app/_a.loans/incomplete'
import { Route as AppALoansStatusIndexImport } from './routes/app/_a.loans/status/index'
import { Route as AppALoansRejectedIndexImport } from './routes/app/_a.loans/rejected/index'
import { Route as AppALoansPendingIndexImport } from './routes/app/_a.loans/pending/index'
import { Route as AppALoansLoanIdSubmitImport } from './routes/app/_a.loans/$loanId/submit'
import { Route as AppALoansLoanIdStockPledgeImport } from './routes/app/_a.loans/$loanId/stock-pledge'
import { Route as AppALoansLoanIdReferenceImport } from './routes/app/_a.loans/$loanId/reference'
import { Route as AppALoansLoanIdProfitLossImport } from './routes/app/_a.loans/$loanId/profit-loss'
import { Route as AppALoansLoanIdPictoralEvidenceImport } from './routes/app/_a.loans/$loanId/pictoral-evidence'
import { Route as AppALoansLoanIdGuarantorsInfoImport } from './routes/app/_a.loans/$loanId/guarantors-info'
import { Route as AppALoansLoanIdGuarantorBusinessImport } from './routes/app/_a.loans/$loanId/guarantor-business'
import { Route as AppALoansLoanIdFamilyExpensesImport } from './routes/app/_a.loans/$loanId/family-expenses'
import { Route as AppALoansLoanIdDocumentImport } from './routes/app/_a.loans/$loanId/document'
import { Route as AppALoansLoanIdDataImport } from './routes/app/_a.loans/$loanId/data'
import { Route as AppALoansLoanIdColPledgeImport } from './routes/app/_a.loans/$loanId/col-pledge'
import { Route as AppALoansLoanIdClientInformationImport } from './routes/app/_a.loans/$loanId/client-information'
import { Route as AppALoansLoanIdCertImport } from './routes/app/_a.loans/$loanId/cert'
import { Route as AppALoansLoanIdBusinessExpensesImport } from './routes/app/_a.loans/$loanId/business-expenses'
import { Route as AppALoansLoanIdBImport } from './routes/app/_a.loans/$loanId/_b'
import { Route as AppALoansStatusLoanIdIndexImport } from './routes/app/_a.loans/status/$loanId/index'
import { Route as AppALoansRejectedLoanIdIndexImport } from './routes/app/_a.loans/rejected/$loanId/index'
import { Route as AppALoansStatusLoanIdBranchIdImport } from './routes/app/_a.loans/status/$loanId/$branchId'
import { Route as AppALoansRejectedLoanIdBranchIdImport } from './routes/app/_a.loans/rejected/$loanId/$branchId'
import { Route as AppALoansPendingLoanIdClientInfoImport } from './routes/app/_a.loans/pending/$loanId/client-info'

// Create Virtual Routes

const AppImport = createFileRoute('/app')()
const AppALoansLoanIdImport = createFileRoute('/app/_a/loans/$loanId')()

// Create/Update Routes

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppARoute = AppAImport.update({
  id: '/_a',
  getParentRoute: () => AppRoute,
} as any)

const AppALoansLoanIdRoute = AppALoansLoanIdImport.update({
  path: '/loans/$loanId',
  getParentRoute: () => AppARoute,
} as any)

const AppADashboardIndexRoute = AppADashboardIndexImport.update({
  path: '/dashboard/',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansNewRoute = AppALoansNewImport.update({
  path: '/loans/new',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansIncompleteRoute = AppALoansIncompleteImport.update({
  path: '/loans/incomplete',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansStatusIndexRoute = AppALoansStatusIndexImport.update({
  path: '/loans/status/',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansRejectedIndexRoute = AppALoansRejectedIndexImport.update({
  path: '/loans/rejected/',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansPendingIndexRoute = AppALoansPendingIndexImport.update({
  path: '/loans/pending/',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansLoanIdSubmitRoute = AppALoansLoanIdSubmitImport.update({
  path: '/submit',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdStockPledgeRoute = AppALoansLoanIdStockPledgeImport.update(
  {
    path: '/stock-pledge',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any,
)

const AppALoansLoanIdReferenceRoute = AppALoansLoanIdReferenceImport.update({
  path: '/reference',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdProfitLossRoute = AppALoansLoanIdProfitLossImport.update({
  path: '/profit-loss',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdPictoralEvidenceRoute =
  AppALoansLoanIdPictoralEvidenceImport.update({
    path: '/pictoral-evidence',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdGuarantorsInfoRoute =
  AppALoansLoanIdGuarantorsInfoImport.update({
    path: '/guarantors-info',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdGuarantorBusinessRoute =
  AppALoansLoanIdGuarantorBusinessImport.update({
    path: '/guarantor-business',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdFamilyExpensesRoute =
  AppALoansLoanIdFamilyExpensesImport.update({
    path: '/family-expenses',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdDocumentRoute = AppALoansLoanIdDocumentImport.update({
  path: '/document',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdDataRoute = AppALoansLoanIdDataImport.update({
  path: '/data',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdColPledgeRoute = AppALoansLoanIdColPledgeImport.update({
  path: '/col-pledge',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdClientInformationRoute =
  AppALoansLoanIdClientInformationImport.update({
    path: '/client-information',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdCertRoute = AppALoansLoanIdCertImport.update({
  path: '/cert',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansLoanIdBusinessExpensesRoute =
  AppALoansLoanIdBusinessExpensesImport.update({
    path: '/business-expenses',
    getParentRoute: () => AppALoansLoanIdRoute,
  } as any)

const AppALoansLoanIdBRoute = AppALoansLoanIdBImport.update({
  id: '/_b',
  getParentRoute: () => AppALoansLoanIdRoute,
} as any)

const AppALoansStatusLoanIdIndexRoute = AppALoansStatusLoanIdIndexImport.update(
  {
    path: '/loans/status/$loanId/',
    getParentRoute: () => AppARoute,
  } as any,
)

const AppALoansRejectedLoanIdIndexRoute =
  AppALoansRejectedLoanIdIndexImport.update({
    path: '/loans/rejected/$loanId/',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansStatusLoanIdBranchIdRoute =
  AppALoansStatusLoanIdBranchIdImport.update({
    path: '/loans/status/$loanId/$branchId',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansRejectedLoanIdBranchIdRoute =
  AppALoansRejectedLoanIdBranchIdImport.update({
    path: '/loans/rejected/$loanId/$branchId',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansPendingLoanIdClientInfoRoute =
  AppALoansPendingLoanIdClientInfoImport.update({
    path: '/loans/pending/$loanId/client-info',
    getParentRoute: () => AppARoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/app/_a': {
      preLoaderRoute: typeof AppAImport
      parentRoute: typeof AppRoute
    }
    '/app/_a/loans/incomplete': {
      preLoaderRoute: typeof AppALoansIncompleteImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/new': {
      preLoaderRoute: typeof AppALoansNewImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/dashboard/': {
      preLoaderRoute: typeof AppADashboardIndexImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId': {
      preLoaderRoute: typeof AppALoansLoanIdImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/_b': {
      preLoaderRoute: typeof AppALoansLoanIdBImport
      parentRoute: typeof AppALoansLoanIdRoute
    }
    '/app/_a/loans/$loanId/business-expenses': {
      preLoaderRoute: typeof AppALoansLoanIdBusinessExpensesImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/cert': {
      preLoaderRoute: typeof AppALoansLoanIdCertImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/client-information': {
      preLoaderRoute: typeof AppALoansLoanIdClientInformationImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/col-pledge': {
      preLoaderRoute: typeof AppALoansLoanIdColPledgeImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/data': {
      preLoaderRoute: typeof AppALoansLoanIdDataImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/document': {
      preLoaderRoute: typeof AppALoansLoanIdDocumentImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/family-expenses': {
      preLoaderRoute: typeof AppALoansLoanIdFamilyExpensesImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/guarantor-business': {
      preLoaderRoute: typeof AppALoansLoanIdGuarantorBusinessImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/guarantors-info': {
      preLoaderRoute: typeof AppALoansLoanIdGuarantorsInfoImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/pictoral-evidence': {
      preLoaderRoute: typeof AppALoansLoanIdPictoralEvidenceImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/profit-loss': {
      preLoaderRoute: typeof AppALoansLoanIdProfitLossImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/reference': {
      preLoaderRoute: typeof AppALoansLoanIdReferenceImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/stock-pledge': {
      preLoaderRoute: typeof AppALoansLoanIdStockPledgeImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/$loanId/submit': {
      preLoaderRoute: typeof AppALoansLoanIdSubmitImport
      parentRoute: typeof AppALoansLoanIdImport
    }
    '/app/_a/loans/pending/': {
      preLoaderRoute: typeof AppALoansPendingIndexImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/rejected/': {
      preLoaderRoute: typeof AppALoansRejectedIndexImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/status/': {
      preLoaderRoute: typeof AppALoansStatusIndexImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/pending/$loanId/client-info': {
      preLoaderRoute: typeof AppALoansPendingLoanIdClientInfoImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/rejected/$loanId/$branchId': {
      preLoaderRoute: typeof AppALoansRejectedLoanIdBranchIdImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/status/$loanId/$branchId': {
      preLoaderRoute: typeof AppALoansStatusLoanIdBranchIdImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/rejected/$loanId/': {
      preLoaderRoute: typeof AppALoansRejectedLoanIdIndexImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/status/$loanId/': {
      preLoaderRoute: typeof AppALoansStatusLoanIdIndexImport
      parentRoute: typeof AppAImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AppRoute.addChildren([
    AppARoute.addChildren([
      AppALoansIncompleteRoute,
      AppALoansNewRoute,
      AppADashboardIndexRoute,
      AppALoansLoanIdRoute.addChildren([
        AppALoansLoanIdBusinessExpensesRoute,
        AppALoansLoanIdCertRoute,
        AppALoansLoanIdClientInformationRoute,
        AppALoansLoanIdColPledgeRoute,
        AppALoansLoanIdDataRoute,
        AppALoansLoanIdDocumentRoute,
        AppALoansLoanIdFamilyExpensesRoute,
        AppALoansLoanIdGuarantorBusinessRoute,
        AppALoansLoanIdGuarantorsInfoRoute,
        AppALoansLoanIdPictoralEvidenceRoute,
        AppALoansLoanIdProfitLossRoute,
        AppALoansLoanIdReferenceRoute,
        AppALoansLoanIdStockPledgeRoute,
        AppALoansLoanIdSubmitRoute,
      ]),
      AppALoansPendingIndexRoute,
      AppALoansRejectedIndexRoute,
      AppALoansStatusIndexRoute,
      AppALoansPendingLoanIdClientInfoRoute,
      AppALoansRejectedLoanIdBranchIdRoute,
      AppALoansStatusLoanIdBranchIdRoute,
      AppALoansRejectedLoanIdIndexRoute,
      AppALoansStatusLoanIdIndexRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
