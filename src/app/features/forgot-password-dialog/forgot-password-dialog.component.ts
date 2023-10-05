import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/core/models/forgot-password';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent {
  form:FormGroup;
  public isLoading:boolean = false;
  public isError:boolean = false;
  public errorMsg:string = "";
  public isSuccess:boolean= false;
  public successMsg:string= "";

  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) {

      this.form = this.fb.group({
        email__eq: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      });

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
      if (this.form.value.email__eq) {
        this.isLoading = true;
        this.isError = false;
        const forgotPassword : ForgotPassword =  {...this.form.value}
          this.authService.sendForgotPassword(forgotPassword)
              .subscribe(
                  {
                    next: (data) =>  {
                      console.log(data.message);
                      this.isSuccess= true;
                      this.successMsg= data.message;
                      
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
