import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/search/search.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-pets-landing',
  templateUrl: './pets-landing.component.html',
  styleUrls: ['./pets-landing.component.scss']
})
export class PetsLandingComponent implements OnInit {

  isLoading:boolean = false;
  pets = [];

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 12;
  amount:number;
  page:number = 1;

  filter = {
    category: '',
    deal_type: 'DealType_Sell',
    status: 'PostStatus_Active',
    is_organic: false,
    publication_date: 'Date_Any',
    by_user: false,
    by_agent: false
  };



  constructor(
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe( 
                                map( ({ id }) =>  id ),
                                switchMap(  id =>  this.fetchData(  id )) )
                                .subscribe( data => { this.isLoading = false; 
                                                      this.pets = data['pet_plants'];
                                                      this.amount = data['amount_of_results'];
                                                      console.log('pets', data)
                                                     });
  }

  fetchData( id ) {
    this.filter.category = id;

    this.isLoading  = true;
    return this.after
              .pipe (
                switchMap( after => this.searchService
                                        .searchPetPlant( {
                                            first: this.first,
                                            after
                                        }, this.filter ))
              )  
  }

  changePage(e){
    let page = e ===  1 ? 0 : 
               this.first * --e;
 
    this.after.next(String(page));
     
   }

}
