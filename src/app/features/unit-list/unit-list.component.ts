
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


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit,AfterViewInit{
  public displayedColumns = ['id','title', 'unit_number', 'floor_number','bedrooms','owner','rental', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<UnitInfo>();
  public isLoading: boolean=false;
  public jwtPayloadData : JwtPayloadData;
  public hideApplyRentalButton:boolean=true;

  constructor(public dialog: MatDialog,
    private localStorageService:LocalStorageService,
    private unitService: UnitService,
    private jwtService:JwtService) {
      this.jwtPayloadData = this.jwtService.getPayload();
      this.hideApplyRentalButton= true;

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
    this.showHideApplyRentalButton();
    this.getAllUnits();
  }
  public showHideApplyRentalButton(){
    if(!this.jwtPayloadData.is_superuser){
      const userDetail:UserDetail =  this.localStorageService.get("user_detail");
      if(userDetail.user_type_id===3){
        this.hideApplyRentalButton= false;

      }
    }

  }
  public getAllUnits = () => {
   
    this.isLoading = true;
    
    this.unitService.getAllUnits().subscribe({
        next: (data) =>{ 
          console.log(data);
          if(this.jwtPayloadData.is_superuser){
            this.dataSource.data = data.filter(x=>x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);
          }else{
            const userDetail:UserDetail =  this.localStorageService.get("user_detail");
            if(userDetail.user_type_id === 2){
              this.dataSource.data = data.filter(x=>x.owner_id===userDetail.id && x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);

            }else{
              this.dataSource.data = data.filter(x=>x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);
            }
          }
          

        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  public redirectToOwnerDetails = (ownerId: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      owner_id:ownerId
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(OwnerDetailsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      

      }
     
    });
    
  }
  public redirectToAddOwner = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      unit_id:id
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(AssignOwnerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllUnits();

      }
     
    });
    
  }
  public redirectToDetails = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      unit_id:id
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UnitDetailsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      

      }
     
    });
  }
  public redirectToUpdate = (id: string) => {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

     dialogConfig.data = {
      unit_id:id
     };

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UpdateUnitDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllUnits();

      }
     
    });
  }
  public redirectToDelete = (id: string) => {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  {
      title: "Are you sure?",
      message: "You are about to delete unit "
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
    
          this.unitService.archive(Number(id)).subscribe({
              next: (data) => {
                this.getAllUnits();
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

    //dialogConfig.data = unit;

    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SaveUnitDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllUnits();

      }
     
    });
  }
  redirectToAppyRental(id:string,unit_number:string){
    const userDetail:UserDetail =  this.localStorageService.get("user_detail");
   

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={
      "tenant_id":userDetail.id,
      "tenant_name":userDetail.first_name,
      "unit_id":id,
      "unit_number":unit_number
    };
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SubmitTenantRentalRequestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllUnits();

      }
     
    });

  }
}



