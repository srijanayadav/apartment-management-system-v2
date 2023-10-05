import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/core/services/rental.service';

interface ViewerParams{
  id?:number,
  isPreview?:string
}
@Component({
  selector: 'app-tenant-agremment-viewer',
  templateUrl: './tenant-agremment-viewer.component.html',
  styleUrls: ['./tenant-agremment-viewer.component.css']
})
export class TenantAgremmentViewerComponent {
  public viewerParams?:ViewerParams|null|undefined
  public pdfSrc:Uint8Array | undefined;

  constructor(private route: ActivatedRoute,private rentalService: RentalService){}
  ngOnInit(){
    this.route.queryParams.subscribe(params=>{

      this.viewerParams = {"id":Number(params["id"]),"isPreview": JSON.parse(params["isPreview"])};
    
        if(this.viewerParams?.id){
       
          if(!this.viewerParams?.isPreview){
            this.viewRentalAgreementData(this.viewerParams?.id)
          }else{
            this.viewPreRentalAgreementData(this.viewerParams?.id)
          }
         
        }
        

    });
  }

  viewPreRentalAgreementData(rental_id:number){
    this.rentalService.getPreRentalAgreementData(rental_id).subscribe({
      next: (data) =>  {
        this.pdfSrc = Uint8Array.from(atob(data.data_base64), c => c.charCodeAt(0)) ;
      },
      error: (e) => console.error(e),
      complete: () => {} 
  })

  }
  viewRentalAgreementData(rental_id:number){
    this.rentalService.getRentalAgreementData(rental_id).subscribe({
      next: (data) =>  {
        this.pdfSrc = Uint8Array.from(atob(data.data_base64), c => c.charCodeAt(0)) ;
      },
      error: (e) => console.error(e),
      complete: () => {} 
  })

  }
}
