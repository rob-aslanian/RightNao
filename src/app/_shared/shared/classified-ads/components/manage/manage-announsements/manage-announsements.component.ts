import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdsServicesService } from 'src/app/ads-services/ads-services.service';
import { ForSaleService } from 'src/app/for-sale/for-sale.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-manage-announsements',
  templateUrl: './manage-announsements.component.html',
  styleUrls: ['./manage-announsements.component.scss']
})
export class ManageAnnounsementsComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: false }) _modal:AppModalComponent;
  modalType;
  itemForModal;

  list = [];
  isLoading:boolean = true;

  place = this.activeRoute.snapshot.data['place'];

  filter:BehaviorSubject<any> = new BehaviorSubject<any>({});

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;

  constructor(
    private adsService:AdsServicesService,
    private saleService:ForSaleService,
    private activeRoute:ActivatedRoute,
    private route:Router
  ) { }

  ngOnInit() {
    this.filter.next(this.createFilter(this.place));
    this.filter
        .pipe( 
          switchMap( (filter) => this.after ),
          switchMap( (after) => this.getAnnounsements(this.place, this.filter.value, after) )
          )
        .subscribe( data => { this.isLoading = false;
                              this.amount = data['amount_of_results'];
                              this.list = data[this.place == 'for-sale' ? 'sales' : 'services']
                                          .map(el => {
                                            return {
                                              id: el.id,
                                              src: (el.files.length > 0 && `/file/${el.files[0]['address']}` ) || null,
                                              title: el.detail.title,
                                              description:el.detail.description,
                                              created_at: el.created_at,
                                              price: el.price, 
                                              path: this.place  === 'for-sale' ?  `/for-sale/details` : `/ads-services/details` ,
                                              has_liked: el.has_liked,
                                              post_status: el.post_status,
                                              is_urgent:el.is_urgent,
                                              editUrl: this.place  === 'for-sale' ? `/for-sale/edit-for-sale/${el.id}` :
                                                                                    `/ads-services/edit/${el.id}` 
                                            }
                                          })
                            } )
  }

  createFilter(place){
    let params = place == 'for-sale' ? {condition:'Condition_Any'} : { service:'ServiceCategory_Any'};
      return {
        status:'PostStatus_Active',
        price_type:'PriceType_Any',
        publication_date:'Date_Any',
        by_agent:false,
        by_user:false,
        ...params
      }
  }

  updateSearch(filter) {
    this.isLoading = true;
    this.filter.next(filter);
  }

  getAnnounsements(place, filter, after){
    let query = place == "for-sale" ? 
                this.saleService.searchForSale(filter, after) :
                this.adsService.SearchAdsService(filter, after);
    return query
  }

  manage(manageConfig){
    switch (manageConfig.action) {
      case 'delete': this.delete(manageConfig.id)
      break;
      case 'status': this.changeStatus(manageConfig.id, manageConfig.status);
      break;
      case 'edit': this.edit(manageConfig.id);
      break;
      case 'urgent':this.openModal(manageConfig.id, 'Urgent')
      break;
      case 'discounted':this.openModal(manageConfig.id, 'Discounted')
      break;
      
      // case 'urgent': this.openModal(manageCongig.id, 'Urgent')
      // break;
      // case 'discounted': this.openModal(manageCongig.id, 'Discounted')
      // break;
       default:
         break;
     }
  }

  delete(id){
    let mutate = this.place == 'for-sale' ?
                  this.saleService.removeForSale(id) :
                  this.adsService.RemoveAdService(id)
    
    mutate.subscribe( data => {this.list = this.list.filter( el => el.id != id ); console.log(data);
    } );
  }

  changeStatus(id, status) {
    let mutate = this.place == 'for-sale' ?
                  this.saleService.changeForSaleStatus(id, status) :
                  this.adsService.ChangeAdServiceStatus(id, status);
    mutate.subscribe( data => console.log(data) );
  }

  edit(id){
    let url = this.place == 'for-sale' ? `for-sale/edit-for-sale/${id}` :
                                          `ads-services/edit/${id}`;
    this.route.navigate([url]);
  }

  openModal(id, title){
    console.log('Open');
    this.itemForModal = this.list.find( el => el.id == id );
    console.log('itemForModal',this.itemForModal);
    
    this._modal.open();
    this.modalType = title;
    this._modal.title = title; 

   }
   closeModal(e) {
     console.log(e);
     this.itemForModal = undefined;
     this.modalType = '';
    this._modal.close(); 
  }

}
