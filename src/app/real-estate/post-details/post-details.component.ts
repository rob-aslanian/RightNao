import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RealEstateService } from '../add-estate/Service/real-estate.service';
import { ActivatedRoute } from '@angular/router';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { SliderBadBoyEditionComponent } from '../../_shared/shared/classified-ads/components/slider-bad-boy-edition/slider-bad-boy-edition.component';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  selectedHome: any = null;
  utilis = utilities;
  postedDate: string = '';
  profileLoading: boolean = true;
  profileData: any = null;
  price: number ;  
  slider: any[] = [];

  @ViewChild( SliderBadBoyEditionComponent, { static: false } ) _slider: SliderBadBoyEditionComponent;

  constructor(
    private realEstateService: RealEstateService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private globalUser: GlobalUserProService 
  ) { }

  ngOnInit() { 
       
      this.activatedRoute.params.subscribe(
        ({ id }) => {
          this.realEstateService
              .getRealEstateById( id )
              .subscribe( data => { this.selectedHome = data; 
                                    this.postedDate =  this.utilis.dateFromNow(data.rental_info.created_at); 
                                    this.getProfile( data.company_id, data.user_id ); console.log(this.selectedHome)} );
        }
      )
         
  };
  
  
 
 
  rotateLeft() { 
    this._slider.back();
   };

  rotateRight() { this._slider.next();
  };

  print() {
     window.print();
  };

  getProfile( companyId: string, userId: string ) {
        const mutation = companyId ? 
                         this.utilsService.getCompanyProfileById( companyId ) : 
                         this.utilsService.getUserProfileInfo( userId );

        mutation.subscribe( data => { this.profileData = {...data,  isCompany: !!companyId }; 
                                      this.profileLoading = false;   
                                      this.realEstateService
                                           .getMyRealEstatesSlides(this.profileData.id, 
                                                                   this.globalUser.isCompanyActive() 
                                                                  ).subscribe(
                                                                          ( data ) => {
                                                                              this.slider = data.filter( homies => homies.id !== this.selectedHome.id ) 
                                                                          }
                                                                      ) }  )
  }

  handleInput( e: any ) {
    let number = Number(e.target.value);
    if( +number ) {
        console.log(number);
        
    } else {
      e.preventDefault();
      return false
      // e.target.value =  e.target.value.slice( 0, e.target.value.length -1  );
    }
  };

  makeCounterOffer() {
     if( this.price <= 10 ) return;
    
      this.realEstateService
        .makeCounterOffer({
          owner_id: this.profileData.id,
          estate_id: this.selectedHome.id, 
          fix_price: this.price
        }).subscribe( _ => this.selectedHome.rental_info.has_offered = true );
  };

  toggleSubscription( hasSubscribed: boolean, isMe: boolean, evt: any ) {
      if( isMe ) {
          return evt.preventDefault();
      }
      const mutation = hasSubscribed ? 
                       this.realEstateService 
                           .UnSubscribeRealEstate( this.selectedHome.id  ) :
                       this.realEstateService
                           .SubscribeToRealEstate(this.selectedHome.id, this.profileData.id );
      mutation.subscribe( _ => this.selectedHome.rental_info.has_subscribed =  !this.selectedHome.rental_info.has_subscribed );

                      
  }

};
