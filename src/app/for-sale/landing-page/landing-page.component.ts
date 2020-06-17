import { Component, OnInit } from '@angular/core';
import { CATEGORIES, MORE_CATEGORIES, FINDYOURSOMETHING } from '../models/model';
import { ForSaleService } from '../for-sale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  CATEGORIES = CATEGORIES;
  MORE_CATEGORIES = MORE_CATEGORIES;
  products: any[] = [];
  FINDYOURSOMETHING = FINDYOURSOMETHING;
  listOfNewProducts: any[] = [];
  query = {
    by_agent: false,
    by_user: false,
    status: 'PostStatus_Any',
    condition: 'Condition_Any',
    price_type: 'PriceType_Any',
  }
  isCommunity: boolean = false;

  community: string[] = [
    'assets/img/44ab262b00f4497042128ee5d88ecbfc.png',
    'assets/img/44ab262b00f4497042128ee5d88ecbfc.png',
    'assets/img/44ab262b00f4497042128ee5d88ecbfc.png',
    'assets/img/44ab262b00f4497042128ee5d88ecbfc.png'
  ];

  constructor(
    private forSaleService: ForSaleService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.isCommunity = this.activatedRoute.snapshot.data['isCommunity'] || false;

    this.getSales()
        .subscribe(({sales}) => this.products = sales );

    this.getSales()
        .subscribe(({sales}) => {
            this.listOfNewProducts = sales.map(sale => {
                  return {
                    id: sale.id,
                    src: (sale.files.length > 0 && `/file/${sale.files[0]['address']}` ) || null,
                    title: sale.detail.title,
                    created_at: sale.created_at,
                    price: sale.price,
                    has_liked: sale.has_liked, 
                    path: `/for-sale/details`
                  }
            })        
      } );
  }


  getSales(publication_date = 'Date_Any') {
      return   this.forSaleService.searchForSale({...this.query,publication_date}, 0)
  }

  
  getNotified(e: any) {
    const { has_liked, id } = e;
    const mutation = has_liked ? 
                     this.forSaleService.UnLikeForSale(id) :
                     this.forSaleService.likeForSale(id);
    mutation.subscribe();
 
}
}
