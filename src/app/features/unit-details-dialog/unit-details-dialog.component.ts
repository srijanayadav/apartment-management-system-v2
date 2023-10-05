import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UnitInfo } from 'src/app/core/models/unit-info';

@Component({
  selector: 'app-unit-details-dialog',
  templateUrl: './unit-details-dialog.component.html',
  styleUrls: ['./unit-details-dialog.component.css']
})
export class UnitDetailsDialogComponent {
 
  public isLoading: boolean = false;
  public unitInfo:UnitInfo | undefined;
  private unit_id:number;

  constructor( 
    private userDetailService:UserDetailService,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<UnitDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.unit_id = data.unit_id;
    
  
  }
  ngOnInit() {
    console.log(this.unit_id);
    this.getUnitDetail(this.unit_id);
   
  }
  public getUnitDetail = (id:number) => {
   
    this.isLoading = true;
    
    this.unitService.getUnitById(id).subscribe({
        next: (data) =>  this.unitInfo = data,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  close() {
    this.dialogRef.close(false);
  }
}
