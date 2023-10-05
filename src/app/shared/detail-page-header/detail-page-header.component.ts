import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-page-header',
  templateUrl: './detail-page-header.component.html',
  styleUrls: ['./detail-page-header.component.css']
})
export class DetailPageHeaderComponent {
  @Input() 
  routerLink:string | undefined;
  @Input() 
  title:string | undefined;

}
