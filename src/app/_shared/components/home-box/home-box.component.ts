import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  utc  } from 'moment';
import { RealEstateService } from 'src/app/real-estate/add-estate/Service/real-estate.service';


@Component({
  selector: 'app-home-box',
  templateUrl: './home-box.component.html',
  styleUrls: ['./home-box.component.scss']
})


export class HomeBoxComponent implements OnInit {

  @Input() isCardView: boolean = true;

  @Input() home: any;

  @Input() isMy: boolean = false;


  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  
  counter: number = 0;

  files: string[] = [ ];
  
  utc: Function = utc;

  postedDate: string = '';
  
  constructor(
    private estateService: RealEstateService
  ) { }

  ngOnInit() {
       this.files = this.home.files.map( file => `/file/${file.address}` );
       if( this.home.rental_info.created_at ) {
               this.postedDate = this.utc(this.home.rental_info.created_at).fromNow();
        }        
        
  };

  // nextImage(e) {
    
  // const target = e.target;

  // if( this.files.length > 1 && !target.firstChild.classList.contains('slider-file') ) {
  //   target.firstChild.classList.add('slider-file');    

  //     setTimeout( () => {
  //         target.firstChild.classList.remove('slider-file');
  //         this.files[this.counter + 1] ? ++this.counter : this.counter = 0;
  //       }, 1000 );
  //     }
  // }


  emit( type: string ) {    
       this.result
           .emit({ _case: type,  id: this.home.id  });
  };

  emitNotifications(isDisabledAlert: boolean , isDisabledOffers: boolean) {
      this.result
      .emit({ _case: 'notifications',  id: this.home.id, isDisabledAlert , isDisabledOffers });
  }


  addToSavedItems( hasLiked: boolean ) {
           const mutation = hasLiked ? 
                            this.estateService.UnLikeRealEstate( this.home.id ) :
                            this.estateService.addLikeToRealEstate( this.home.id ) 
                            
            mutation.subscribe( () => this.home.rental_info.has_liked = !this.home.rental_info.has_liked );
  };

};
