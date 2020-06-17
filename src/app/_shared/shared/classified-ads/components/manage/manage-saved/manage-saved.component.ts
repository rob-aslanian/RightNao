import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsServicesService } from 'src/app/ads-services/ads-services.service';
import { ForSaleService } from 'src/app/for-sale/for-sale.service';
import { BehaviorSubject, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-saved',
  templateUrl: './manage-saved.component.html',
  styleUrls: ['./manage-saved.component.scss']
})
export class ManageSavedComponent implements OnInit {

  list = [];
  isLoading:boolean = true;

  place = this.activeRoute.snapshot.data['place'];

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;

  constructor(
    private activeRoute:ActivatedRoute,
    private adsService:AdsServicesService,
    private saleService:ForSaleService
  ) { }

  ngOnInit() {
    this.after
        .pipe( switchMap( after => this.getSavedItems(after) ) )
        .subscribe( data => {
                              this.isLoading = false;
                              console.log('data',data);
                              this.amount = data['amount_of_results'];
                              console.log('place', this.place);
                              this.list = data[this.place == 'for-sale' ? 'sales' : 'services']
                                          .map(el => {
                                            return {
                                              id: el.id,
                                              src: (el.files.length > 0 && `/file/${el.files[0]['address']}` ) || null,
                                              title: el.detail.title,
                                              created_at: el.created_at,
                                              price: el.price,
                                              has_liked: el.has_liked,
                                              post_status: el.post_status,
                                              is_urgent:el.is_urgent
                                            }
                                          })
                              console.log('list',this.list)
        } );

  }

  getSavedItems(after){
    let query = this.place=='ads-service' ?
                this.adsService.GetSavedAdService(after) :
                this.saleService.getSavedForSale(after);
    return query;
  }

}
