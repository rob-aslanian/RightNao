import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarsService } from '../cars.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CarsAddService } from '../cars-add/cars-add.service';

@Component({
  selector: 'app-cars-landing',
  templateUrl: './cars-landing.component.html',
  styleUrls: ['./cars-landing.component.scss']
})
export class CarsLandingComponent implements OnInit {
  isLoading:boolean = false;
  cars = [];

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 10;

  filter = {
    vehicle_type: '',
    mileage_unit: ''
  };

  constructor(
    private activatedRoute:ActivatedRoute,
    private carsService:CarsService,
    private addService:CarsAddService,
    private route:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe( 
                                map( ({ id }) =>  id ),
                                switchMap(  id =>  this.fetchData(  id )) )
                                .subscribe( data => { this.isLoading = false; 
                                                      this.cars = data['vehicle'];
                                                      this.amount = data['amount'];
                                                     });
  }

  fetchData( id ) {
    this.filter.vehicle_type = id;
    this.filter.mileage_unit = 'KM';

    this.isLoading  = true;
    return this.after
              .pipe (
                switchMap( after => this.carsService
                                        .getLandingAnnouncement( {
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
