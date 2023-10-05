import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UpsertUnitOwner } from 'src/app/core/models/upsert-unit-owner';


@Component({
  selector: 'app-assign-owner-dialog',
  templateUrl: './assign-owner-dialog.component.html',
  styleUrls: ['./assign-owner-dialog.component.css']
})
export class AssignOwnerDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2; 
  public isLoading: boolean = false;
  public unit_id:number;
  public ownerDropDownitems: DropDownItem[] = <DropDownItem[]>{};
  public filteredOwner: Observable<any[]> | undefined;

  constructor( private fb: FormBuilder,
    private userDetailService:UserDetailService,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<AssignOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        owner_id:['', [Validators.required]],
       
    });
    this.unit_id = data.unit_id;
    
  
  }
  ngOnInit() {
    this.getAllOwners();
   
  }
  get f(){
    return this.form;
  }
  public getAllOwners = () => {
    this.isLoading = true;
    
    this.userDetailService.getAllUserDetails().subscribe({
        next: (data) => { 
          this.ownerDropDownitems= data.filter(x=>x.user_type_id == this.userTypeId) .map((x)=>{ 
            const item : DropDownItem = {value: x.id.toString(),viewValue:`${x.first_name} ${x.last_name}(${x.id})` }; 
            return item;}
            );
            this.filteredOwner = this.form.get('owner_id')!.valueChanges.pipe(
              startWith(''),
              map((owner) =>
                owner ? this.filterOwner(owner) : this.ownerDropDownitems?.slice()
              )
            );
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  save() {
    if(this.form.valid){
     
      const ownerInfo = <UpsertUnitOwner>{...this.form.value};
   
      this.unitService.updateOwner(this.unit_id,ownerInfo).subscribe(
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

  displayFn(value:string):any{
    
    return Array.isArray(this.ownerDropDownitems)? this.ownerDropDownitems.find(x=>x.value == value)?.viewValue:'';

  }
  filterOwner(name: string) {
    console.log(name);
    let arr = this.ownerDropDownitems.filter(
      (owner) => owner.viewValue.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

}
