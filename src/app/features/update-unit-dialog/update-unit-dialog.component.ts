import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUnit } from 'src/app/core/models/upsert-unit';
import { UnitService } from 'src/app/core/services/unit.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { Observable, lastValueFrom, map, startWith } from 'rxjs';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { UnitInfo } from 'src/app/core/models/unit-info';
import { UserDetail } from 'src/app/core/models/user-detail';

@Component({
  selector: 'app-update-unit-dialog',
  templateUrl: './update-unit-dialog.component.html',
  styleUrls: ['./update-unit-dialog.component.css']
})
export class UpdateUnitDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2; 
  public isLoading: boolean = false;
  public unit_id:number;
  public ownerDropDownitems: DropDownItem[] = <DropDownItem[]>{};
  public filteredOwner: Observable<any[]> | undefined;
  public unitInfo:UnitInfo | undefined;

  constructor( private fb: FormBuilder,
    private unitService:UnitService,
    private userDetailService:UserDetailService,
    public dialogRef: MatDialogRef<UpdateUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        title: ['', [Validators.required]],
        unit_number: ['', [Validators.required]],
        floor_number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        bedroom: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        bathroom: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        balcony: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        carpet_area: ['', [Validators.required, Validators.pattern("^([0-9]+(\.?[0-9]?[0-9]?)?)")]],
        parking_slot: ['', []],
        description: ['', []],
        unit_type_id: ['', [Validators.required]],
        block_id: ['', [Validators.required]],
        owner_id:['', []]
    });
    this.unit_id = data.unit_id;
  }

  unitTypes:DropDownItem[] = [
    {value: '1', viewValue: 'General'},
    {value: '2', viewValue: 'Semi Luxury'},
    {value: '3', viewValue: 'Luxury'}
    
  ];
  blocks:DropDownItem[] = [
    {value: '1', viewValue: 'A'},
    {value: '2', viewValue: 'B'},
    {value: '3', viewValue: 'C'},
    {value: '4', viewValue: 'D'},
    {value: '5', viewValue: 'E'},
  ];

  async ngOnInit() {
    await this.getAllOwners();
    this.getUnitDetails();
   
    
  }
  get f(){
    return this.form;
  }

  public getUnitDetails = () => {
    this.isLoading = true;
    
    this.unitService.getUnitById(this.unit_id).subscribe({
        next: (data) => {
          this.unitInfo=data; 
          this.form.get('title')?.setValue(data.title?.toString());
          this.form.get('unit_number')?.setValue(data.unit_number?.toString());
          this.form.get('floor_number')?.setValue(data.floor_number?.toString());
          this.form.get('bedroom')?.setValue(data.bedroom?.toString());
          this.form.get('bathroom')?.setValue(data.bathroom?.toString());
          this.form.get('balcony')?.setValue(data.balcony?.toString());
          this.form.get('carpet_area')?.setValue(data.carpet_area?.toString());
          this.form.get('parking_slot')?.setValue(data.parking_slot?.toString());
          this.form.get('description')?.setValue(data.description?.toString());
          this.form.get('unit_type_id')?.setValue(data.unit_type_id?.toString());
          this.form.get('block_id')?.setValue(data.block_id?.toString());
          this.form.get('owner_id')?.setValue(data.owner_id?.toString());
          console.log(data);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  public getAllOwners = async () => {
    this.isLoading = true;
    const data:UserDetail[]= await lastValueFrom( this.userDetailService.getAllUserDetails());
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
   
  }
  save() {
    if(this.form.valid){
      console.log(this.form.value);
      this.data = {...this.data,...this.form.value};
      this.unitService.update(this.unit_id,this.data).subscribe(
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
