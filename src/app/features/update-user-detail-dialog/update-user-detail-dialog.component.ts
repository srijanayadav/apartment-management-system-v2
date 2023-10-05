import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UserDetail } from 'src/app/core/models/user-detail';

@Component({
  selector: 'app-update-user-detail-dialog',
  templateUrl: './update-user-detail-dialog.component.html',
  styleUrls: ['./update-user-detail-dialog.component.css']
})
export class UpdateUserDetailDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId:number;
  private userDetailId:number;
  public title:string;
  public isLoading:boolean = false;
  private userDetail:UserDetail | undefined;

  constructor( private fb: FormBuilder,
    private userDetailService:UserDetailService,
    public dialogRef: MatDialogRef<UpdateUserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        contact_number: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.userDetailId = data.userDetailId;
    this.userTypeId = data.userTypeId;
    this.title = data.title;
  }
  ngOnInit() {
    this.geUserDetails();
  }
  get f(){
    return this.form;
  }
  public geUserDetails = () => {
    this.isLoading = true;
    
    this.userDetailService.getUserDetailById(this.userDetailId).subscribe({
        next: (data) => {
          this.userDetail=data; 
          this.form.get('email')?.setValue(data.email?.toString());
          this.form.get('first_name')?.setValue(data.first_name?.toString());
          this.form.get('last_name')?.setValue(data.last_name?.toString());
          this.form.get('address')?.setValue(data.address?.toString());
          this.form.get('contact_number')?.setValue(data.contact_number?.toString());
          
          console.log(data);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }



  save() {
    if(this.form.valid){
      console.log(this.form.value);
      const upsertUserDetail : UpsertUserDetail= {...this.form.value};
      upsertUserDetail.user_type_id = this.userDetail?.user_type_id!;

      this.userDetailService.update(this.userDetailId,upsertUserDetail).subscribe(
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
