import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { carsGraphql } from '../_shared/graphql/cars/cars';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { EstateFormService } from '../real-estate/add-estate/Service/estate-form.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private apollo:Apollo,
    private globalUserProService:GlobalUserProService,
    private estateForm:EstateFormService
  ) { }

  user_id = this.globalUserProService.getProfileId();

  removeVehicle(id) {
    return this.apollo.mutate({
      mutation:carsGraphql.removeVehicle,
      variables: { id }
    })
  }

  changeVehicle(input){
    return this.apollo.mutate({
      mutation:carsGraphql.changeVehicle,
      variables: {
        input
      }
    })
  }
  removeVehiclePhotos(vehicle_id:string, ids) {
    // let ids = this.estateForm.savedFiles.value.map( el => el['id'] );
    this.estateForm.savedFiles.next([]);
    return this.apollo.mutate({
      mutation:carsGraphql.removeVehiclePhotos,
      variables: {
        vehicle_id,
        ids
      }
    })
  }

  changeVehicleVisibility(vehicle_id:string, is_visible:boolean) {
    return this.apollo.mutate({
      mutation:carsGraphql.changeVehicleVisibility,
      variables: {
        vehicle_id,
        is_visible
      }
    })
  }

  getLandingAnnouncement(pagination:{first:number, after:string}, filter){
    return this.apollo.query({
      query:carsGraphql.vehicleLandingAnnouncement,
      variables: {
        pagination,
        filter
      }
    })
    .pipe ( map (   data   => data['data']['SearchVehicle']  ) )
  }

  getVehicleByID(id){
    return this.apollo.query({
      query:carsGraphql.GetAnnouncementById,
      variables:{
        id
      }
    })
    .pipe ( map (   data   => data['data']['getVehicleByID'] ) )
  }

  getVehicleForEdit(id){
    return this.apollo.query({
      query:carsGraphql.GetVehicleForEdit,
      variables:{
        id
      }
    })
    .pipe ( map (   data   => data['data']['getVehicleByID'] ) )
  }

  saveVehicle(ids) {
    return this.apollo.mutate({
      mutation:carsGraphql.saveVegicle,
      variables: { ids }
    })
  }
  removeSavedVehicle(ids) {
    return this.apollo.mutate({
      mutation:carsGraphql.removeSavedVehicles,
      variables: { ids }
    })
  }
  getSavedVehicle(pagination:{first:number, after:string}){
    return this.apollo.query({
      query:carsGraphql.getSavedVehicles,
      variables: { 
        pagination
       }
    })
    .pipe ( map (   data   => data['data']['getSavedVehicles'] ) )
  }

}
