import { Injectable } from '@angular/core';
import { CarsType, CarsFeature, CarsHistory } from '../models/cars.type';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Apollo } from 'apollo-angular';
import { carsGraphql } from 'src/app/_shared/graphql/cars/cars';

@Injectable({
  providedIn: 'root'
})
export class CarsAddService {
  carAddForm = new BehaviorSubject<FormGroup>( new FormGroup({
    vehicleType: new FormControl('', Validators.required)
  }) );
  type:BehaviorSubject<CarsType> = new BehaviorSubject<CarsType>('');
  truckType:BehaviorSubject<CarsType> = new BehaviorSubject<CarsType>('');
  carsFeatures:BehaviorSubject<CarsFeature[]> = new  BehaviorSubject<CarsFeature[]>([]);
  isSubmitted:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  files:BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  numbers = [];


  //edit
  carsEditID:string = '';
  carsEditObj = {};
  // photoRemoveIds = 
  //edit

  constructor(
    private imageUploadService:ImageUploadService,
    private apollo:Apollo
  ) { }


  addVehicle(data){
    return this.apollo.mutate({
      mutation:carsGraphql.addVehicle,
      variables: { data }
    })
  }

  uploadFilesToDb( id: string ) {
    const formData = new FormData();
    this.removeDimensions(this.files.value)
      .map( (file: Blob) => formData.append('file', file) )
    return this.imageUploadService.uploadCarsImage(formData, id)
 }

removeDimensions( images: any[] ) {
  const files = [];
       for (let index = 0; index < images.length; index++) {
              for (let j = 0; j < images[index].length; j++) {
                        if(images[index][j]['file'] && images[index][j]['file']['name']) {
                          files.push(images[index][j]['file'])
                        }
              }
       }
  return files;
};


}
