import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SidemenuComponent } from './core/layout/sidemenu/sidemenu.component';
import { authGuard } from './core/guards/auth.guard';
import { UserListComponent } from './features/user-list/user-list.component';
import { UnitListComponent } from './features/unit-list/unit-list.component';
import { TenantListComponent } from './features/tenant-list/tenant-list.component';
import { OwnerListComponent } from './features/owner-list/owner-list.component';
import { RentalListComponent } from './features/rental-list/rental-list.component';
import { TenantAgremmentViewerComponent } from './features/tenant-agremment-viewer/tenant-agremment-viewer.component';
import { RentalDetailsComponent } from './features/rental-details/rental-details.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ChangePasswordDialogComponent } from './features/change-password-dialog/change-password-dialog.component';
import{InvoiceListComponent} from './features/invoice-list/invoice-list.component'
import { InvoiceDetailsComponent } from './features/invoice-details/invoice-details.component';

const routes: Routes = [  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'tenant-agremment-viewer',
    component:TenantAgremmentViewerComponent

  },
  {
    path:'sign-up',
    component:SignUpComponent

  },
  {
    path: '',
    component: SidemenuComponent,
    canActivate:[authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'units',
        component: UnitListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'tenants',
        component: TenantListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'owners',
        component: OwnerListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'rentals',
        component: RentalListComponent,
        canActivate:[authGuard]
      },
      {
        path:'rental-details',
        component: RentalDetailsComponent,
        canActivate:[authGuard]

      },
      {
        path:'invoices',
        component:InvoiceListComponent,
        canActivate:[authGuard]

      },
      {

        path:'invoice-details',
        component:InvoiceDetailsComponent,
        canActivate:[authGuard]
      },
      {
        path: 'about',
        component: AboutComponent,
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
