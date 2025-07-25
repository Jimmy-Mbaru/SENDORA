import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';


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
    loadChildren: () =>
      import('./user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'admin/profile',
    loadComponent: () =>
      import('./shared/components/profile/profile.component').then((m) => m.ProfileComponent),
  },

  {
    path: 'admin/create-parcel',
    loadComponent: () =>
      import('./features/admin/create-parcel-form/create-parcel-form.component').then(m => m.CreateParcelFormComponent),
  },

  {
    path: 'admin/view-parcels',
    loadComponent: () =>
      import('./features/admin/view-parcels/view-parcels.component').then(m => m.ViewParcelsComponent),
  },

  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },

  {
    path: 'admin/view-parcel/:id',
    loadComponent: () => import('./shared/components/view-parcel-details/view-parcel-details.component').then(m => m.ViewParcelDetailsComponent)
  },


  {
    path: 'admin',
    component: DashboardComponent, // shell layout
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
        redirectTo: 'sent' // default route
      },

      {
        path: 'view-parcel/:id',
        loadComponent: () => import('./shared/components/view-parcel-details/view-parcel-details.component').then(m => m.ViewParcelDetailsComponent)
      }



    ]
  },




  { path: '**', redirectTo: '', pathMatch: 'full' },
];
