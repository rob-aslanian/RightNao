import { Component, OnInit } from '@angular/core';
import { MORE_CATEGORIES, FINDYOURSOMETHING } from 'src/app/for-sale/models/model';
import { Category } from '../models/models';
import { AdsServicesService } from '../ads-services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ads-service-landing-page',
  templateUrl: './ads-service-landing-page.component.html',
  styleUrls: ['./ads-service-landing-page.component.scss']
})
export class AdsServiceLandingPageComponent implements OnInit {


  Category = Category;
  MORE_CATEGORIES = MORE_CATEGORIES;
  products: any[] = [];
  FINDYOURSOMETHING = FINDYOURSOMETHING;
  listOfNewProducts: any[] = [];
  query = {
    price_type:'PriceType_Any',
    status: 'PostStatus_Any',
    service: 'ServiceCategory_Any',
    publication_date: 'Date_Any',
    by_agent: false,
    by_user: false
  }
  
  constructor(
    private adsSrvice: AdsServicesService
  ) { }

  ngOnInit() {

    this.getAdService()
        .subscribe(sales => {this.products = sales; console.log(sales)} );

    this.getAdService()
        .subscribe(sales => {
            this.listOfNewProducts = sales.map(sale => {
                  return {
                    id: sale.id,
                    src: (sale.files.length > 0 && `/file/${sale.files[0]['address']}` ) || null,
                    title: sale.detail.title,
                    created_at: sale.created_at,
                    price: sale.price, 
                    has_liked: sale.has_liked,
                    path: `/ads-services/details`
                  }
            })        
      } ); 
  }


  getAdService(publication_date = 'Date_Any'): Observable<any> {
      return   this.adsSrvice.searchServices({...this.query,publication_date})
  }
  
  getNotified(e: any) {
    const { has_liked, id } = e;
    const mutation = has_liked ? 
                     this.adsSrvice.UnLikeAdService(id) :
                     this.adsSrvice.LikeAdService(id);
    mutation.subscribe();
 }
}
