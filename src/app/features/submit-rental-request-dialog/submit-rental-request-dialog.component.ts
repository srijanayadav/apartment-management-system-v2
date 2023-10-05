import { Component ,Inject, QueryList, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UpsertRental } from 'src/app/core/models/upsert-rental';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { RentalService } from 'src/app/core/services/rental.service';

@Component({
  selector: 'app-submit-rental-request-dialog',
  templateUrl: './submit-rental-request-dialog.component.html',
  styleUrls: ['./submit-rental-request-dialog.component.css']
})
export class SubmitRentalRequestDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2; 
  public isLoading: boolean = false;
  public tenant_id:number;
  public tenant_name:string;
  public unitDropDownitems: DropDownItem[] = <DropDownItem[]>{};
  public filteredUnits: Observable<any[]> | undefined;

  constructor( private fb: FormBuilder,
    private rentalService:RentalService,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<SubmitRentalRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        unit_id:['', [Validators.required]],
       
    });
    this.tenant_id = data.tenant_id;
    this.tenant_name = data.tenant_name;
  
  }
  @ViewChildren(MatAutocompleteTrigger)
  autoCompleteTriggers!: QueryList<MatAutocompleteTrigger>;

  closePanels() {
    this.autoCompleteTriggers.forEach(trigger => {
      if (trigger.panelOpen) {
        trigger.closePanel();
      }
    });
  }

  ngOnInit() {
    this.getAllOwners();
   
  }
  get f(){
    return this.form;
  }
  public getAllOwners = () => {
    this.isLoading = true;
    
    this.unitService.getAllUnits().subscribe({
        next: (data) => { 
          this.unitDropDownitems= data.map((x)=>{ 
            const item : DropDownItem = {value: x.id.toString(),viewValue:`${x.unit_number}-${x.floor_number}-${x.bedroom} BHK(${x.id})` }; 
            return item;}
            );
            this.filteredUnits = this.form.get('unit_id')!.valueChanges.pipe(
              startWith(''),
              map((value) =>{
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this.filterUnit(name) : this.unitDropDownitems?.slice()
              }
             
              )
            );
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  save() {
    if(this.form.valid){
     
      const rental = <UpsertRental>{...this.form.value};
      rental.tenant_id = this.tenant_id;
      rental.rent_status_id = 1;
      rental.is_online_agreement = true
      console.log(rental)
   
      this.rentalService.create(rental).subscribe(
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

  displayFn=(value:string):any=>{
    
    return Array.isArray(this.unitDropDownitems)? this.unitDropDownitems.find(x=>x.value == value)?.viewValue:'';

  }
  filterUnit(name: string) {
    console.log(name);
    let arr = this.unitDropDownitems.filter(
      (unit) => unit.viewValue.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }


}
