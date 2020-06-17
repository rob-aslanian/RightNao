import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../cars-add.service';
import * as _compponents  from './index'
import { FormComponents, CarsForm } from '../../models/form,model';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../cars.service';

@Component({
  selector: 'app-cars-add-form',
  templateUrl: './cars-add-form.component.html',
  styleUrls: ['./cars-add-form.component.scss'],
})
export class CarsAddFormComponent implements OnInit {
  form:FormGroup;
  @ViewChild('container' , { static:true ,  read:ViewContainerRef }) container:ViewContainerRef;
  type;
  action:string = 'add';

  constructor(
    private addService:CarsAddService,
    private carService:CarsService,
    private resolver:ComponentFactoryResolver,
    private activeRoute:ActivatedRoute
  ) {
    this.type = this.addService.type.value == 'TRUCK' ? this.addService.truckType.value : this.addService.type.value;
    
    this.form = new CarsForm(this.type).generateForm();
    this.patchValue();
   }

  ngOnInit() {
    this.dynamicInjectComponents(this.type);
  }

  dynamicInjectComponents(type){
    this.container.clear();
    const columns = FormComponents[type];

    columns.map(column => {
      const comp = this.resolver.resolveComponentFactory(_compponents[column]);
      const el:any = this.container.createComponent(comp);
      
      if (el.instance.form) {
         el.instance.form = this.form;
      }

    })
  }

  next() {
    this.addService.isSubmitted.next(true);
    if(this.form.invalid) {
      window.scrollTo({behavior: 'smooth', top: 0});
    } else {
      let cityId = this.addService.carAddForm.value.get('cityID').value;
      
      this.addService.carAddForm.value.get('cityID').setValue(cityId['id']);
      let data = this.action == 'add' ? {
        ...this.addService.carAddForm.value.value,
        ...this.form.value,
        days: 15,
      } : {
        ...this.addService.carAddForm.value.value,
        ...this.form.value,
        id: this.addService.carsEditObj['id']
      };
      
      let mutation = this.action == 'add' ?       this.addService
                                                      .addVehicle(data)
                                                      .pipe(
                                                        map( ({data}) => data['addVehicle'] ),
                                                        switchMap( ({ id })  => this.addService.uploadFilesToDb(id) ) ) :
                                                    this.carService
                                                          .changeVehicle(data)
                                                          .pipe(
                                                            map( ({data}) => data['changeVehicle'] ),
                                                            // switchMap( () =>  this.carService.removeVehiclePhotos(data['id'])),
                                                            switchMap( () => this.addService.uploadFilesToDb(data['id']) )
                                                          )

      mutation.subscribe( data => console.log('finish') )
    }
    
    
  }

  patchValue(){
    this.activeRoute.parent.params.subscribe( data => {
      this.action = data['action'];
      
      if(data['action']=='edit') {
        let example = this.addService.carsEditObj;
        
        this.form.patchValue({
          condition: example['condition'],
          mileage: example['mileage'],
          mileageUnit: example['mileageUnit'],
          years: example['years'],
          transmission: example['transmission'],
          colour: example['colour'],
          title: example['title'] ,
          desciption: example['desciption'],
          price: example['price'],
          finance: example['finance'] ,
          bodyType: example['bodyType'] ,
          lifeStyle: example['lifeStyle'] ,
          airConditioning: example['airConditioning'] ,
          doorsAmount : example['doorsAmount'] ,
          seatsAmount: example['seatsAmount'] ,
          fuelType: example['fuelType'] ,
          engineSize: example['engineSize'] ,
          power: example['power'] ,
          powerUnit: example['powerUnit'] ,
          cylinders: example['cylinders'] ,
          fuelConsumtion: example['fuelConsumtion'] ,
          capacity: example['capacity'] ,
          vehicleCapacityUnit: example['vehicleCapacityUnit'] ,
          motorhomeType: example['motorhomeType'] ,
          vehicleLength: example['vehicleLength'] ,
          vehicleLengthUnit: example['vehicleLengthUnit'],        
          category: example['category'] ,
          vehicleWeight: example['vehicleWeight'],
          vehicleWeightUnit: example['vehicleWeightUnit'],
          vehicleHeight: example['vehicleHeight'],
          vehicleHeightUnit: example['vehicleHeightUnit'],
          vehicleLiftHeight: example['vehicleLiftHeight'],
          vehicleLiftHeightUnit: example['vehicleLiftHeightUnit'],
          typeOfBeds: example['typeOfBeds'],
          numberOfBeds: example['numberOfBeds'],
          vehicleHistory: example['vehicleHistory'],
          ownersAmount: example['ownersAmount'],
          phoneNumber: example['phoneNumber'],
          isRepossessed: example['isRepossessed'],
          isDealer: example['isDealer'],
          feature: example['feature']
        })
      }
    })
    
  }

}
