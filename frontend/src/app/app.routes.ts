import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'user',
    redirectTo: 'user-dashboard',
    pathMatch: 'full',
  },

  {
    path: 'admin/profile',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./shared/components/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'admin/create-parcel',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/create-parcel-form/create-parcel-form.component').then(m => m.CreateParcelFormComponent),
  },
  {
    path: 'admin/view-parcels',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/view-parcels/view-parcels.component').then(m => m.ViewParcelsComponent),
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'admin/view-parcel/:id',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./shared/components/view-parcel-details/view-parcel-details.component').then(m => m.ViewParcelDetailsComponent)
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/stat-cards/stat-cards.component').then((m) => m.StatCardComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pie-chart/pie-chart.component').then((m) => m.PieChartComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/parcel-table/parcel-table.component').then((m) => m.ParcelTableComponent),
      },
    ],
  },
  {
    path: 'user-dashboard',
    canActivate: [authGuard],
    data: { role: 'USER' },
    loadComponent: () => import('./features/user/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
    children: [
      {
        path: 'sent',
        loadComponent: () => import('./features/user/sent/sent.component').then(m => m.SentComponent)
      },
      {
        path: 'received',
        loadComponent: () => import('./features/user/received/received.component').then(m => m.ReceivedComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sent'
      },
      {
        path: 'view-parcel/:id',
        loadComponent: () => import('./shared/components/view-parcel-details/view-parcel-details.component').then(m => m.ViewParcelDetailsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
