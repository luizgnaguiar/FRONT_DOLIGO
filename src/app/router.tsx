import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { AppShell } from './components/Shell/AppShell';
import { Spinner } from '@shared/ui';

// Lazy loaded modules
const LoginPage = lazy(() => import('@modules/auth').then(m => ({ default: m.LoginPage })));

// Invoice module
const InvoiceListPage = lazy(() => import('@modules/invoice').then(m => ({ default: m.InvoiceListPage })));
const InvoiceCreatePage = lazy(() => import('@modules/invoice').then(m => ({ default: m.InvoiceCreatePage })));
const InvoiceEditPage = lazy(() => import('@modules/invoice').then(m => ({ default: m.InvoiceEditPage })));

// Stock module
const StockListPage = lazy(() => import('@modules/stock').then(m => ({ default: m.StockListPage })));

// BOM module
const BomListPage = lazy(() => import('@modules/bom').then(m => ({ default: m.BomListPage })));
const BomDetailPage = lazy(() => import('@modules/bom').then(m => ({ default: m.BomDetailPage })));

// CRM module
const CustomerListPage = lazy(() => import('@modules/crm').then(m => ({ default: m.CustomerListPage })));
const LeadListPage = lazy(() => import('@modules/crm').then(m => ({ default: m.LeadListPage })));

/**
 * Main Application Router.
 * 
 * According to Phase 5.3 & 5.5 & 8.1:
 * - Protects private routes via AuthGuard.
 * - Connects layout to auth state via AppShell.
 * - Implements code splitting per route via lazy/Suspense.
 */
export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spinner size="lg" />
            </div>
          }>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: '/',
            element: <div>Dashboard / Home (PENDENTE)</div>,
          },
          {
            path: '/invoices',
            element: <InvoiceListPage />,
          },
          {
            path: '/invoices/new',
            element: <InvoiceCreatePage />,
          },
          {
            path: '/invoices/:id/edit',
            element: <InvoiceEditPage />,
          },
          {
            path: '/stock',
            element: <StockListPage />,
          },
          {
            path: '/boms',
            element: <BomListPage />,
          },
          {
            path: '/boms/:id',
            element: <BomDetailPage />,
          },
          {
            path: '/customers',
            element: <CustomerListPage />,
          },
          {
            path: '/leads',
            element: <LeadListPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
