import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UnitInfo } from 'src/app/core/models/unit-info';
import { UserDetail } from 'src/app/core/models/user-detail';

@Component({
  selector: 'app-owner-details-dialog',
  templateUrl: './owner-details-dialog.component.html',
  styleUrls: ['./owner-details-dialog.component.css']
})
export class OwnerDetailsDialogComponent {
  public isLoading: boolean = false;
  public userDetail:UserDetail | undefined;
  private owner_id:number;

  constructor( 
    private userDetailService:UserDetailService,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<OwnerDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.owner_id = data.owner_id;
    
  
  }
  ngOnInit() {
    console.log(this.owner_id);
    this.getUserDetail(this.owner_id);
   
  }
  public getUserDetail = (id:number) => {
   
    this.isLoading = true;
    
    this.userDetailService.getUserDetailById(id).subscribe({
        next: (data) =>  this.userDetail = data,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  close() {
    this.dialogRef.close(false);
  }

}
