import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './core/layout/sidemenu/sidemenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { LoginComponent } from './core/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { UserListComponent } from './features/user-list/user-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { SaveUserDialogComponent } from './features/save-user-dialog/save-user-dialog.component'
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UnitListComponent } from './features/unit-list/unit-list.component';
import { TenantListComponent } from './features/tenant-list/tenant-list.component';
import { OwnerListComponent } from './features/owner-list/owner-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SaveUnitDialogComponent } from './features/save-unit-dialog/save-unit-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { SaveOwnerDialogComponent } from './features/save-owner-dialog/save-owner-dialog.component';
import { SaveTenantDialogComponent } from './features/save-tenant-dialog/save-tenant-dialog.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AssignOwnerDialogComponent } from './features/assign-owner-dialog/assign-owner-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UnitDetailsDialogComponent } from './features/unit-details-dialog/unit-details-dialog.component';
import { OwnerDetailsDialogComponent } from './features/owner-details-dialog/owner-details-dialog.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { RentalListComponent } from './features/rental-list/rental-list.component';
import { SubmitRentalRequestDialogComponent } from './features/submit-rental-request-dialog/submit-rental-request-dialog.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { UpdateRentalRequestDialogComponent } from './features/update-rental-request-dialog/update-rental-request-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { TenantAgremmentViewerComponent } from './features/tenant-agremment-viewer/tenant-agremment-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RentalDetailsComponent } from './features/rental-details/rental-details.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailPageHeaderComponent } from './shared/detail-page-header/detail-page-header.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ForgotPasswordDialogComponent } from './features/forgot-password-dialog/forgot-password-dialog.component';
import { SubmitTenantRentalRequestDialogComponent } from './features/submit-tenant-rental-request-dialog/submit-tenant-rental-request-dialog.component';
import { UpdateUnitDialogComponent } from './features/update-unit-dialog/update-unit-dialog.component';
import { UpdateUserDetailDialogComponent } from './features/update-user-detail-dialog/update-user-detail-dialog.component';
import { UserDetailDialogComponent } from './features/user-detail-dialog/user-detail-dialog.component';
import { PhoneNumberPipe } from './core/pipes/phone-number.pipe';
import { ChangePasswordDialogComponent } from './features/change-password-dialog/change-password-dialog.component';
import { InvoiceListComponent } from './features/invoice-list/invoice-list.component';
import { SaveInvoiceDialogComponent } from './features/save-invoice-dialog/save-invoice-dialog.component';
import { InvoiceDetailsComponent } from './features/invoice-details/invoice-details.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    UserListComponent,
    SaveUserDialogComponent,
    UnitListComponent,
    TenantListComponent,
    OwnerListComponent,
    SaveUnitDialogComponent,
    SaveOwnerDialogComponent,
    SaveTenantDialogComponent,
    ConfirmDialogComponent,
    AssignOwnerDialogComponent,
    UnitDetailsDialogComponent,
    OwnerDetailsDialogComponent,
    RentalListComponent,
    SubmitRentalRequestDialogComponent,
    UpdateRentalRequestDialogComponent,
    TenantAgremmentViewerComponent,
    RentalDetailsComponent,
    DetailPageHeaderComponent,
    SignUpComponent,
    ForgotPasswordDialogComponent,
    SubmitTenantRentalRequestDialogComponent,
    UpdateUnitDialogComponent,
    UpdateUserDetailDialogComponent,
    UserDetailDialogComponent,
    PhoneNumberPipe,
    ChangePasswordDialogComponent,
    InvoiceListComponent,
    SaveInvoiceDialogComponent,
    InvoiceDetailsComponent,
    SpinnerComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PdfViewerModule,
    MatGridListModule,
    FlexLayoutModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }

  ],
  exports: [
    MatSortModule,
    MatPaginatorModule,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
