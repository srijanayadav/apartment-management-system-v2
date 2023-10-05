import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertUserDetail } from 'src/app/core/models/upsert-user-detail';
import { UserDetailService } from 'src/app/core/services/user-detail.service';
import { DropDownItem } from 'src/app/core/models/drop-down-item';
import { UnitService } from 'src/app/core/services/unit.service';
import { Observable, map, startWith } from 'rxjs';
import { UpsertUnitOwner } from 'src/app/core/models/upsert-unit-owner';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { UpsertInvoice } from 'src/app/core/models/upsert-invoice';
import { JwtService } from 'src/app/core/services/jwt.service';
import { JwtPayloadData } from 'src/app/core/models/jwt-payload-data';

@Component({
  selector: 'app-save-invoice-dialog',
  templateUrl: './save-invoice-dialog.component.html',
  styleUrls: ['./save-invoice-dialog.component.css']
})
export class SaveInvoiceDialogComponent {
  public form: FormGroup =new FormGroup({});
  private userTypeId = 2; 
  public isLoading: boolean = false;

  public payeeDropDownitems: DropDownItem[] = <DropDownItem[]>{};
  public filteredPayee: Observable<any[]> | undefined;

  public jwtPayloadData : JwtPayloadData;

  purposeItems:DropDownItem[] = [
    {value: 'Monthly Rent', viewValue: 'Monthly Rent'},
    {value: 'Security Deposit', viewValue: 'Security Deposit'},
    {value: 'Maintenance Charge', viewValue: 'Maintenance Charge'},
    {value: 'Miscellaneous', viewValue: 'Miscellaneous'}
    
  ];

  constructor( private fb: FormBuilder,
    private userDetailService:UserDetailService,
    private unitService:UnitService,
    private invoiceService:InvoiceService,
    private jwtService:JwtService,
    public dialogRef: MatDialogRef<SaveInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.jwtPayloadData = this.jwtService.getPayload();

      this.form = this.fb.group({
        payee_id:['', [Validators.required]],
        purpose:['', [Validators.required]],
        total_amount:['', [Validators.required, Validators.pattern("^([0-9]+(\.?[0-9]?[0-9]?)?)")]],
       
    });
    
  
  }
  ngOnInit() {
    this.getAllPayee();
   
  }
  get f(){
    return this.form;
  }
  public getAllPayee = () => {
    this.isLoading = true;
    
    this.userDetailService.getAllUserDetails().subscribe({
        next: (data) => { 
          this.payeeDropDownitems= data.filter(x=>x.is_active != false) .map((x)=>{ 
            const item : DropDownItem = {value: x.id.toString(),viewValue:`${x.first_name} ${x.last_name}(${x.id})` }; 
            return item;}
            );
            this.filteredPayee = this.form.get('payee_id')!.valueChanges.pipe(
              startWith(''),
              map((owner) =>
                owner ? this.filterOwner(owner) : this.payeeDropDownitems?.slice()
              )
            );
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  save() {
    if(this.form.valid){
     
      const invoice = <UpsertInvoice>{...this.form.value};
      invoice.is_active=null;
      invoice.status= "UNPAID";
      invoice.created_by_id= this.jwtPayloadData.id;
      invoice.invoice_number="";
   
      this.invoiceService.createInvoice(invoice).subscribe(
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
    
    return Array.isArray(this.payeeDropDownitems)? this.payeeDropDownitems.find(x=>x.value == value)?.viewValue:'';

  }
  filterOwner(name: string) {
    console.log(name);
    let arr = this.payeeDropDownitems.filter(
      (payee) => payee.viewValue.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }


}
