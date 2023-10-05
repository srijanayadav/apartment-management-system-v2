import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AdminSignUp } from 'src/app/core/models/admin-sign-up';
import { SignUp } from 'src/app/core/models/sign-up';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
@Component({
  selector: 'app-save-user-dialog',
  templateUrl: './save-user-dialog.component.html',
  styleUrls: ['./save-user-dialog.component.css']
})
export class SaveUserDialogComponent {
  public form: FormGroup =new FormGroup({});

  constructor( private fb: FormBuilder,
    private authService:AuthService,
    public dialogRef: MatDialogRef<SaveUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignUp) {

      this.form = this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
          confirm_password: ['', [Validators.required,ConfirmPasswordValidator("password")]],
          first_name: ['', [Validators.required]],
          last_name: ['', [Validators.required]]
        }
       
    
      );
    
  
  }
  ngOnInit() {
   
  }
  get f(){
    return this.form;
  }
  save() {
    if(this.form.valid){

      const signUp:AdminSignUp = {...this.data,...this.form.value};
      signUp.is_superuser=true;
      
      this.authService.adminSignUp(signUp).subscribe(
        {
          next:(res)=>this.dialogRef.close(true),
          error:(err)=>console.log(err),
          complete:()=>{}
        }
       
      );
      
    }
   
  }

  close() {
      this.dialogRef.close(false);
  }


}
