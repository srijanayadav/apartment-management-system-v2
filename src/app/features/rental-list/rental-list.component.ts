
import { Component , OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveUserDialogComponent } from '../save-user-dialog/save-user-dialog.component';
import { RentalService } from 'src/app/core/services/rental.service';
import { Rental } from 'src/app/core/models/rental';
import { SaveTenantDialogComponent } from '../save-tenant-dialog/save-tenant-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SubmitRentalRequestDialogComponent } from 'src/app/features/submit-rental-request-dialog/submit-rental-request-dialog.component';
import { UpdateRentalRequestDialogComponent } from 'src/app/features/update-rental-request-dialog/update-rental-request-dialog.component';
import { Router } from '@angular/router';
import { JwtPayloadData } from 'src/app/core/models/jwt-payload-data';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDetail } from 'src/app/core/models/user-detail';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent {
 
  public displayedColumns = ['id','unit', 'tenant-fullname','tenant-contact-number','tenant-email','status','submitted-date', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Rental>();
  public isLoading = false;
  public jwtPayloadData : JwtPayloadData;
  
  constructor(public dialog: MatDialog,
    private rentalService: RentalService,
    private router: Router,
    private jwtService:JwtService,
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
    this.getAllRentals();
  }
  
  public getAllRentals = () => {
    this.isLoading = true;
    
    this.rentalService.getRentals().subscribe({
        next: (data) =>  {
          //this.dataSource.data = data;
          if(this.jwtPayloadData.is_superuser){
            this.dataSource.data = data.filter(x=>x.is_active !== false);
          }else{
            const userDetail:UserDetail =  this.localStorageService.get("user_detail");
            if(userDetail.user_type_id === 2){
              this.dataSource.data = data.filter(x=>x.owner?.id === userDetail.id && x.is_active !== false);

            }else{
              this.dataSource.data = data.filter(x=>x.tenant?.id === userDetail.id && x.is_active !== false);
            }
          }
        },
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  public redirectToAppyRental =(id: string,fullName:string)=>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      tenant_id:id,
      tenant_name:fullName
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SubmitRentalRequestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllRentals();

      }
     
    });
    

  }
  public redirectToDetails = (id: string) => {
    
    this.router.navigate(
      ['/rental-details'],
      { queryParams: { rental_id: id } }
    );
  }
  public redirectToUpdate = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      rental_id:id,
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UpdateRentalRequestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllRentals();

      }
    });
  }
  public redirectToDelete = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  {
      title: "Are you sure?",
      message: "You are about to delete tenant "
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
    
          this.rentalService.archive(Number(id)).subscribe({
              next: (data) => {
                this.getAllRentals();
              },
              error: (e) => console.error(e),
              complete: () => {
                this.isLoading = false;
                
               }
            });
          
        }
        
    });
    
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  openDialog(): void {
   
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SaveTenantDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllRentals();

      }
     
    });
  }


}
