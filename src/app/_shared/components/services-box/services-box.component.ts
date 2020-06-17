import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../services/shared/utils.service';
import { Observable } from 'rxjs';
import { OfficeService } from '../../services/v-office/office.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AdsService } from '../../services/ads/ads.service';
 

@Component({
  selector: 'app-services-box',
  templateUrl: './services-box.component.html',
  styleUrls: ['./services-box.component.scss']
})
export class ServicesBoxComponent implements OnInit {

  @Input() service: any = {};

  isCardView: boolean = true;

  @Input() set view( value: string ) {
        if( value === 'card' ) this.isCardView = true;
        else this.isCardView = false;
  } 

  profileInfo: any = {};
  loading: boolean = true;
  profileId: string = '';
 
  constructor( 
     private utilsService: UtilsService,
     private officeService: OfficeService,
     private globalUserProService: GlobalUserProService,
     private adService:AdsService,
  ) { 
      this.profileId = globalUserProService.getProfileId();
  }

  ngOnInit() { 
      const query: Observable<any> = this.service.companyID ?
                                     this.utilsService.getCompanyProfileById( this.service.companyID ) :
                                     this.utilsService.getUserProfileInfo( this.service.userID );
      
      query.subscribe( data => {
             this.profileInfo = { isCompanyActive: !!this.service.companyID,  ...data} ;
             this.loading = false;
      })
  };
  
  saveOrUnsaveService( hasLiked: boolean ) {
       const mutation = !hasLiked ? 
                        this.officeService.likeService( this.service.id ) : 
                        this.officeService.unlikeService( this.service.id );
       mutation.subscribe( () => this.service.has_liked =  !this.service.has_liked );
  }

  adClick(e:Event , service){
     e.preventDefault();
     e.stopPropagation();

     if (service.isAd && service.clicks > 0){
       this.adService
           .ClickOnAdvert(service.ad_id)
           .subscribe()
     }
    
     return;
  }
 }

 

