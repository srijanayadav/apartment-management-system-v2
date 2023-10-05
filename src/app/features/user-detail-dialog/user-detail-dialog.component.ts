import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { Observable, map, startWith } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user-detail';


@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent {
  public isLoading: boolean = false;
  public userDetail:UserDetail | undefined;
  private userDetailId:number;
  public title:string;

  constructor( 
    private userDetailService:UserDetailService,
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.userDetailId = data.userDetailId;
    this.title =  data.title;
    
  
  }
  ngOnInit() {
   
    this.getUserDetail(this.userDetailId);
   
  }
  public getUserDetail = (id:number) => {
   
    this.isLoading = true;
    
    this.userDetailService.getUserDetailById(id).subscribe({
        next: (data) =>  this.userDetail = data,
        error: (e) => {
          console.error(e);
          this.isLoading = false
        },
        complete: () => this.isLoading = false 
    });
  }
  close() {
    this.dialogRef.close(false);
  }

}
