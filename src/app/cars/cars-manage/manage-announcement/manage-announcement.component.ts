import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarsService } from '../../cars.service';
import { switchMap } from 'rxjs/operators';
import { CarsModels } from '../../models/cars.model';

@Component({
  selector: 'app-manage-announcement',
  templateUrl: './manage-announcement.component.html',
  styleUrls: ['./manage-announcement.component.scss']
})
export class ManageAnnouncementComponent implements OnInit {
  isLoading:boolean = true;

  cars = [];
  carsType = CarsModels;

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;

  filter:BehaviorSubject<{}> = new BehaviorSubject<{}>({
    vehicle_type: 'CAR',
    mileage_unit: 'KM',
    is_only_me: true
  }); 

  constructor(
    private carsService:CarsService
  ) { }

  ngOnInit() {
    this.filter
        .pipe(
          switchMap( (filter) => this.getAnnouncement(filter) )
        )
        .subscribe( data => { 
          console.log('this is data', data);
          
                              this.cars = data['vehicle'];
                              this.amount = data['amount'];
                              this.isLoading = false;
                            } )

  }

  getAnnouncement(filter){
    return this.after
              .pipe (
                switchMap( after => this.carsService
                                        .getLandingAnnouncement( {
                                            first: this.first,
                                            after
                                        }, filter ))
              )
  }

  changePage(e){
    let page = e ===  1 ? 0 : 
               this.first * --e;
 
    this.after.next(String(page));
     
   }

   updateSearch(filter) {
     this.isLoading = true;
     this.filter.next(filter);
   }

}
