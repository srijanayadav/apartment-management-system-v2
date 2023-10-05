import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { JwtPayloadData } from '../../models/jwt-payload-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/features/change-password-dialog/change-password-dialog.component';
import { UpdateUserDetailDialogComponent } from 'src/app/features/update-user-detail-dialog/update-user-detail-dialog.component';
import { UserDetailService } from '../../services/user-detail.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserDetail } from '../../models/user-detail';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  public jwtPayloadData : JwtPayloadData;
  public userFullName = "";
  public role:string="";
  constructor(private authService: AuthService, 
    private router: Router,
    public dialog: MatDialog,
    private userDetailService:UserDetailService,
    private localStorageService:LocalStorageService,
    private jwtService:JwtService) {
      this.jwtPayloadData = this.jwtService.getPayload();
      

    }

  ngOnInit() {
   this. displayUserProfile();
  }

  displayUserProfile(){
    if(this.jwtPayloadData.is_superuser==true){
      this.userFullName = this.jwtPayloadData.first_name + ' ' + this.jwtPayloadData.last_name;
      this.role = "Admin";



    }else{
      const userDetail:UserDetail =  this.localStorageService.get("user_detail");
      this.userFullName = `${userDetail.first_name} ${userDetail.last_name}`;
      if(userDetail.user_type_id === 2){
        this.role = "Owner";

      }else if(userDetail.user_type_id === 3){
        this.role = "Tenant";
      }
    }
    
  }
  logout(){
    this.authService.logout();
    this.localStorageService.remove('user_detail');
    this.router.navigate(['login'],{replaceUrl:true});

  }
  changePassword(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
   
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       

      }
     
    });

  }

  updateUserProfile(){
    const userDetail:UserDetail =  this.localStorageService.get("user_detail");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:"UPDATE PROFILE",
      userDetailId:userDetail.id,
      userTypeId:userDetail.user_type_id
    }
    dialogConfig.width= '500px';
    const dialogRef = this.dialog.open(UpdateUserDetailDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const result = await this.getUserDetails( this.jwtPayloadData.id);
        this. displayUserProfile();
      }
     
    });
    
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

}
