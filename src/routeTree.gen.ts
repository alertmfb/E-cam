/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignInImport } from './routes/sign-in'
import { Route as IndexImport } from './routes/index'
import { Route as AppAImport } from './routes/app/_a'
import { Route as AppADashboardIndexImport } from './routes/app/_a.dashboard/index'
import { Route as AppALoansNewImport } from './routes/app/_a.loans/new'
import { Route as AppALoansIncompleteImport } from './routes/app/_a.loans/incomplete'
import { Route as AppALoansStatusIndexImport } from './routes/app/_a.loans/status/index'
import { Route as AppALoansRejectedIndexImport } from './routes/app/_a.loans/rejected/index'
import { Route as AppALoansPendingIndexImport } from './routes/app/_a.loans/pending/index'
import { Route as AppALoansLoanIdReferenceImport } from './routes/app/_a.loans/$loanId/reference'
import { Route as AppALoansLoanIdPictoralEvidenceImport } from './routes/app/_a.loans/$loanId/pictoral-evidence'
import { Route as AppALoansLoanIdGuarantorsInfoImport } from './routes/app/_a.loans/$loanId/guarantors-info'
import { Route as AppALoansLoanIdGuarantorVerificationImport } from './routes/app/_a.loans/$loanId/guarantor-verification'
import { Route as AppALoansLoanIdFamilyExpensesImport } from './routes/app/_a.loans/$loanId/family-expenses'
import { Route as AppALoansLoanIdDocumentImport } from './routes/app/_a.loans/$loanId/document'
import { Route as AppALoansLoanIdDataImport } from './routes/app/_a.loans/$loanId/data'
import { Route as AppALoansLoanIdClientInformationImport } from './routes/app/_a.loans/$loanId/client-information'
import { Route as AppALoansLoanIdBusinessExpensesImport } from './routes/app/_a.loans/$loanId/business-expenses'
import { Route as AppALoansStatusLoanIdIndexImport } from './routes/app/_a.loans/status/$loanId/index'
import { Route as AppALoansRejectedLoanIdIndexImport } from './routes/app/_a.loans/rejected/$loanId/index'
import { Route as AppALoansStatusLoanIdBranchIdImport } from './routes/app/_a.loans/status/$loanId/$branchId'
import { Route as AppALoansRejectedLoanIdBranchIdImport } from './routes/app/_a.loans/rejected/$loanId/$branchId'
import { Route as AppALoansPendingLoanIdClientInfoImport } from './routes/app/_a.loans/pending/$loanId/client-info'

// Create Virtual Routes

const AppImport = createFileRoute('/app')()

// Create/Update Routes

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  path: '/sign-in',
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

const AppALoansLoanIdReferenceRoute = AppALoansLoanIdReferenceImport.update({
  path: '/loans/$loanId/reference',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansLoanIdPictoralEvidenceRoute =
  AppALoansLoanIdPictoralEvidenceImport.update({
    path: '/loans/$loanId/pictoral-evidence',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansLoanIdGuarantorsInfoRoute =
  AppALoansLoanIdGuarantorsInfoImport.update({
    path: '/loans/$loanId/guarantors-info',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansLoanIdGuarantorVerificationRoute =
  AppALoansLoanIdGuarantorVerificationImport.update({
    path: '/loans/$loanId/guarantor-verification',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansLoanIdFamilyExpensesRoute =
  AppALoansLoanIdFamilyExpensesImport.update({
    path: '/loans/$loanId/family-expenses',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansLoanIdDocumentRoute = AppALoansLoanIdDocumentImport.update({
  path: '/loans/$loanId/document',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansLoanIdDataRoute = AppALoansLoanIdDataImport.update({
  path: '/loans/$loanId/data',
  getParentRoute: () => AppARoute,
} as any)

const AppALoansLoanIdClientInformationRoute =
  AppALoansLoanIdClientInformationImport.update({
    path: '/loans/$loanId/client-information',
    getParentRoute: () => AppARoute,
  } as any)

const AppALoansLoanIdBusinessExpensesRoute =
  AppALoansLoanIdBusinessExpensesImport.update({
    path: '/loans/$loanId/business-expenses',
    getParentRoute: () => AppARoute,
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
    '/sign-in': {
      preLoaderRoute: typeof SignInImport
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
    '/app/_a/loans/$loanId/business-expenses': {
      preLoaderRoute: typeof AppALoansLoanIdBusinessExpensesImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/client-information': {
      preLoaderRoute: typeof AppALoansLoanIdClientInformationImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/data': {
      preLoaderRoute: typeof AppALoansLoanIdDataImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/document': {
      preLoaderRoute: typeof AppALoansLoanIdDocumentImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/family-expenses': {
      preLoaderRoute: typeof AppALoansLoanIdFamilyExpensesImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/guarantor-verification': {
      preLoaderRoute: typeof AppALoansLoanIdGuarantorVerificationImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/guarantors-info': {
      preLoaderRoute: typeof AppALoansLoanIdGuarantorsInfoImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/pictoral-evidence': {
      preLoaderRoute: typeof AppALoansLoanIdPictoralEvidenceImport
      parentRoute: typeof AppAImport
    }
    '/app/_a/loans/$loanId/reference': {
      preLoaderRoute: typeof AppALoansLoanIdReferenceImport
      parentRoute: typeof AppAImport
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
  SignInRoute,
  AppRoute.addChildren([
    AppARoute.addChildren([
      AppALoansIncompleteRoute,
      AppALoansNewRoute,
      AppADashboardIndexRoute,
      AppALoansLoanIdBusinessExpensesRoute,
      AppALoansLoanIdClientInformationRoute,
      AppALoansLoanIdDataRoute,
      AppALoansLoanIdDocumentRoute,
      AppALoansLoanIdFamilyExpensesRoute,
      AppALoansLoanIdGuarantorVerificationRoute,
      AppALoansLoanIdGuarantorsInfoRoute,
      AppALoansLoanIdPictoralEvidenceRoute,
      AppALoansLoanIdReferenceRoute,
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
