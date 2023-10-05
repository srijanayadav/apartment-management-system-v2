import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUnit } from 'src/app/core/models/upsert-unit';
import { UnitService } from 'src/app/core/services/unit.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { DropDownItem } from 'src/app/core/models/drop-down-item';


@Component({
  selector: 'app-save-unit-dialog',
  templateUrl: './save-unit-dialog.component.html',
  styleUrls: ['./save-unit-dialog.component.css']
})

export class SaveUnitDialogComponent {
  public form: FormGroup =new FormGroup({});

  constructor( private fb: FormBuilder,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<SaveUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpsertUnit) {

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
        block_id: ['', [Validators.required]]
    })
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

  ngOnInit() {
   
  }
  get f(){
    return this.form;
  }
  save() {
    if(this.form.valid){
      console.log(this.form.value);
      this.data = {...this.data,...this.form.value};
      this.unitService.create(this.data).subscribe(
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
