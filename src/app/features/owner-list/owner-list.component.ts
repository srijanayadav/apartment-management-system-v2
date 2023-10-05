
import { Component , OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SaveOwnerDialogComponent } from '../save-owner-dialog/save-owner-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UnitService } from 'src/app/core/services/unit.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UpdateUserDetailDialogComponent } from '../update-user-detail-dialog/update-user-detail-dialog.component';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent {
  public displayedColumns = ['id','email', 'name', 'address','contact-number', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<UserDetail>();
  public isLoading: boolean = false;
  private userTypeId:number = 2;


  constructor(public dialog: MatDialog,
    private userDetailService: UserDetailService,
    private unitService: UnitService) {

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
    this.getAllOwners();
  }
  
  public getAllOwners = () => {
    this.isLoading = true;
    
    this.userDetailService.getAllUserDetails().subscribe({
        next: (data) => { 
          this.dataSource.data = data.filter(x=>x.user_type_id == this.userTypeId && x.is_active !== false).sort((a, b) => (a.id > b.id) ? 1 : -1);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  public redirectToDetails = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:"OWNER DETAIL",
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
      title:"UPDATE OWNER",
      userDetailId:Number(id),
      userTypeId:2
    }
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UpdateUserDetailDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllOwners();

      }
     
    });
    
  }
  public redirectToDelete = (id: string) => {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  {
      title: "Are you sure?",
      message: "You are about to delete owner "
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
                this.getAllOwners();
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

  async openDialog(): Promise<void> {
    const ownerDropDownItems = await this.getAllUnits();
    console.log(ownerDropDownItems);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      owner_dropdown_items : ownerDropDownItems
    }
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(SaveOwnerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllOwners();

      }
     
    });
  }

  public getAllUnits =  async (): Promise<DropDownItem[]> => {
   
    const unitInfos = await (this.unitService.getAllUnAssignedUnits())
    const items: DropDownItem[] = unitInfos.filter(x=>x.owner_id == null)
                  .map((x)=>{ 
                    const item : DropDownItem = {value: x.id.toString(),viewValue:x.unit_number }; 
                    return item;}
                    );
    
    return items;
  }

}
