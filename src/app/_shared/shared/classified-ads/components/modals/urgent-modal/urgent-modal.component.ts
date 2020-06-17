import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AdsServicesService } from 'src/app/ads-services/ads-services.service';
import { ForSaleService } from 'src/app/for-sale/for-sale.service';

@Component({
  selector: 'app-urgent-modal',
  templateUrl: './urgent-modal.component.html',
  styleUrls: ['./urgent-modal.component.scss']
})
export class UrgentModalComponent implements OnInit {
  @Input() place;
  @Input()annousement;
  onClose:EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private AdsService:AdsServicesService,
    private saleService:ForSaleService
  ) { }

  ngOnInit() {
    
  }


  makeUrgent(id) {
    let mutate = this.place = 'for-sale' ? 
                                this.saleService.makeForSaleUrgent(id) :
                                this.AdsService.MakeAdServiceUrgent(id);
    mutate.subscribe( data => {this.onClose.emit(true); console.log('close')} )
  }

}
