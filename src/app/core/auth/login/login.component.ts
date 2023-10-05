import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignIn } from '../../models/sign-in';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from 'src/app/features/forgot-password-dialog/forgot-password-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserDetailService } from '../../services/user-detail.service';
import { UserDetail } from '../../models/user-detail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  public isLoading = false;
  public isError = false;
  public errorMsg:string = "";

  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private userDetailService:UserDetailService,
    private localStorageService:LocalStorageService,
    private router: Router,
    public dialog: MatDialog) {

        this.form = this.fb.group({
        email: ['',[Validators.required,Validators.email]],
        password: ['',Validators.required]
        });

      }
      get f(){
        return this.form;
      }
      login() {
        const val = this.form.value;
       

        if (val.email && val.password) {
          this.isLoading = true;
          this.isError = false;
          const sign_in : SignIn =  {
            email__eq : val.email,
            password : val.password
          };
          try{
            this.authService.login(sign_in)
                .subscribe(
                    {
                      next: async (data) =>  {
                
                        if(!data.user_info.is_superuser)
                        {
                          const result = await this.getUserDetails(data.user_info.id);
                          console.log(result);
                        }
                        console.log("redirect");
                        this.router.navigate([''],{replaceUrl:true});
                      },
                      error: (e) => {
                        console.error(e);
                        this.isLoading = false;
                        this.isError = true;
                        this.errorMsg=e.detail;
                      },
                      complete: () => this.isLoading = false 
                    }
                    
                );

          }catch(e){
            console.log(e);

          }
 
            
        }
    }

    async getUserDetails(userId:number):Promise<UserDetail>{
      try{
        const userdetail : UserDetail= await this.userDetailService.getUserDetailByUserId(userId);
        this.localStorageService.save(userdetail,"user_detail");
        return userdetail;
      
      }catch(e){
        console.log(e);
        throw e;


      }
     
    }


    forgotPassword(){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width= '500px';

      const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {});

    }

}
