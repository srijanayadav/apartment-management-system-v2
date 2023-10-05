import { Component ,Inject, QueryList, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UpsertRental } from 'src/app/core/models/upsert-rental';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { RentalService } from 'src/app/core/services/rental.service';
import { Rental } from 'src/app/core/models/rental';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-rental-request-dialog',
  templateUrl: './update-rental-request-dialog.component.html',
  styleUrls: ['./update-rental-request-dialog.component.css']
})
export class UpdateRentalRequestDialogComponent {
  public form: FormGroup =new FormGroup({});
  public isLoading: boolean = false;
  public rental_id:number;
  public rentalDetails?: Rental;
  private readonly agreementStatusId:number = 4;

  public rentalStatusDDItems:DropDownItem[] = [
    {value: '1', viewValue: 'Submitted'},
    {value: '2', viewValue: 'In Progress'},
    //{value: '3', viewValue: 'Booked'},
    {value: '4', viewValue: 'Agreement'},
    {value: '5', viewValue: 'Occupied'},
    {value: '6', viewValue: 'Cancel'},
  ];

  constructor( private fb: FormBuilder,
    private router: Router,
    private rentalService:RentalService,
    private unitService:UnitService,
    public dialogRef: MatDialogRef<UpdateRentalRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this.fb.group({
        rent_status_id:['', [Validators.required]],
        rent_amount:['', [Validators.required, Validators.pattern("^([0-9]+(\.?[0-9]?[0-9]?)?)")]],
        maintenance_amount:['', [Validators.required, Validators.pattern("^([0-9]+(\.?[0-9]?[0-9]?)?)")]],
        deposit_amount:['', [Validators.required, Validators.pattern("^([0-9]+(\.?[0-9]?[0-9]?)?)")]],
        agreement_start_date:[new Date(),[Validators.required]],
        occupied_date:[new Date(),[Validators.required]]
       
    });
    this.rental_id = data.rental_id;
    
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

   

    this.getRentalDetails();
   
  }
  get f(){
    return this.form;
  }
  
  public getRentalDetails = () => {
    this.isLoading = true;
    
    this.rentalService.getRentalDetails(this.rental_id).subscribe({
        next: (data) => {this.rentalDetails=data; 
          this.form.get('rent_status_id')?.setValue(this.rentalDetails.rent_status_id?.toString());
          this.form.get('rent_amount')?.setValue(this.rentalDetails.rent_amount?.toString());
          this.form.get('deposit_amount')?.setValue(this.rentalDetails.deposit_amount?.toString());
          this.form.get('maintenance_amount')?.setValue(this.rentalDetails.maintenance_amount?.toString());
          console.log(this.rentalDetails);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  save() {
   
    if(this.form.valid){
     
      const rental = <UpsertRental>{...this.form.value};
      rental.tenant_id = this.rentalDetails?.tenant_id;
    
      rental.is_online_agreement = true
      console.log(rental)
   
      this.rentalService.update(this.rental_id,rental).subscribe(
        {
          next:(res)=>{
            console.log(rental.rent_status_id);
            if(rental.rent_status_id == this.agreementStatusId){
              console.log('beginAgreement');
              this.beginAgreement();

            }else{
              this.dialogRef.close(true);

            }
            
          },
          error:(err)=>console.log(err),
          complete:()=>{}
        });
      
    }
   
  }

  beginAgreement(){
    this.rentalService.beginAgreement(this.rental_id).subscribe(
      {
        next:(res)=>{this.dialogRef.close(true);},
        error:(err)=>console.log(err),
        complete:()=>{}
      });

  }

  close() {
      this.dialogRef.close(false);
  }

  preViewAgreementDoc() {
    const link = `/tenant-agremment-viewer?id=${this.rental_id}&isPreview=true`;
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });;
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors | undefined | null= this.form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }


}
