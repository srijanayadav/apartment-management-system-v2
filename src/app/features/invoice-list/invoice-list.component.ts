
import { Component , OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveUserDialogComponent } from '../save-user-dialog/save-user-dialog.component';
import { UnitService } from 'src/app/core/services/unit.service';
import { UnitInfo } from 'src/app/core/models/unit-info';
import { SaveUnitDialogComponent } from '../save-unit-dialog/save-unit-dialog.component';
import { UpsertUnit } from 'src/app/core/models/upsert-unit';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AssignOwnerDialogComponent } from '../assign-owner-dialog/assign-owner-dialog.component';
import { UnitDetailsDialogComponent } from '../unit-details-dialog/unit-details-dialog.component';
import { OwnerDetailsDialogComponent } from '../owner-details-dialog/owner-details-dialog.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SubmitTenantRentalRequestDialogComponent } from '../submit-tenant-rental-request-dialog/submit-tenant-rental-request-dialog.component';
import { JwtPayloadData } from 'src/app/core/models/jwt-payload-data';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UpdateUnitDialogComponent } from '../update-unit-dialog/update-unit-dialog.component';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { Invoice } from 'src/app/core/models/invoice';
import { WindowRefService } from 'src/app/core/services/window-ref.service';
import { SaveInvoiceDialogComponent } from '../save-invoice-dialog/save-invoice-dialog.component';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
  public displayedColumns = ['id','invoice-number','total-amount','purpose','status', 'payee-fullname','payee-contact-number','payee-email', 'pay', 'details', 'delete'];
  public dataSource = new MatTableDataSource<Invoice>();
  public isLoading = false;
  public jwtPayloadData : JwtPayloadData;
  
  constructor(public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private router: Router,
    private jwtService:JwtService,
    private winRef: WindowRefService,
    private localStorageService:LocalStorageService) {
      this.jwtPayloadData = this.jwtService.getPayload();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit() {
    this.getAllInvoices();
  }
  
  public getAllInvoices = () => {
    this.isLoading = true;
    
    this.invoiceService.getInvoices().subscribe({
        next: (data) =>  {
          
          if(this.jwtPayloadData.is_superuser){
            this.dataSource.data = data.filter(x=>x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);;
          }else{
            const userDetail:UserDetail =  this.localStorageService.get("user_detail");
            this.dataSource.data = data.filter(x=>x.payee?.id === userDetail.id && x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);;
          }
        },
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  public redirectToDetails = (id: string) => {
    
    this.router.navigate(
      ['/invoice-details'],
      { queryParams: { invoice_id: id } }
    );
    
  }
  public redirectToPay = (id: string) => {
    
    
    this.invoiceService.beginInvoicePayment(Number(id)).subscribe({
      next: (data) =>  {
        console.log(data);
        const cashfree = new this.winRef.nativeWindow.Cashfree({
          mode:data.mode //or production
        });
        let version = cashfree.version();
        console.log(version);
        let checkoutOptions = {
          paymentSessionId: data.payment_session_id,
          returnUrl: data.order_meta.return_url,
          
        };
        cashfree.checkout(checkoutOptions).then((result:any)=>{
          if(result.error){
              alert(result.error.message)
          }
          if(result.redirect){
              console.log("Redirection")
          }
      });
      
      },
      error: (e) => console.error(e),
      complete: () => this.isLoading = false 
    });
  
  }
  public redirectToDelete = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  {
      title: "Are you sure?",
      message: "You are about to delete invoice "
    }


    dialogConfig.width= '400px';
      // let's call our modal window
      const dialogRef = this.dialog.open(ConfirmDialogComponent,dialogConfig);

      // listen to response
      dialogRef.afterClosed().subscribe(dialogResult => {
        // if user pressed yes dialogResult will be true, 
        // if he pressed no - it will be false
        console.log(dialogResult);
        if(dialogResult){
          this.isLoading = true;
    
          this.invoiceService.archive(Number(id)).subscribe({
              next: (data) => {
                this.getAllInvoices();
              },
              error: (e) => console.error(e),
              complete: () => {
                this.isLoading = false;
                
               }
            });
          
        }
        
    });
    
  }
  public redirectToAdd=()=>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SaveInvoiceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllInvoices();

      }
     
    });

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
