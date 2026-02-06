import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@modules/auth';
import { InvoiceListPage, InvoiceCreatePage, InvoiceEditPage } from '@modules/invoice';
import { StockListPage } from '@modules/stock';
import { BomListPage, BomDetailPage } from '@modules/bom';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { AppShell } from './components/Shell/AppShell';

/**
 * Main Application Router.
 * 
 * According to Phase 5.3 & 5.5:
 * - Protects private routes via AuthGuard.
 * - Connects layout to auth state via AppShell.
 */
export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
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
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
