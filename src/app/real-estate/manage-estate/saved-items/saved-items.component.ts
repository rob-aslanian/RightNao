import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { SliderBadBoyEditionComponent } from '../../../_shared/shared/classified-ads/components/slider-bad-boy-edition/slider-bad-boy-edition.component';
import { RealEstateService } from '../../add-estate/Service/real-estate.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit {

  modalType: string; 
  isLoading: boolean = true;
  homies: any[] = [];
  amount: number ;
  allHomies: any[] = [];

  @ViewChild(AppModalComponent, { static: false }) _modal:AppModalComponent;

  @ViewChild( SliderBadBoyEditionComponent, { static: false } ) _slider: SliderBadBoyEditionComponent;

       

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit() {
        
        this.getRealEstate(0)
            .subscribe( (data) => {this.homies = data['estates']; this.amount = data['amount']; this.isLoading = false; this.allHomies = data['estates'] } );

        this.realEstateService
            .search.subscribe( (_) => this.homies = this.findByConditions( _['query'] || '' ) )
   }
 
  openModal(modalType: string) {
    
    this._modal.open(); 

    switch (modalType) {

      case 'offers' :
        this.modalType = modalType;
        this._modal.title = 'Counter offers'
        this._modal.width = 597; 
        
        break;
      
      case 'alerts' : 
        this.modalType = modalType;  
        this._modal.title = 'Alerts'
        this._modal.width = 376; 

        break; 
  
    }; 
    
  };

  rotateLeft() { 
    this._slider.back();
   };

  rotateRight() {
    this._slider.next();
  };

  changePage( selectedPage: number ) {
    const after = --selectedPage * 6;
    this.isLoading = true;
    this.getRealEstate(after)
        .subscribe( (data) => {this.homies = data['estates'];  this.isLoading = false;} );

  }
    
  getRealEstate( after: number): Observable<any> {
       return this.realEstateService
                  .GetSavedRealEstates( after )
  };

  findByConditions( query: string ): any[] {
    console.log(query);
    
    if( query.length < 2 ) return [...this.allHomies] ;
       return this.allHomies.filter( house => {
             return house.rental_info.post_currency.toLowerCase().startsWith(query.toLowerCase()) || 
                    house.rental_details[0]['title'].toLowerCase().startsWith(query.toLowerCase()) ||
                    house.rental_details[0]['description'].toLowerCase().startsWith(query.toLowerCase()) ||
                    house.rental_details[0]['house_rules'].toLowerCase().startsWith(query.toLowerCase())           
       } )
  };

}
