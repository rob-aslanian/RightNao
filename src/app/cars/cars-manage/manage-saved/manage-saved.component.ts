import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../cars.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-manage-saved',
  templateUrl: './manage-saved.component.html',
  styleUrls: ['./manage-saved.component.scss']
})
export class ManageSavedComponent implements OnInit {
  isLoading:boolean = true;
  cars = [];

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;
  

  constructor(
    private carService:CarsService
  ) { }

  ngOnInit() {
    this.after
              .pipe (
                switchMap( after => this.carService
                                        .getSavedVehicle( {
                                            first: this.first,
                                            after
                                        }))
              )
              .subscribe( data => {
                                    this.cars = data['vehicle'];
                                    this.amount = data['amount'];
                                    this.isLoading = false;
              } )
  }

  changePage(e){
    let page = e ===  1 ? 0 : 
               this.first * --e;
 
    this.after.next(String(page));
     
   }

}
