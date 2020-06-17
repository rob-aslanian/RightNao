import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { utc } from 'moment';
import { CarsService } from '../../cars.service';
import { CarsAddService } from '../../cars-add/cars-add.service';
import { Router } from '@angular/router';
import { EstateFormService } from 'src/app/real-estate/add-estate/Service/estate-form.service';

@Component({
  selector: 'app-cars-box',
  templateUrl: './cars-box.component.html',
  styleUrls: ['./cars-box.component.scss']
})
export class CarsBoxComponent implements OnInit {
  @Input() isCardView: boolean = false;

  @Input() boxType:string = 'landing';

  @Input() status:string = 'active';

  @Input() car: any;
  @Output() manageEmitter:EventEmitter<string> = new EventEmitter<string>();

  isMe:boolean = false;

  files: string[] = [ ];

  counter: number = 0;

  utc: Function = utc;

  postedDate:string = '';

  user_id;

  constructor(
    private carsService:CarsService,
    private carsAddService:CarsAddService,
    private route:Router,
    private formService:EstateFormService
  ) {
    this.user_id = this.carsService.user_id;
   }

  ngOnInit() {
    
    this.isMe = this.user_id == this.car['owner']['id'] ? true : false;

    this.files = this.car.files.map( file => `/file/${file.address}` );
    
    if( this.car.created_at ) {
            this.postedDate = this.utc(this.car.created_at).fromNow();
            
     }        
     
}

//Vehicle manage

removeVehicle(id) {
  this.carsService.removeVehicle(id).subscribe( data => console.log(data) )
}

edit(id) {
  this.carsService.getVehicleForEdit(id).subscribe( data => {
    this.carsAddService.carsEditObj = data;
    this.carsAddService.numbers = data['phoneNumber'];
    this.carsAddService.type.next(data['vehicleType']);
    if( this.car.vehicleType == 'TRUCK' ) {
      this.carsAddService.truckType.next(data['truckType'])
    }
    this.route.navigate(['cars/edit']);
  } )
}

addToHidden(id) {
  let flag = this.status == 'active' ? true : false;
  this.carsService
      .changeVehicleVisibility(id, flag)
      .subscribe( data => console.log(data) )
  this.manageEmitter.emit('hidden');
}

//Vehicle manage

//save vehicle
addToSave(){

  let id = this.car.id;

  let mutate = this.car.is_favourite ? this.carsService.removeSavedVehicle(id) : 
                                      this.carsService.saveVehicle(id);

  mutate.subscribe( data => this.car.is_favourite = !this.car.is_favourite )
}
//save vehicle

nextImage(e) {
  
const target = e.target;

if( this.files.length > 1 && !target.firstChild.classList.contains('slider-file') ) {
  target.firstChild.classList.add('slider-file');    

    setTimeout( () => {
        target.firstChild.classList.remove('slider-file');
        this.files[this.counter + 1] ? ++this.counter : this.counter = 0;
      }, 1000 );
    }
}

}
