import { Component, OnInit, Input } from '@angular/core';
import { deliveryTime } from 'src/app/v-office/_shared/services.utils';

@Component({
  selector: 'app-office-proposall-box',
  templateUrl: './office-proposall-box.component.html',
  styleUrls: ['./office-proposall-box.component.scss']
})
export class OfficeProposallBoxComponent implements OnInit {

  @Input() proposal: any ;
  
  deliveryTime = deliveryTime;

  constructor() { }

  ngOnInit() {
    console.log(this.proposal);
    
  }

}
