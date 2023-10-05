import { Component , OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveUserDialogComponent } from '../save-user-dialog/save-user-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,AfterViewInit {

  public isLoading: boolean=false;
  
  public displayedColumns = ['id', 'email', 'name', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>();

  constructor(public dialog: MatDialog,private userService: UserService) {

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
    this.getAllUsers();
  }
  public getAllUsers = () => {
   
    this.isLoading = true;
   
    this.userService.getUsers().subscribe({
        next: (data) =>  this.dataSource.data = data.filter(x=>x.is_superuser==true && x.is_active !== false),
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });

  }
  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  {
      title: "Are you sure?",
      message: "You are about to delete user."
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
    
          this.userService.archive(Number(id)).subscribe({
              next: (data) => {
                this.getAllUsers();
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
    const dialogRef = this.dialog.open(SaveUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllUsers();

      }
     
    });
  }
}
