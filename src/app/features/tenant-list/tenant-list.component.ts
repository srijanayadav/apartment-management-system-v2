
import { Component , OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveUserDialogComponent } from '../save-user-dialog/save-user-dialog.component';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SaveTenantDialogComponent } from '../save-tenant-dialog/save-tenant-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SubmitRentalRequestDialogComponent } from 'src/app/features/submit-rental-request-dialog/submit-rental-request-dialog.component';
import { UpdateUserDetailDialogComponent } from '../update-user-detail-dialog/update-user-detail-dialog.component';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent {
  public displayedColumns = ['id','email', 'name', 'address','contact-number','rental', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<UserDetail>();
  public isLoading = false;
  private userTypeId:number = 3;

  constructor(public dialog: MatDialog,private userDetailService: UserDetailService) {

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
    this.getAllTenants();
  }
  
  public getAllTenants = () => {
    this.isLoading = true;
    
    this.userDetailService.getAllUserDetails().subscribe({
        next: (data) =>  {
          this.dataSource.data = data.filter(x=>x.user_type_id == this.userTypeId && x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);
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
        this.getAllTenants();

      }
     
    });
    

  }
  public redirectToDetails = (id: string) => {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:"TENANT DETAIL",
      userDetailId:Number(id)
    }
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UserDetailDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
     
    });
    
  }
  public redirectToUpdate = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:"UPDATE TENANT",
      userDetailId:Number(id),
      userTypeId:3
    }
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UpdateUserDetailDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllTenants();

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
    
          this.userDetailService.archive(Number(id)).subscribe({
              next: (data) => {
                this.getAllTenants();
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
        this.getAllTenants();

      }
     
    });
  }




}
