import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  post;
  isLoading:boolean = true;
  profile;
  utilis = utilities;
  postedDate: string = '';
  price;

  constructor(
    private petService:PetService,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
          .pipe( switchMap( ( { id } ) => this.petService.getPetByID(id) ) )
          .subscribe( data => { 
                                this.post = data;
                                console.log(data);
                                this.postedDate =  this.utilis.dateFromNow(data.common.created_at); 
                                this.isLoading = false;
                                this.getProfile(data);
           } )
  }

  getProfile(post) {
    this.profile = this.post.company_profile.id ? 
                    this.post.company_profile :
                    this.post.user_profile;
                    console.log(this.profile);
    this.profile.isCompany = this.post.company_profile.id ? true : false;
    this.profile.isMe = this.post.common.is_me;
    this.profile.phones = this.post.info.phones;
  }

  makeCounterOffer(){
    let input = {
      pet_id: this.post.id,
      max_price: this.post.common.price.fix_price,
      min_price:this.price,
      owner_id: this.profile.id
    }
    this.petService.MakeOfferToPetsPlants(input)
                    .subscribe( data => this.price = undefined );
  }
  subscribe(has_subscribed:boolean){
    let mutation = has_subscribed ? this.petService.UnSubscribePetsPlants(this.post.id) :
                                    this.petService.SubscribeToPetsPlants(this.post.id, this.profile.id );
    mutation.subscribe( data => this.post.common.has_subscribed = !this.post.common.has_subscribed );
  }

}
