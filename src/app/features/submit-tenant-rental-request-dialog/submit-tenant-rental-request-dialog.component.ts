import { Component ,Inject, QueryList, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UpsertRental } from 'src/app/core/models/upsert-rental';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { RentalService } from 'src/app/core/services/rental.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-submit-tenant-rental-request-dialog',
  templateUrl: './submit-tenant-rental-request-dialog.component.html',
  styleUrls: ['./submit-tenant-rental-request-dialog.component.css']
})
export class SubmitTenantRentalRequestDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2; 
  public isLoading: boolean = false;
  public tenant_id:number;
  public tenant_name:string;
  public unit_id:number;
  public unit_number:string;

  constructor( private fb: FormBuilder,
    private rentalService:RentalService,
    private unitService:UnitService,
    private localStorageService:LocalStorageService,
    public dialogRef: MatDialogRef<SubmitTenantRentalRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
      });
    this.tenant_id = data.tenant_id;
    this.tenant_name = data.tenant_name;
    this.unit_id= data.unit_id;
    this.unit_number= data.unit_number;
    
  
  }

  save() {
    const rental = <UpsertRental>{
      tenant_id:this.tenant_id,
      rent_status_id:1,
      is_online_agreement:true,
      unit_id:this.unit_id
    };
     
    console.log(rental);
    this.rentalService.create(rental).subscribe(
      {
        next:(res)=>this.dialogRef.close(true),
        error:(err)=>console.log(err),
        complete:()=>{}
      });
   
      
  }

  close() {
      this.dialogRef.close(false);
  }

}
