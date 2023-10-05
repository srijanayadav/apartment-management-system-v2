

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

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent {
  public isLoading: boolean = false;
  public rental_id:number = 0;
  public rentalDetails?: Rental;
  public rentalAgreementInfo?:RentalAgreement;
  public activeStatus=[4,5]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rentalService:RentalService,
    private unitService:UnitService) {

    
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      const viewerParams = {...params};
      const rental_id:any = params['rental_id']
     
        console.log(rental_id);
        if(rental_id){
          this.rental_id = Number(rental_id)
        }
        console.log(this.rental_id);

        this.getRentalDetails(this.rental_id);
        this.getRentalAgreementInfo(this.rental_id);

    });
  }
  public viewAgreementFileLink(status_id:number){
    return this.activeStatus.includes(status_id);


  }

  public getRentalDetails = (id:number) => {
    this.isLoading = true;
    
    this.rentalService.getRentalDetails(id).subscribe({
        next: (data) => {this.rentalDetails=data; 
          console.log(this.rentalDetails);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }
  public getRentalAgreementInfo = (id:number) => {
    this.isLoading = true;
    
    this.rentalService.getRentalAgreement(id).subscribe({
        next: (data) => {
          this.rentalAgreementInfo = data; 
          console.log(this.rentalAgreementInfo);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
    
  }

  public viewAgreementFile(rental_id:number){
    const link = `/tenant-agremment-viewer?id=${this.rental_id}&isPreview=false`;
    this.router.navigate([], { queryParamsHandling: "preserve" }).then(result => {  window.open(link, '_blank'); });;

  }
  public downloadAgreementFile(rental_id:number){
    this.rentalService.getRentalAgreementData(rental_id).subscribe({
      next: (data) =>  {
        const bytes_data = Uint8Array.from(atob(data.data_base64), c => c.charCodeAt(0)) ;
        const blob= new Blob([bytes_data], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Renatl_Agreement.pdf";
        link.click();
      },
      error: (e) => console.error(e),
      complete: () => {} 
  })

  }
  

}
