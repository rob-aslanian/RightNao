import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../cars.service';
import { map, switchMap } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { CarsFeaturesModel, CarsEnvinromentModel } from '../../models/cars.model';

@Component({
  selector: 'app-cars-detail',
  templateUrl: './cars-detail.component.html',
  styleUrls: ['./cars-detail.component.scss']
})
export class CarsDetailComponent implements OnInit {

  selectedCar: any = null;
  carFeatures;
  utilis = utilities;
  postedDate: string = '';
  profileLoading: boolean = true;
  profileData: any = null;
  price: number ;  
  slider: any[] = [];
  user_id:string = '';
  isMe:boolean = false;

  constructor(
    private activateRoute:ActivatedRoute,
    private carService:CarsService,
    private utilsService: UtilsService,
    private globalUser: GlobalUserProService 
  ) { 
    this.user_id = this.carService.user_id;

  }



  ngOnInit() {
    
    this.activateRoute.params
                      .pipe(
                        map( ({ id }) => id ),
                        switchMap( id => this.carService.getVehicleByID(id) )
                      )
                      .subscribe( data => { this.selectedCar = data;
                                            this.postedDate = this.utilis.dateFromNow(data.created_at);
                                            this.isMe = this.user_id == this.selectedCar['owner']['id'] ? true : false;
                                            this.createFeaturesEnum();
                      } )
                      }

  //save vehicle
addToSave(){

  let id = this.selectedCar.id;

  let mutate = this.selectedCar.is_favourite ? this.carService.removeSavedVehicle(id) : 
                                      this.carService.saveVehicle(id);

  mutate.subscribe( data => this.selectedCar.is_favourite = !this.selectedCar.is_favourite )
}
//save vehicle


createFeaturesEnum() {
  let selectedFeatures = [];
  let type = this.selectedCar.vehicleType == 'TRUCK' ? 
              this.selectedCar.truckType : 
              this.selectedCar.vehicleType;
  let features = CarsFeaturesModel[type];
  let environment = CarsEnvinromentModel[type];
  if(features) {
    for(let i=0;i<this.selectedCar.feature.length;i++){
      for(let j = 0; j<CarsFeaturesModel[type].length;j++){
        if(this.selectedCar.feature[i] == CarsFeaturesModel[type][j]['type']) {
          selectedFeatures.push( CarsFeaturesModel[type][j]['text'] )
        }
      }
    }
  }
  if(environment) {
    for(let i=0;i<this.selectedCar.feature.length;i++){
      for(let j = 0; j<CarsEnvinromentModel[type].length;j++){
        if(this.selectedCar.feature[i] == CarsEnvinromentModel[type][j]['type']) {
          selectedFeatures.push( CarsEnvinromentModel[type][j]['text'] )
        }
      }
    }
  }
  this.carFeatures = selectedFeatures;
  
}

  }

 

