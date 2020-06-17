import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SliderBadBoyEditionComponent } from '../slider-bad-boy-edition/slider-bad-boy-edition.component';
import { ForSaleService } from 'src/app/for-sale/for-sale.service';

@Component({
  selector: 'app-clasified-ads-new-products',
  templateUrl: './clasified-ads-new-products.component.html',
  styleUrls: ['./clasified-ads-new-products.component.scss']
})
export class ClasifiedAdsNewProductsComponent implements OnInit {

  @Input() products: any;
  @Input() type: string = 'for-sale';
  @ViewChild(SliderBadBoyEditionComponent, {static:false}) _slider: SliderBadBoyEditionComponent

  boxes: any[] = [];

  constructor(
    private forSalesService: ForSaleService
  ) { }

  ngOnInit() {
    this.boxes = this.products.map(sale => {
          return {
            id: sale.id,
            src: (sale.files.length > 0 && `/file/${sale.files[0]['address']}` ) || null,
            title: sale.detail.title,
            created_at: sale.created_at,
            price: sale.price,
            path: `/${this.type}/details`  
          }
    })
    
  }
 
 
}
 