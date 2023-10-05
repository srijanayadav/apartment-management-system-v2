import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/core/models/change-password';
import { UserService } from 'src/app/core/services/user.service';
import { JwtPayloadData } from 'src/app/core/models/jwt-payload-data';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  form:FormGroup;
  public isLoading:boolean = false;
  public isError:boolean = false;
  public errorMsg:string = "";
  public isSuccess:boolean= false;
  public successMsg:string= "";
  public jwtPayloadData : JwtPayloadData;

  constructor(private fb:FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private jwtService:JwtService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {

      this.form = this.fb.group({
        password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
        confirm_password: ['', [Validators.required,ConfirmPasswordValidator("password")]],
      });

      this.jwtPayloadData = jwtService.getPayload();

    }

    ngOnInit() {
   
    }
    get f(){
      return this.form;
    }

    submit() {
      this.isSuccess= false;
      if (this.form.invalid) {
        return;
    }
      if (this.form.valid) {
        this.isLoading = true;
        this.isError = false;
        const changePassword : ChangePassword =  {...this.form.value}
          this.userService.changePassword(this.jwtPayloadData.id,changePassword)
              .subscribe(
                  {
                    next: (data) =>  {
                      console.log(data.message);
                      this.isSuccess= true;
                      this.successMsg= data.message;
                      this.dialogRef.close(false);
                      
                    },
                    error: (e) => {
                      console.error(e);
                      this.isLoading = false;
                      this.isError = true;
                      this.errorMsg= e.detail;
                    },
                    complete: () => this.isLoading = false 
                  }
                  
              );
      }
  }

  close(){
    this.dialogRef.close(false);

  }

}
