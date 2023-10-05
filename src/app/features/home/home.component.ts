import { Component,AfterViewInit,AfterContentInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { JwtPayloadData } from 'src/app/core/models/jwt-payload-data';
import { JwtService } from 'src/app/core/services/jwt.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { UnitService } from 'src/app/core/services/unit.service';
import { UserDetailService } from 'src/app/core/services/user-detail.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public  colors=['red', 'pink','green','yellow','blue','gray','orange','maroon','teal','cyan'];
  public isLoading: boolean=false;
  public jwtPayloadData : JwtPayloadData;
  public unitPieChart: any;
  public rentalPieChart: any;
  public ownerBarChart:any;
  public tenantBarChart:any;
  constructor(private unitService:UnitService,
    private rentalService: RentalService,
    private userDetailService: UserDetailService,
    private jwtService:JwtService){
      this.jwtPayloadData = jwtService.getPayload();

    }
  ngOnInit() {
    
    this.drawUnitChart();
    this.drawRentalChart();
    this.drawUserDetailsChart();
  }
  drawUserDetailsChart(){
    this.isLoading = true;
    
    this.userDetailService.getAllUserDetails().subscribe({
        next: (data) => { 
          const userDetailsInfo: { [key: string]: number } = {};
          userDetailsInfo[`Owner`]= data.filter(x=>x.user_type_id == 2).length;
          userDetailsInfo[`Tenant`]= data.filter(x=>x.user_type_id == 3).length;
          this.createOwnerBarChart(userDetailsInfo);
          this.createTenantBarChart(userDetailsInfo);
        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });
  }
  drawRentalChart(){
    this.isLoading = true;
    
    this.rentalService.getRentals().subscribe({
        next: (data) =>  {
          const unitRenatlStatusInfo: { [key: string]: number } = {};
          const uniqueStatus = Array.from(new Set(data.map((item) => item.status?.status!))).sort((a, b) => (a > b) ? 1 : -1);
          uniqueStatus.forEach(element => {
            unitRenatlStatusInfo[`${element}`]=data.filter(x=>x.status?.status == element).length;
          });
          this.createRentalPieChart(unitRenatlStatusInfo);
        },
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });

  }

  drawUnitChart(){
    this.isLoading = true;
    
    this.unitService.getAllUnits().subscribe({
        next: (data) =>{ 
         
          const unitBhkInfo: { [key: string]: number } = {};
          const uniqueBhk = Array.from(new Set(data.map((item) => item.bedroom))).sort((a, b) => (a > b) ? 1 : -1);;
          uniqueBhk.forEach(element => {
            unitBhkInfo[`${element} BHK`]=data.filter(x=>x.bedroom == element).length;
          });
          this.createUnitPieChart(unitBhkInfo);

        } ,
        error: (e) => console.error(e),
        complete: () => this.isLoading = false 
    });

  }

  createUnitPieChart(unitBhkInfo:any){
   
    this.unitPieChart = new Chart("UnitPieChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Object.keys(unitBhkInfo),
	       datasets: [{
    label: '',
    
    data: Object.values(unitBhkInfo),
    backgroundColor: this.colors.slice(0,unitBhkInfo.length),
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio: 2,
        responsive:true,
        resizeDelay:0,
      }

    });
  }
  createRentalPieChart(unitRenatlStatusInfo:any){

    this.rentalPieChart = new Chart("rentalPieChart", {
      type: 'pie', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: Object.keys(unitRenatlStatusInfo),
	       datasets: [{
    label: '',
    data: Object.values(unitRenatlStatusInfo),
    backgroundColor: this.colors.reverse().slice(0,unitRenatlStatusInfo.length),
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio: 2,
        responsive:true,
        resizeDelay:0
      }

    });
  }

  createOwnerBarChart(userDetailsInfo:any){
  

    this.ownerBarChart = new Chart("ownerBarChart", {
      type: 'bar', 
      data: {
        labels: [""],
	       datasets: [{
          label: "Owner",
          data:[ userDetailsInfo['Owner']],
          borderColor:'orange',
          borderWidth: 1,
          backgroundColor:  'orange',
          barPercentage: 0.15, 
        }],
      },
      options: {
        aspectRatio: 2,
        responsive:true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }

    });


  }
  createTenantBarChart(userDetailsInfo:any){
  

    this.tenantBarChart = new Chart("tenantBarChart", {
      type: 'bar', 
      data: {
        labels: [""],
	       datasets: [{
          label: "Tenant",
          data:[ userDetailsInfo['Tenant']],
          borderColor:'DodgerBlue',
          borderWidth: 1,
          backgroundColor:  'DodgerBlue',
          barPercentage: 0.15, 
        }],
      },
      options: {
        aspectRatio: 2,
        responsive:true,
        scales: {
          
        }
      }

    });


  }


  ngOnDestroy(){
    console.log("destroying child...")
    if(this.unitPieChart){
      this.unitPieChart.destroy();
    }
    if(this.rentalPieChart){
      this.rentalPieChart.destroy();
    }
    if(this.ownerBarChart){
      this.ownerBarChart.destroy();
    }
    if(this.tenantBarChart){
      this.tenantBarChart.destroy();
    }
  }
}
