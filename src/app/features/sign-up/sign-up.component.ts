import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { AuthService } from 'src/app/core/services/auth.service';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { UserSignUp } from 'src/app/core/models/user-sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form:FormGroup;
  private userTypeId = 3;
  public isSubmitted = false;


  public genders:DropDownItem[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'}
    
  ];
  public isLoading = false;
  public isError = false;
  public errorMsg:string = "";

  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router) {

      this.form = this.fb.group({

        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
        confirm_password: ['', [Validators.required,ConfirmPasswordValidator("password")]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        contact_number: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        gender:['']
      
      });

    }

    ngOnInit() {
   
    }
    get f(){
      return this.form;
    }
    save() {
      this.isSubmitted = true;
      this.isError=false;
      this.errorMsg=";"
      if(this.form.valid){
        this.isLoading=true;
  
        const data:UserSignUp = {...this.form.value};
        data.user_type_id= this.userTypeId;
        this.authService.userSignUp(data).subscribe(
          {
            next:(res)=>{
              this.isLoading=false;

            },
            error:(err)=>{
              this.isLoading=false;
              this.isError=true;
             
              console.log(err);
              this.errorMsg=err.detail;
            },
            complete:()=>{
              this.isLoading=false;
              this.router.navigate(['/login'],{replaceUrl:true});
            }
          }
         
        );
        
      }
     
    }

}
