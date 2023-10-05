import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';

@Component({
  selector: 'app-save-owner-dialog',
  templateUrl: './save-owner-dialog.component.html',
  styleUrls: ['./save-owner-dialog.component.css']
})
export class SaveOwnerDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2;

  public genders:DropDownItem[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'}
    
  ];
  public userTypes:DropDownItem[] = [
    {value: '2', viewValue: '"Owner"'},
    {value: '3', viewValue: 'Tenant'}
    
  ];


  constructor( private fb: FormBuilder,
    private userDetailService:UserDetailService,
    public dialogRef: MatDialogRef<SaveOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        unit_id:['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        contact_number: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        gender:['']
    })
  }
  ngOnInit() {
   
  }
  get f(){
    return this.form;
  }
  save() {
    if(this.form.valid){
      console.log(this.form.value);
      this.data = {...this.data,...this.form.value};
      this.data .user_type_id = this.userTypeId;

      this.userDetailService.create(this.data).subscribe(
        {
          next:(res)=>this.dialogRef.close(true),
          error:(err)=>console.log(err),
          complete:()=>{}
        });
      
    }
   
  }

  close() {
      this.dialogRef.close(false);
  }


}
