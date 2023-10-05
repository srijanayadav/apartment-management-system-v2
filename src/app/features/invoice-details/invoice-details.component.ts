
import { Component ,Inject, QueryList, ViewChildren} from '@angular/core';
import { DetailPageHeaderComponent } from '../../shared/detail-page-header/detail-page-header.component';

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
import { ActivatedRoute, Router } from '@angular/router';
import { RentalAgreement } from 'src/app/core/models/rental-agreement';
import { Invoice } from 'src/app/core/models/invoice';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { WindowRefService } from 'src/app/core/services/window-ref.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  public isLoading: boolean = false;
  public invoice_id:number = 0;
  public invoiceDetails?: Invoice;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private winRef: WindowRefService,
    private invoiceService:InvoiceService) {

    
  }
  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      const viewerParams = {...params};
      const invoice_id:any = params['invoice_id']
     
        console.log(invoice_id);
        if(invoice_id){
          this.invoice_id = Number(invoice_id)
        }
        console.log(this.invoice_id);

        this.getInvoiceDetails(this.invoice_id);
    });
  }

  public getInvoiceDetails = (id:number) => {
    this.isLoading = true;
    
    this.invoiceService.getInvoice(id).subscribe({
        next: (data) => {this.invoiceDetails=data; 
          console.log(this.invoiceDetails);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  public redirectToPay = (id: number) => {
    
    
    this.invoiceService.beginInvoicePayment(Number(id)).subscribe({
      next: (data) =>  {
        console.log(data);
        const cashfree = new this.winRef.nativeWindow.Cashfree({
          mode:data.mode //or production
        });
        let version = cashfree.version();
        console.log(version);
        let checkoutOptions = {
          paymentSessionId: data.payment_session_id,
          returnUrl: data.order_meta.return_url,
          
        };
        cashfree.checkout(checkoutOptions).then((result:any)=>{
          if(result.error){
              alert(result.error.message)
          }
          if(result.redirect){
              console.log("Redirection")
          }
      });
      
      },
      error: (e) => console.error(e),
      complete: () => this.isLoading = false 
    });
  
  }

}
