import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { RealEstateService } from '../../add-estate/Service/real-estate.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  modalType: string; 
  isLoading: boolean = true;
  homies = [];
  page = 0;
  profileId: string ;
  isCompany: boolean = false;
  amount: number = 0;
  template: any = {
        query: '',
        propertyType: '',
        status: '' 
  };

  notifications: any = null;

  @ViewChild(AppModalComponent, { static: false }) _modal:AppModalComponent;

  estateId: string ;

  constructor(
    private modal: NgbModal,
    private estateService: RealEstateService,
    private globalUserProService: GlobalUserProService,
    private router: Router
  ) { 
        this.profileId = globalUserProService.getProfileId();
        this.isCompany = globalUserProService.isCompanyActive();
  }

  ngOnInit() {

    this.getRealEstate()
    .subscribe( data => { this.homies = data['estates'] ; this.isLoading = false; this.amount = data['amount'] } );
    
      this.estateService
          .search.subscribe( templ => {
              this.template = templ;
               this.isLoading = true;
               this.getRealEstate(
                     templ.status || 'PostStatus_Active',
                     templ.propertyType || 'PropertyType_Any'
               ).subscribe( data => { this.homies =  this.findByConditions( data['estates'] , templ.query ); this.amount = data['amount'] ;  this.isLoading = false } ) } );
  }


  openModal(modalType: string) {
    
    this._modal.open();  

    switch (modalType) {

      case 'urgent' :
        this.modalType = modalType;
        this._modal.title = 'Urgent'; 
        break;
      
      case 'discounted' : 
        this.modalType = modalType; 
        this._modal.title = 'Discounted';
        break; 

      case 'notifications' : 
        this.modalType = modalType; 
        this._modal.title = 'Notifications'; 
    };
  };

  closeModal() {
    this.modal.dismissAll(); 
  }

  result( type: any ) {
    const { _case, id } = type; 
       console.log(_case , id);
       
       switch ( _case  ) {
         case 'delete':
             return this.estateService
                        .removeEstate(id)
                        .subscribe( data => this.homies =  this.homies.filter( home => home.id !== id ) );
          case 'edit': 
             return this.router.navigate(['/real-estate', 'edit-estate', id ]);
          case 'hidden':
             return this.estateService.changeEstateStatus(id, 'PostStatus_Hidden').subscribe();
          case 'make a solid' : 
          return this.estateService.changeEstateStatus(id, 'PostStatus_Sold').subscribe(); 
          case 'urgent' : 
          return this.estateService.MakeRealEstateUrgent(id).subscribe(
             () => this.homies.map(home => {
                 if(home.id === id) {
                      home.is_urgent = true;
                 }
             } )
          );   
          case 'notifications':       
            this.notifications = type;
            this.modalType = 'notifications';
            this._modal.title = 'Notifications';
            return  this._modal.open();
       }
   };



   findByConditions(data: any[], query: string ): any[] {
     if( query.length < 2 ) return data ;
        return data.filter( house => {
              return house.rental_info.post_currency.toLowerCase().startsWith(query.toLowerCase()) || 
                     house.rental_details[0]['title'].toLowerCase().startsWith(query.toLowerCase()) ||
                     house.rental_details[0]['description'].toLowerCase().startsWith(query.toLowerCase()) ||
                     house.rental_details[0]['house_rules'].toLowerCase().startsWith(query.toLowerCase())           
        } )
   };

   
   /**
    * 
    * @param status 
    * @param DealType_Any 
    * @param property_type 
    * @param after 
    */
   getRealEstate( status: string = 'PostStatus_Active', 
                  property_type =  'PropertyType_Any',
                  after: number = 0,
                  DealType_Any = 'DealType_Any' ): Observable<any>{
      return this.estateService
              .getMyRealEstates( this.profileId, this.isCompany, status, DealType_Any, property_type, after )
   } 

   changePage( selectedPage: number ) {
     const after = --selectedPage * 6;

     this.isLoading = true;
     this.getRealEstate(
        this.template.status || 'PostStatus_Active',
        this.template.propertyType || 'PropertyType_Any',
        after
     ).subscribe( (data) => { this.homies =  this.findByConditions( data['estates'] , this.template.query ); 
                              this.amount = data['amount'] ;  
                              this.isLoading = false 
        } );

  }
}
